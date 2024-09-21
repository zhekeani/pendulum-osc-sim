precision highp float;
precision highp sampler2D;

varying vec2 vUv;
uniform float maxY;
uniform float loopCount;

void main () {
    const float PI = 3.1416;
    vec2 uv = vUv.xy;

    float xMin = -PI;
    float xMax =   PI * 2.0 * loopCount - PI;

    // Map vUv.x from [0, 1] to [xMin, xMax]
    float xMapped = mix(xMin, xMax, uv.x);

    // Map vUv.y from [0, 1] to [-maxY, maxY]
    float yMapped = mix(-maxY, maxY , uv.y);

    gl_FragColor = vec4(xMapped, yMapped, 0.0, 1.0); 
}
