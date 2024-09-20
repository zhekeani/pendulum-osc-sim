import { getResolution } from "../core/canvasUtils";
import {
  createDoubleFBO,
  createFBO,
  resizeDoubleFBO,
  resizeFBO,
} from "../core/frameBufferUtils";
import { Program } from "../core/programUtils";
import { WebGLExtensions } from "../core/types";
import { CopyShaderUniforms } from "../fbo/shaders/types";
import { frameBufferState } from "../fbo/states";
import { config } from "./config";

export const initFramebuffers = (
  gl: WebGL2RenderingContext,
  ext: WebGLExtensions,
  copyProgram: Program<CopyShaderUniforms>
) => {
  const simRes = getResolution(config.SIM_RESOLUTION, gl);
  const displayRes = getResolution(1024, gl);

  const texType = ext.halfFloatTexType;
  const rgba = ext.formatRGBA;
  const rg = ext.formatRG;
  const r = ext.formatR;

  const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

  const {
    oscillationState,
    oscillationDerivative,
    oscillationMagnitude,
    oscillationPoint,
    arrowField,
  } = frameBufferState;

  if (rgba && rg && r && texType) {
    if (oscillationState === null) {
      frameBufferState.oscillationState = createDoubleFBO(
        gl,
        simRes.width,
        simRes.height,
        rgba.internalFormat,
        rgba.format,
        texType,
        filtering
      );
    } else {
      frameBufferState.oscillationState = resizeDoubleFBO(
        gl,
        oscillationState,
        simRes.width,
        simRes.height,
        rg.internalFormat,
        rg.format,
        texType,
        filtering,
        copyProgram
      );
    }

    if (oscillationDerivative === null) {
      frameBufferState.oscillationDerivative = createDoubleFBO(
        gl,
        simRes.width,
        simRes.height,
        rg.internalFormat,
        rg.format,
        texType,
        filtering
      );
    } else {
      frameBufferState.oscillationDerivative = resizeDoubleFBO(
        gl,
        oscillationDerivative,
        simRes.width,
        simRes.height,
        rg.internalFormat,
        rg.format,
        texType,
        filtering,
        copyProgram
      );
    }

    if (oscillationMagnitude === null) {
      frameBufferState.oscillationMagnitude = createFBO(
        gl,
        displayRes.width,
        displayRes.height,
        rgba.internalFormat,
        rgba.format,
        texType,
        filtering
      );
    } else {
      frameBufferState.oscillationMagnitude = resizeFBO(
        gl,
        oscillationMagnitude,
        displayRes.width,
        displayRes.height,
        rgba.internalFormat,
        rgba.format,
        texType,
        filtering,
        copyProgram
      );
    }

    if (oscillationPoint === null) {
      frameBufferState.oscillationPoint = createDoubleFBO(
        gl,
        displayRes.width,
        displayRes.height,
        rgba.internalFormat,
        rgba.format,
        texType,
        filtering
      );
    } else {
      frameBufferState.oscillationPoint = resizeDoubleFBO(
        gl,
        oscillationPoint,
        displayRes.width,
        displayRes.height,
        rgba.internalFormat,
        rgba.format,
        texType,
        filtering,
        copyProgram
      );
    }

    frameBufferState.oscillationPointMovement = createFBO(
      gl,
      displayRes.width,
      displayRes.height,
      rgba.internalFormat,
      rgba.format,
      texType,
      filtering
    );

    if (arrowField) {
      frameBufferState.arrowField = resizeFBO(
        gl,
        arrowField,
        displayRes.width,
        displayRes.height,
        rgba.internalFormat,
        rgba.format,
        texType,
        filtering,
        copyProgram
      );
    } else {
      frameBufferState.arrowField = createFBO(
        gl,
        displayRes.width,
        displayRes.height,
        rgba.internalFormat,
        rgba.format,
        texType,
        filtering
      );
    }

    frameBufferState.gridLines = createFBO(
      gl,
      displayRes.width,
      displayRes.height,
      rgba.internalFormat,
      rgba.format,
      texType,
      gl.NEAREST
    );
  }
};
