import { mat3, vec2 } from "gl-matrix";
import { calculateVelocityInterval } from "../simulation";
import { calculateAngleLoopCount, isLargeCanvas } from "../utils";

const initialState = {
  angle: (Math.PI * 5) / 6,
  velocity: 0.5,
};

export class InputManager {
  canvas: HTMLCanvasElement;
  states: {
    angle: number; // Now in normalized coordinates (0 to 1)
    velocity: number; // Now in normalized coordinates (0 to 1)
  };
  down: boolean;
  moved: boolean;
  simHasRun: boolean;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.states = initialState;
    this.down = false;
    this.moved = false;
    this.simHasRun = false;

    this.setupEventListeners();
  }

  // Get the normalized coordinates (0 to 1)
  getTexCoord() {
    const { angle, velocity } = this.states;
    const vInterval = calculateVelocityInterval(this.canvas);
    const aspectRatio = this.canvas.clientWidth / this.canvas.clientHeight;

    // Transform the point from (-π, v) to (π, -v) to normalized space
    const textureCoord = transformStatesToTexture(
      this.canvas,
      [angle, velocity],
      vInterval,
      aspectRatio
    );

    return {
      x: textureCoord[0],
      y: textureCoord[1],
    };
  }

  updateStates(angle: number, velocity: number) {
    this.states = {
      angle,
      velocity,
    };
  }

  resetStates() {
    this.states = initialState;
    this.updateIsSimHasRun(false);
  }

  setupEventListeners() {
    this.canvas.addEventListener("mousedown", (e) => this.onMouseDown(e));
    this.canvas.addEventListener("mousemove", (e) => this.onMouseMove(e));
    window.addEventListener("mouseup", () => this.onMouseUp());
  }

  onMouseDown(event: MouseEvent) {
    // Convert pixel coordinates to normalized coordinates (0 to 1)
    const posX = event.offsetX / this.canvas.clientWidth;
    const posY = event.offsetY / this.canvas.clientHeight;

    const aspectRatio = this.canvas.clientWidth / this.canvas.clientHeight;

    const currentTextureCoord = this.getTexCoord();
    const clickedTextureCoord = transformCanvasToTexture(
      [posX, posY],
      aspectRatio
    );

    this.down =
      !this.simHasRun &&
      Math.abs(currentTextureCoord.x - clickedTextureCoord.x) < 0.02 &&
      Math.abs(currentTextureCoord.y - clickedTextureCoord.y) < 0.02;
  }

  onMouseMove(event: MouseEvent) {
    if (!this.down) return;

    // Convert pixel coordinates to normalized coordinates (0 to 1)
    const posX = event.offsetX / this.canvas.clientWidth;
    const posY = event.offsetY / this.canvas.clientHeight;

    const vInterval = calculateVelocityInterval(this.canvas);
    const clickedStates = transformCanvasToStates(
      this.canvas,
      [posX, posY],
      vInterval
    );

    this.moved =
      this.states.angle !== clickedStates.x ||
      this.states.velocity !== clickedStates.y;
    if (this.moved) {
      this.states = {
        angle: clickedStates.x,
        velocity: clickedStates.y,
      };
    }
  }

  onMouseUp() {
    this.down = false;
  }

  updateIsSimHasRun(bool: boolean) {
    this.simHasRun = bool;
  }
}

const transformStatesToTexture = (
  canvas: HTMLCanvasElement,
  point: [number, number],
  v: number,
  aspectRatio: number
) => {
  const loopCount = calculateAngleLoopCount(canvas);

  const xScaleFactor = loopCount * 2 * Math.PI;
  const xShiftFactor = Math.PI;

  const matrix = mat3.create();
  // Scale down x and y
  mat3.scale(matrix, matrix, [1 / (xScaleFactor / aspectRatio), 1 / (2 * v)]);
  // Shift x by PI and y by (v)
  mat3.translate(matrix, matrix, [xShiftFactor, v]);

  // Apply the transformation matrix to the point
  const transformedPoint = vec2.create();
  vec2.transformMat3(
    transformedPoint,
    vec2.fromValues(point[0], point[1]),
    matrix
  );

  return transformedPoint;
};

const createCanvasToTextureMatrix = (aspectRatio: number = 1) => {
  const matrix = mat3.create();

  mat3.translate(matrix, matrix, [0, 1]);
  mat3.scale(matrix, matrix, [1 * aspectRatio, -1]);

  return matrix;
};

const transformCanvasToTexture = (
  point: [number, number],
  aspectRatio: number
) => {
  const matrix = createCanvasToTextureMatrix(aspectRatio);

  const transformedPoint = vec2.create();
  vec2.transformMat3(
    transformedPoint,
    vec2.fromValues(point[0], point[1]),
    matrix
  );
  return {
    x: transformedPoint[0],
    y: transformedPoint[1],
  };
};

const crateTextureToStatesMatrix = (
  loopCount: number,
  v: number,
  aspectRatio: number = 1
) => {
  const matrix = mat3.create();

  const xShiftFactor = -Math.PI;
  const xScaleFactor = loopCount * 2 * Math.PI;

  mat3.translate(matrix, matrix, [xShiftFactor, -v]);
  mat3.scale(matrix, matrix, [xScaleFactor * aspectRatio, 2 * v]);
  return matrix;
};

const transformCanvasToStates = (
  canvas: HTMLCanvasElement,
  point: [number, number],
  v: number
) => {
  const loopCount = calculateAngleLoopCount(canvas);
  const matrix = mat3.create();

  const toTextureMatrix = createCanvasToTextureMatrix();
  const toStatesMatrix = crateTextureToStatesMatrix(loopCount, v);

  mat3.multiply(matrix, toStatesMatrix, toTextureMatrix);

  const transformedPoint = vec2.create();
  vec2.transformMat3(
    transformedPoint,
    vec2.fromValues(point[0], point[1]),
    matrix
  );

  return {
    x: transformedPoint[0],
    y: transformedPoint[1],
  };
};
