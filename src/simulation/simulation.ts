import { blit, clear } from "../core/frameBufferUtils";
import { Program } from "../core/programUtils";
import { WebGLExtensions } from "../core/types";
import {
  DerivativeShaderUniform,
  DisplayShaderUniforms,
  MagnitudeShaderUniform,
  PointMovementShaderUniform,
  PointShaderUniform,
  SimPrograms,
  StateShaderUniforms,
} from "../fbo/shaders/types";
import { frameBufferState } from "../fbo/states";
import { config } from "./config";
import { InputManager } from "./input/inputManager";
import { createPendulumVisualization } from "./pendulum-visualization/pendulum";
import { step } from "./step";
import { calcDeltaTime, isLargeCanvas } from "./utils";

export const update = (
  gl: WebGL2RenderingContext,
  ext: WebGLExtensions,
  canvas: HTMLCanvasElement,
  programs: SimPrograms,
  inputManager: InputManager
) => {
  const dt = calcDeltaTime();
  if (!config.PAUSED) {
    step(gl, programs.pointMovementProgram, canvas, inputManager, dt);
  }

  updateInitialState(gl, inputManager, canvas, programs.pointProgram);

  render(gl, programs.displayProgram);
  createPendulumVisualization(inputManager, canvas);

  requestAnimationFrame(() => update(gl, ext, canvas, programs, inputManager));
};

const updateInitialState = (
  gl: WebGL2RenderingContext,
  inputManager: InputManager,
  canvas: HTMLCanvasElement,
  pointProgram: Program<PointShaderUniform>
) => {
  const { oscillationPoint } = frameBufferState;

  if (oscillationPoint) {
    const { x, y } = inputManager.getTexCoord();
    const aspectRatio = canvas.clientWidth / canvas.clientHeight;
    // console.log(x, y);

    pointProgram.bind();

    gl.uniform1f(pointProgram.uniforms.aspectRatio, aspectRatio);
    gl.uniform2f(
      pointProgram.uniforms.pointTexelSize,
      oscillationPoint.texelSizeX,
      oscillationPoint.texelSizeY
    );
    gl.uniform2f(pointProgram.uniforms.pCoord, x, y);
    gl.uniform1f(pointProgram.uniforms.radiusPx, 5.0);

    // Render the point (circle) to the framebuffer
    blit(gl, oscillationPoint.write, true);
    oscillationPoint.swap();
  }
};

const render = (
  gl: WebGL2RenderingContext,
  displayProgram: Program<DisplayShaderUniforms>
) => {
  const { oscillationPoint, oscillationPointMovement, arrowField } =
    frameBufferState;

  if (oscillationPoint && oscillationPointMovement && arrowField) {
    const { LINE_TRACKING } = config;
    displayProgram.bind();
    gl.uniform1i(displayProgram.uniforms.pTexture, arrowField.attach(0));
    blit(gl, null, true);

    if (LINE_TRACKING) {
      gl.uniform1i(
        displayProgram.uniforms.pTexture,
        oscillationPointMovement.attach(0)
      );
      blit(gl, null, false);
    }

    gl.uniform1i(
      displayProgram.uniforms.pTexture,
      oscillationPoint.read.attach(0)
    );
    blit(gl, null, false);
  }
};

export const reset = (
  gl: WebGL2RenderingContext,
  pointProgram: Program<PointShaderUniform>,
  pointMovementProgram: Program<PointMovementShaderUniform>,
  inputManager: InputManager
) => {
  const { oscillationPoint, oscillationPointMovement } = frameBufferState;

  if (oscillationPoint && oscillationPointMovement) {
    config.PAUSED = true;

    pointProgram.bind();
    clear(gl, oscillationPoint.write);
    oscillationPoint.swap();

    pointMovementProgram.bind();
    clear(gl, oscillationPointMovement);

    inputManager.resetStates();
  }
};

export const calculateStatesMagnitude = (
  gl: WebGL2RenderingContext,
  canvas: HTMLCanvasElement,
  magnitudeProgram: Program<MagnitudeShaderUniform>
) => {
  const { oscillationMagnitude, oscillationDerivative } = frameBufferState;

  if (oscillationMagnitude && oscillationDerivative) {
    const { GRAVITY, PENDULUM_LENGTH, AIR_RESISTANCE_COEF } = config;

    const maxV = calculateVelocityInterval(canvas);
    const maxAcc = AIR_RESISTANCE_COEF * maxV + GRAVITY / PENDULUM_LENGTH;
    const dt = 0.00001;
    const dx = maxV * dt;
    const dy = maxAcc * dt;

    const maxM = Math.sqrt(dx * dx + dy * dy);

    magnitudeProgram.bind();

    gl.uniform1i(
      magnitudeProgram.uniforms.vTexture,
      oscillationDerivative.read.attach(0)
    );
    gl.uniform1f(magnitudeProgram.uniforms.max, maxM);

    blit(gl, oscillationMagnitude, false);
  }
};

export const calculateOscillationDerivative = (
  gl: WebGL2RenderingContext,
  derivativeProgram: Program<DerivativeShaderUniform>
) => {
  const { oscillationDerivative, oscillationState } = frameBufferState;

  if (oscillationDerivative && oscillationState) {
    derivativeProgram.bind();

    gl.uniform1i(
      derivativeProgram.uniforms.stateTexture,
      oscillationState.read.attach(0)
    );
    gl.uniform1f(derivativeProgram.uniforms.L, config.PENDULUM_LENGTH);
    gl.uniform1f(derivativeProgram.uniforms.g, config.GRAVITY);
    blit(gl, oscillationDerivative.write);
    oscillationDerivative.swap();
  }
};

export const updateOscillationStates = (
  gl: WebGL2RenderingContext,
  canvas: HTMLCanvasElement,
  stateProgram: Program<StateShaderUniforms>
) => {
  const { oscillationState } = frameBufferState;

  if (oscillationState) {
    const yInterval = calculateVelocityInterval(canvas);

    stateProgram.bind();

    gl.uniform1f(stateProgram.uniforms.maxY, yInterval);
    blit(gl, oscillationState.write);
    oscillationState.swap();
  }
};

export const calculateVelocityInterval = (canvas: HTMLCanvasElement) => {
  const isLarge = isLargeCanvas(canvas);

  let aspectRatio = canvas.clientWidth / canvas.clientHeight;
  if (isLarge) aspectRatio / 2;
  const vIntervalOri = 3.2;
  const vInterval = vIntervalOri / aspectRatio;

  return vInterval;
};
