import GUI from "lil-gui";
import { SimPrograms } from "../fbo/shaders/types";
import { config } from "./config";
import { InputManager } from "./input/inputManager";
import {
  calculateOscillationDerivative,
  calculateStatesMagnitude,
  reset,
} from "./simulation";
import { updateVectorField } from "./vectorField";

export const startGUI = (
  gl: WebGL2RenderingContext,
  canvas: HTMLCanvasElement,
  programs: SimPrograms,
  inputManager: InputManager
) => {
  const gui = new GUI({ width: 300 });

  // GUI for sim resolution
  // gui
  //   .add(config, "SIM_RESOLUTION", { 32: 32, 64: 64, 128: 128, 256: 256 })
  //   .name("sim resolution")
  //   .onFinishChange(() => initFramebuffers(gl, ext, programs.copyProgram));

  // GUI for pendulum length
  gui
    .add(config, "PENDULUM_LENGTH", 1, 4)
    .name("pendulum length")
    .onChange(() => {
      calculateOscillationDerivative(gl, programs.derivativeProgram);
      calculateStatesMagnitude(gl, canvas, programs.magnitudeProgram);
      updateVectorField(gl, canvas, programs.arrowFieldProgram);
    });

  // GUI for air resistance coefficient
  gui
    .add(config, "AIR_RESISTANCE_COEF", 0.1, 1)
    .name("air resistance")
    .onChange(() => {
      calculateOscillationDerivative(gl, programs.derivativeProgram);
      calculateStatesMagnitude(gl, canvas, programs.magnitudeProgram);
      updateVectorField(gl, canvas, programs.arrowFieldProgram);
    });

  // GUI for toggling vector field
  gui
    .add(config, "VECTOR_FIELD_OPACITY", 0, 0.8)
    .name("vector field opacity")
    .onChange(() => {
      updateVectorField(gl, canvas, programs.arrowFieldProgram);
    });

  // GUI for toggling line tracking
  gui.add(config, "LINE_TRACKING").name("line tracking").listen();

  // GUI for pausing the simulation
  gui
    .add(config, "PAUSED")
    .name("paused")
    .listen()
    .onChange(() => {
      inputManager.updateIsSimHasRun(true);
    });

  // Button to reset the simulation
  gui
    .add(
      {
        resetSimulation: () =>
          reset(
            gl,
            programs.pointProgram,
            programs.pointMovementProgram,
            inputManager
          ),
      },
      "resetSimulation"
    )
    .name("reset");
};
