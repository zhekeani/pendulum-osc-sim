import { Program } from "../core/programUtils";
import { minimalBaseVertexShaderSource } from "../fbo/shaders/string-literal/minimalBaseVertexShader";
import {
  ArrowFieldShaderUniform,
  CopyShaderUniforms,
  DerivativeShaderUniform,
  DisplayShaderUniforms,
  GridLinesShaderUniforms,
  MagnitudeShaderUniform,
  PointMovementShaderUniform,
  PointShaderUniform,
  SimPrograms,
  StateShaderUniforms,
} from "../fbo/shaders/types";
import copyShaderSource from "../fbo/shaders/glsl/copyShader.glsl?raw";
import stateShaderSource from "../fbo/shaders/glsl/stateShader.glsl?raw";
import gridLinesShaderSource from "../fbo/shaders/glsl/gridLines.glsl?raw";
import displayShaderSource from "../fbo/shaders/glsl/displayShader.glsl?raw";
import derivativeShaderSource from "../fbo/shaders/glsl/derivativeShader.glsl?raw";
import pointShaderSource from "../fbo/shaders/glsl/oscillationPoint.glsl?raw";
import pointMovementShaderSource from "../fbo/shaders/glsl/pointMovementShader.glsl?raw";
import arrowVertexShaderSource from "../fbo/shaders/glsl/ArrowVertexShader.glsl?raw";
import arrowFieldShaderSource from "../fbo/shaders/glsl/ArrowFieldShader.glsl?raw";
import magnitudeShaderSource from "../fbo/shaders/glsl/statesMagnitudeShader.glsl?raw";

export const setupPrograms = (gl: WebGL2RenderingContext) => {
  const copyProgram = new Program<CopyShaderUniforms>(
    gl,
    minimalBaseVertexShaderSource,
    copyShaderSource
  );
  const stateProgram = new Program<StateShaderUniforms>(
    gl,
    minimalBaseVertexShaderSource,
    stateShaderSource
  );
  const magnitudeProgram = new Program<MagnitudeShaderUniform>(
    gl,
    minimalBaseVertexShaderSource,
    magnitudeShaderSource
  );
  const gridLinesProgram = new Program<GridLinesShaderUniforms>(
    gl,
    minimalBaseVertexShaderSource,
    gridLinesShaderSource
  );

  const derivativeProgram = new Program<DerivativeShaderUniform>(
    gl,
    minimalBaseVertexShaderSource,
    derivativeShaderSource
  );

  const pointProgram = new Program<PointShaderUniform>(
    gl,
    minimalBaseVertexShaderSource,
    pointShaderSource
  );

  const pointMovementProgram = new Program<PointMovementShaderUniform>(
    gl,
    minimalBaseVertexShaderSource,
    pointMovementShaderSource
  );

  const arrowFieldProgram = new Program<ArrowFieldShaderUniform>(
    gl,
    arrowVertexShaderSource,
    arrowFieldShaderSource
  );

  const displayProgram = new Program<DisplayShaderUniforms>(
    gl,
    minimalBaseVertexShaderSource,
    displayShaderSource
  );

  const programs: SimPrograms = {
    copyProgram,
    stateProgram,
    derivativeProgram,
    magnitudeProgram,
    gridLinesProgram,
    displayProgram,
    pointProgram,
    pointMovementProgram,
    arrowFieldProgram,
  };

  return {
    programs,
  };
};
