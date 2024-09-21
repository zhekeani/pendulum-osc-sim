import { mat3 } from "gl-matrix";
import { blitArrow, clear } from "../core/frameBufferUtils";
import { Program } from "../core/programUtils";
import { ArrowFieldShaderUniform } from "../fbo/shaders/types";
import { frameBufferState } from "../fbo/states";
import { config } from "./config";
import { calculateVelocityInterval } from "./simulation";
import { calcCanvasAspectRatio, calculateAngleLoopCount } from "./utils";

export const updateVectorField = (
  gl: WebGL2RenderingContext,
  canvas: HTMLCanvasElement,
  arrowFieldProgram: Program<ArrowFieldShaderUniform>
) => {
  const { arrowField, oscillationMagnitude } = frameBufferState;

  if (arrowField && oscillationMagnitude) {
    const { VECTOR_FIELD_OPACITY } = config;

    clear(gl, arrowField);

    const loopCount = calculateAngleLoopCount(canvas);
    const aspectRatio = canvas.clientWidth / canvas.clientHeight;
    const vInterval = calculateVelocityInterval(canvas);

    arrowFieldProgram.bind();
    gl.uniform1f(arrowFieldProgram.uniforms.opacity, VECTOR_FIELD_OPACITY);
    gl.uniform1f(arrowFieldProgram.uniforms.aspectRatio, aspectRatio);
    gl.uniform1i(
      arrowFieldProgram.uniforms.mTexture,
      oscillationMagnitude.attach(0)
    );

    const { columns, rows } = calculateRowsAndColumns(canvas);

    const arrowBaseSize = 0.2 - (0.02 / aspectRatio) * (loopCount * 2 - 1);

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const x = (column / (columns - 1)) * 2 - 1; // Map column to [-1, 1]
        const y = (row / (rows - 1)) * 2 - 1; // Map row to [-1, 1]

        const matrix = mat3.create();
        mat3.translate(matrix, matrix, [x * aspectRatio, y]);

        const { rotation, magnitude } = calculateRotationAndMagnitude(
          canvas,
          vInterval,
          x,
          y
        );
        mat3.rotate(matrix, matrix, rotation);

        gl.uniformMatrix3fv(
          arrowFieldProgram.uniforms.uTransformMatrix,
          false,
          matrix
        );

        blitArrow(gl, arrowField, false, arrowBaseSize + 5000 * magnitude);
      }
    }
  }
};

const calculateRotationAndMagnitude = (
  canvas: HTMLCanvasElement,
  vInterval: number,
  x: number,
  y: number
) => {
  const loopCount = calculateAngleLoopCount(canvas);

  const adJustedX = (x + 1) / 2;
  const adjustedY = (y + 1) / 2;

  const { GRAVITY, PENDULUM_LENGTH, AIR_RESISTANCE_COEF } = config;

  let angle = lerp(-Math.PI, Math.PI * 2 * loopCount - Math.PI, adJustedX);

  const velocity = lerp(-vInterval, vInterval, adjustedY);
  const acceleration =
    -AIR_RESISTANCE_COEF * velocity -
    (GRAVITY / PENDULUM_LENGTH) * Math.sin(angle);

  const dt = 0.00001;

  const dx = velocity * dt;
  const dy = acceleration * dt;

  let rotation = Math.atan2(dy, dx);

  if (rotation < 0) {
    rotation += 2 * Math.PI;
  }

  const magnitude = Math.sqrt(dx * dx + dy * dy);

  return {
    rotation,
    magnitude,
  };
};

function lerp(start: number, end: number, t: number): number {
  return start + t * (end - start);
}

const calculateRowsAndColumns = (canvas: HTMLCanvasElement) => {
  const aspectRatio = calcCanvasAspectRatio(canvas);
  const loopCount = calculateAngleLoopCount(canvas);
  const count = 350 * loopCount + 50 * aspectRatio;

  let columns = Math.floor(Math.sqrt(count * aspectRatio));
  let rows = Math.floor(count / columns);

  while (rows * columns > count) {
    if (columns > rows) {
      columns--; // Decrease columns if more than rows
    } else {
      rows--; // Otherwise, decrease rows
    }
  }

  return {
    columns,
    rows,
    count: columns * rows,
  };
};
