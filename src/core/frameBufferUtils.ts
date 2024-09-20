import { CopyShaderUniforms } from "../fbo/shaders/types";
import { Program } from "./programUtils";
import { DoubleFrameBuffer, FrameBuffer } from "./types";

/**
 * Blits (renders) a full-screen quad to the given target (framebuffer or screen).
 * It ensures that the quad geometry is set up only once, and draws either to the screen
 * (if `target` is null) or to a specified framebuffer.
 *
 */
export const blit = (
  gl: WebGL2RenderingContext,
  target: any,
  clear = false
) => {
  setupQuadGeometry(gl);
  draw(gl, target, clear, 6);
};

export const blitArrow = (
  gl: WebGL2RenderingContext,
  target: any,
  clear = false,
  scale: number = 0.4
) => {
  const indicesLength = setupArrowGeometry(gl, scale);
  draw(gl, target, clear, indicesLength);
};

const draw = (
  gl: WebGL2RenderingContext,
  target: any,
  clear: boolean,
  indicesLength: number
) => {
  // Set rendering target (screen or framebuffer)
  if (target == null) {
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  } else {
    gl.viewport(0, 0, target.width, target.height);
    gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
  }

  // Optionally clear the color buffer
  if (clear) {
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  // Enable blending to ensure alpha is handled correctly
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  // Draw full-screen quad
  CHECK_FRAMEBUFFER_STATUS(gl);
  gl.drawElements(gl.TRIANGLES, indicesLength, gl.UNSIGNED_SHORT, 0);
};

export const clear = (
  gl: WebGL2RenderingContext,
  target: FrameBuffer | null
) => {
  // Set the clear color to transparent (rgba(0, 0, 0, 0))
  gl.clearColor(0.0, 0.0, 0.0, 0.0);

  // Bind the target framebuffer, or null for the default framebuffer (screen)
  if (target) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
    gl.viewport(0, 0, target.width, target.height);
  } else {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  }

  // Clear the color buffer
  gl.clear(gl.COLOR_BUFFER_BIT);
};

/**
 * Checks the status of the current framebuffer to ensure it is complete and ready for rendering.
 * Logs an error trace if the framebuffer is not complete.
 */
const CHECK_FRAMEBUFFER_STATUS = (gl: WebGL2RenderingContext) => {
  let status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  if (status != gl.FRAMEBUFFER_COMPLETE) {
    console.trace("Framebuffer error: " + status);
  }
};

export const setupQuadGeometry = (gl: WebGL2RenderingContext): void => {
  // Set up the full-screen quad geometry only once
  const quadVertexBuffer = gl.createBuffer();
  if (!quadVertexBuffer) {
    throw new Error("Failed to create quad vertex buffer.");
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, quadVertexBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
    gl.STATIC_DRAW
  );

  // Set up the index buffer only once
  const quadIndexBuffer = gl.createBuffer();
  if (!quadIndexBuffer) {
    throw new Error("Failed to create quad index buffer.");
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, quadIndexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array([0, 1, 2, 0, 2, 3]),
    gl.STATIC_DRAW
  );

  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(0);
};

export const setupArrowGeometry = (gl: WebGL2RenderingContext, scale = 0.4) => {
  /*prettier-ignore*/
  const vertices = new Float32Array([
    // Arrow shaft (rectangle)
    -0.05 * scale, 0.006* scale, // Top-left of shaft
    0.08 * scale, 0.006 * scale, // Top-right of shaft
    0.08 * scale, -0.006 * scale, // Bottom-right of shaft
    -0.05 * scale, -0.006 * scale, // Bottom-left of shaft

    // Arrowhead (triangle)
    0.08 * scale, 0.03 * scale, // Top of arrowhead
    0.14 * scale, 0.0 * scale, // Tip of arrowhead
    0.08 * scale, -0.03 * scale, // Bottom of arrowhead
  ])

  const arrowVertexBuffer = gl.createBuffer();
  if (!arrowVertexBuffer) {
    throw new Error("Failed to create arrow vertex buffer");
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, arrowVertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  /*prettier-ignore*/
  const indices = new Uint16Array([
    0, 1, 2, 0, 2, 3, // Arrow shaft (rectangle)

    4, 5, 6, // Arrowhead (triangle)
  ])

  const arrowIndexBuffer = gl.createBuffer();
  if (!arrowIndexBuffer) {
    throw new Error("Failed to create arrow index buffer.");
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, arrowIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(0);

  return indices.length;
};

/**
 * Create a single framebuffer object (FBO)
 */
export const createFBO = (
  gl: WebGL2RenderingContext,
  w: number,
  h: number,
  internalFormat: number,
  format: number,
  type: number,
  param: number
): FrameBuffer => {
  gl.activeTexture(gl.TEXTURE0);

  const texture = gl.createTexture();
  if (!texture) {
    throw new Error("Failed to create WebGL texture");
  }

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

  const fbo = gl.createFramebuffer();
  if (!fbo) {
    throw new Error("Failed to create WebGL framebuffer");
  }

  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    texture,
    0
  );

  // Set the viewport to match the FBO size and clear the buffer
  gl.viewport(0, 0, w, h);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const texelSizeX = 1.0 / w;
  const texelSizeY = 1.0 / h;

  return {
    texture,
    fbo,
    width: w,
    height: h,
    texelSizeX,
    texelSizeY,
    attach(id: number) {
      gl.activeTexture(gl.TEXTURE0 + id);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      return id;
    },
  };
};

/**
 * Creates a double framebuffer object (FBO) for reading and writing
 */
export const createDoubleFBO = (
  gl: WebGL2RenderingContext,
  w: number,
  h: number,
  internalFormat: number,
  format: number,
  type: number,
  param: number
): DoubleFrameBuffer => {
  const fbo1 = createFBO(gl, w, h, internalFormat, format, type, param);
  const fbo2 = createFBO(gl, w, h, internalFormat, format, type, param);

  return {
    width: w,
    height: h,
    texelSizeX: fbo1.texelSizeX,
    texelSizeY: fbo1.texelSizeY,
    read: fbo1,
    write: fbo2,
    swap() {
      [this.read, this.write] = [this.write, this.read];
    },
  };
};

/**
 * Resizes a framebuffer object (FBO) by creating a new FBO with the new size and copying the data from the old FBO.
 */
export const resizeFBO = (
  gl: WebGL2RenderingContext,
  target: FrameBuffer,
  w: number,
  h: number,
  internalFormat: number,
  format: number,
  type: number,
  param: number,
  copyProgram: Program<CopyShaderUniforms>
) => {
  const newFBO = createFBO(gl, w, h, internalFormat, format, type, param);

  copyProgram.bind();
  gl.uniform1i(copyProgram.uniforms["uTexture"], target.attach(0));
  blit(gl, newFBO);

  return newFBO;
};

/**
 * Resize a double framebuffer object (with read and write buffers) and preserves data in the read buffer.
 */
export function resizeDoubleFBO(
  gl: WebGL2RenderingContext,
  target: DoubleFrameBuffer,
  width: number,
  height: number,
  internalFormat: number,
  format: number,
  type: number,
  param: number,
  copyProgram: Program<CopyShaderUniforms>
): DoubleFrameBuffer {
  // If no resize is needed, return the target
  if (target.width === width && target.height === height) {
    return target;
  }

  // Resize the read FBO and copy the data
  target.read = resizeFBO(
    gl,
    target.read,
    width,
    height,
    internalFormat,
    format,
    type,
    param,
    copyProgram
  );

  // Create a new write FBO without copying data
  target.write = createFBO(
    gl,
    width,
    height,
    internalFormat,
    format,
    type,
    param
  );

  // Update the dimensions and texel size
  target.width = width;
  target.height = height;
  target.texelSizeX = 1.0 / width;
  target.texelSizeY = 1.0 / height;

  return target;
}
