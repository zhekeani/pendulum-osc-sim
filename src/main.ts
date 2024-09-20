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
  reset,
  update,
  updateOscillationStates,
} from "./simulation/simulation";
import { updateVectorField } from "./simulation/vectorField";
import "./style.css";

const canvas = document.getElementsByTagName("canvas")[0];
resizeCanvas(canvas);
const ctx = getWebGLContext(canvas);

if (ctx) {
  const { gl, ext } = ctx;
  const { programs } = setupPrograms(gl);

  const inputManager = new InputManager(canvas);

  const backgroundDivEl: HTMLDivElement | null =
    document.querySelector(".background-div");

  startGUI(gl, ext, canvas, programs, inputManager);

  initFramebuffers(gl, ext, programs.copyProgram);
  updateOscillationStates(gl, canvas, programs.stateProgram);
  calculateOscillationDerivative(gl, programs.derivativeProgram);
  calculateStatesMagnitude(gl, canvas, programs.magnitudeProgram);
  updateVectorField(gl, canvas, programs.arrowFieldProgram);

  window.addEventListener("resize", () => {});

  createPendulumVisualization(inputManager, canvas);

  if (backgroundDivEl) {
    generateBackground(backgroundDivEl);

    window.addEventListener("resize", () => {
      generateBackground(backgroundDivEl);
    });

    // Update simulation function
    update(gl, ext, canvas, programs, inputManager);
  }
} else {
  handleWebGLNotSupported(canvas);
}
