let lastUpdateTime = Date.now();

export const calcDeltaTime = (): number => {
  const now = Date.now();
  let deltaTime = (now - lastUpdateTime) / 1000;
  deltaTime = Math.min(deltaTime, 0.016666);
  lastUpdateTime = now;
  return deltaTime;
};

export const calculateAngleLoopCount = (canvas: HTMLCanvasElement) => {
  const canvasMinWidth = 580;

  let loopCount = Math.floor(canvas.clientWidth / canvasMinWidth);
  loopCount = loopCount === 0 ? 1 : loopCount;
  return loopCount;
};

export const calcCanvasAspectRatio = (canvas: HTMLCanvasElement) => {
  return canvas.clientWidth / canvas.clientHeight;
};
