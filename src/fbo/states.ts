import { DoubleFrameBuffer, FrameBuffer } from "../core/types";

interface FrameBufferState {
  oscillationState: null | DoubleFrameBuffer;
  oscillationDerivative: null | DoubleFrameBuffer;
  oscillationMagnitude: null | FrameBuffer;
  oscillationPoint: null | DoubleFrameBuffer;
  oscillationPointMovement: null | FrameBuffer;
  arrowField: null | FrameBuffer;
  gridLines: null | FrameBuffer;
}

export const frameBufferState: FrameBufferState = {
  oscillationState: null,
  oscillationDerivative: null,
  oscillationMagnitude: null,
  oscillationPoint: null,
  oscillationPointMovement: null,
  arrowField: null,
  gridLines: null,
};
