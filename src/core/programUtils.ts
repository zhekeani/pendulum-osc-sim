/**
 * Class representing a WebGL Program, encapsulating shader compilation and uniform management.
 */
export class Program<U extends Record<string, string>> {
  private gl: WebGL2RenderingContext;
  private vertexShader: WebGLShader;
  private fragmentShader: WebGLShader;
  private program: WebGLProgram;
  public uniforms: Record<keyof U, WebGLUniformLocation | null>;

  /**
   * Creates a WebGL program with a given vertex and fragment shader source code.
   * @param gl - WebGL rendering context.
   * @param vertexShaderSource - GLSL code for the vertex shader.
   * @param fragmentShaderSource - GLSL code for the fragment shader.
   */
  constructor(
    gl: WebGL2RenderingContext,
    vertexShaderSource: string,
    fragmentShaderSource: string
  ) {
    this.gl = gl;
    this.vertexShader = this.compileShader(
      gl.VERTEX_SHADER,
      vertexShaderSource
    );
    this.fragmentShader = this.compileShader(
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );
    this.program = this.createAndLinkProgram();
    this.uniforms = this.getUniformLocations<U>();
  }

  /**
   * Compiles a shader of the specified type (vertex or fragment).
   * @param type - The type of shader (gl.VERTEX_SHADER or gl.FRAGMENT_SHADER).
   * @param source - The GLSL source code for the shader.
   * @returns The compiled WebGLShader.
   */
  private compileShader(type: number, source: string): WebGLShader {
    const shader = this.gl.createShader(type);
    if (!shader) {
      throw new Error("Unable to create shader.");
    }

    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      const error = this.gl.getShaderInfoLog(shader);
      this.gl.deleteShader(shader);
      throw new Error("Shader compile error: " + error);
    }

    return shader;
  }

  /**
   * Creates and links the WebGL program with the compiled vertex and fragment shaders.
   * @returns The linked WebGLProgram.
   */
  private createAndLinkProgram(): WebGLProgram {
    const program = this.gl.createProgram();
    if (!program) {
      throw new Error("Unable to create WebGL program.");
    }

    this.gl.attachShader(program, this.vertexShader);
    this.gl.attachShader(program, this.fragmentShader);
    this.gl.linkProgram(program);

    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      const error = this.gl.getProgramInfoLog(program);
      this.gl.deleteProgram(program);
      throw new Error("Program link error: " + error);
    }

    return program;
  }

  /**
   * Retrieves and stores the uniform locations for the program.
   * @returns A map of uniform names to their WebGLUniformLocation.
   */
  private getUniformLocations<U extends Record<string, string>>(): Record<
    keyof U,
    WebGLUniformLocation | null
  > {
    this.bind();

    const uniformLocations: Record<keyof U, WebGLUniformLocation | null> =
      {} as any;

    const uniformCount = this.gl.getProgramParameter(
      this.program,
      this.gl.ACTIVE_UNIFORMS
    );

    for (let i = 0; i < uniformCount; i++) {
      const uniformInfo = this.gl.getActiveUniform(this.program, i);

      if (uniformInfo) {
        const location = this.gl.getUniformLocation(
          this.program,
          uniformInfo.name
        );
        if (location !== null) {
          uniformLocations[uniformInfo.name as keyof U] = location;
        }
      }
    }

    return uniformLocations;
  }

  /**
   * Binds the program for use in WebGL rendering.
   */
  public bind(): void {
    this.gl.useProgram(this.program);
  }

  /**
   * Get a uniform location by its name.
   * @param uniformName - The name of the uniform.
   * @returns The WebGLUniformLocation for the specified uniform.
   */
  public getUniform(uniformName: keyof U): WebGLUniformLocation | null {
    return this.uniforms[uniformName] || null;
  }
}
