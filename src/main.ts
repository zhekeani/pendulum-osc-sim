import { resizeCanvas } from "./core/canvasUtils";
import { getWebGLContext, handleWebGLNotSupported } from "./core/contextUtils";
import { generateBackground } from "./simulation/background/background";
import { initFramebuffers } from "./simulation/framebuffers";
import { startGUI } from "./simulation/gui";
import { InputManager } from "./simulation/input/inputManager";
import { createPendulumVisualization } from "./simulation/pendulum-visualization/pendulum";
import { setupPrograms } from "./simulation/program";
import {
  calculateOscillationDerivative,
  calculateStatesMagnitude,
  update,
  updateOscillationStates,
} from "./simulation/simulation";
import { updateVectorField } from "./simulation/vectorField";
import "./style.css";

const canvas = document.getElementsByTagName("canvas")[0];
resizeCanvas(canvas);
const background: HTMLDivElement | null =
  document.querySelector(".background-div");
const ctx = getWebGLContext(canvas);

if (ctx && background) {
  const { gl, ext } = ctx;
  const { programs } = setupPrograms(gl);

  const inputManager = new InputManager(canvas);

  startGUI(gl, canvas, programs, inputManager);

  generateBackground(background, canvas);
  createPendulumVisualization(inputManager, canvas);

  initFramebuffers(gl, ext, programs.copyProgram);
  updateOscillationStates(gl, canvas, programs.stateProgram);
  calculateOscillationDerivative(gl, programs.derivativeProgram);
  calculateStatesMagnitude(gl, canvas, programs.magnitudeProgram);
  updateVectorField(gl, canvas, programs.arrowFieldProgram);

  update(gl, ext, canvas, background, programs, inputManager);
} else {
  handleWebGLNotSupported(canvas);
}
