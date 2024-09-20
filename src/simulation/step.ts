import { blit } from "../core/frameBufferUtils";
import { Program } from "../core/programUtils";
import { PointMovementShaderUniform } from "../fbo/shaders/types";
import { frameBufferState } from "../fbo/states";
import { config } from "./config";
import { InputManager } from "./input/inputManager";
import { isLargeCanvas } from "./utils";

export const step = (
  gl: WebGL2RenderingContext,
  pointMovementProgram: Program<PointMovementShaderUniform>,
  canvas: HTMLCanvasElement,
  inputManager: InputManager,
  dt: number
) => {
  const { angle, velocity } = inputManager.states;

  // Calculate velocity
  const newStates = calculateNextStates(canvas, angle, velocity, dt);

  inputManager.updateStates(newStates.angle, newStates.velocity);

  updatePointMovements(gl, canvas, inputManager, pointMovementProgram);
};

const calculateNextStates = (
  canvas: HTMLCanvasElement,
  angle: number,
  velocity: number,
  dt: number
): { angle: number; velocity: number } => {
  const isLarge = isLargeCanvas(canvas);
  const { AIR_RESISTANCE_COEF, GRAVITY, PENDULUM_LENGTH } = config;
  const acceleration =
    -AIR_RESISTANCE_COEF * velocity -
    (GRAVITY / PENDULUM_LENGTH) * Math.sin(angle);

  let nextAngle = angle + velocity * 2 * dt;
  const nextVelocity = velocity + acceleration * dt;

  if (
    (!isLarge && Math.abs(angle) > Math.PI) ||
    (isLarge && angle > Math.PI * 3)
  ) {
    const n = angle < 0 ? 1 : -1;
    nextAngle = (angle % Math.PI) + Math.PI * n;
  }

  if (isLarge && angle < -Math.PI) {
    nextAngle = (angle % Math.PI) + Math.PI * 3;
  }

  return {
    angle: nextAngle,
    velocity: nextVelocity,
  };
};

const updatePointMovements = (
  gl: WebGL2RenderingContext,
  canvas: HTMLCanvasElement,
  inputManager: InputManager,
  pointMovementProgram: Program<PointMovementShaderUniform>
) => {
  const { oscillationPointMovement } = frameBufferState;

  if (oscillationPointMovement) {
    const { x, y } = inputManager.getTexCoord();
    const aspectRatio = canvas.clientWidth / canvas.clientHeight;

    pointMovementProgram.bind();

    gl.uniform1f(pointMovementProgram.uniforms.aspectRatio, aspectRatio);
    gl.uniform2f(
      pointMovementProgram.uniforms.pointTexelSize,
      oscillationPointMovement.texelSizeX,
      oscillationPointMovement.texelSizeY
    );
    gl.uniform2f(pointMovementProgram.uniforms.pCoord, x, y);
    gl.uniform1f(pointMovementProgram.uniforms.radiusPx, 2.0);

    blit(gl, oscillationPointMovement, false);

    // Unbind the framebuffer after rendering
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }
};
