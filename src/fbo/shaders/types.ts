import { Program } from "../../core/programUtils";

export type CopyShaderUniforms = {
  uTexture: string; // The texture uniform (to copy from)
};

export type StateShaderUniforms = {
  maxY: string;
};

export type DerivativeShaderUniform = {
  stateTexture: string;
  g: string;
  L: string;
};

export type MagnitudeShaderUniform = {
  vTexture: string;
  max: string;
};

export type PointShaderUniform = {
  pointTexelSize: string;
  pCoord: string;
  radiusPx: string;
  aspectRatio: string;
};

export type PointMovementShaderUniform = {
  pointTexelSize: string;
  pCoord: string;
  radiusPx: string;
  aspectRatio: string;
};

export type ArrowFieldShaderUniform = {
  mTexture: string;
  uTransformMatrix: string;
  aspectRatio: string;
  opacity: string;
};

export type GridLinesShaderUniforms = {
  xGridSpacing: string;
  yGridSpacing: string;
  xRest: string;
  yRest: string;
  vpw: string;
  vph: string;
  texelSize: string;
};

export type DisplayShaderUniforms = {
  mTexture: string;
  pTexture: string;
};

export interface SimPrograms {
  copyProgram: Program<CopyShaderUniforms>;
  stateProgram: Program<StateShaderUniforms>;
  derivativeProgram: Program<DerivativeShaderUniform>;
  magnitudeProgram: Program<MagnitudeShaderUniform>;
  gridLinesProgram: Program<GridLinesShaderUniforms>;
  displayProgram: Program<DisplayShaderUniforms>;
  pointProgram: Program<PointShaderUniform>;
  pointMovementProgram: Program<PointMovementShaderUniform>;
  arrowFieldProgram: Program<ArrowFieldShaderUniform>;
}
