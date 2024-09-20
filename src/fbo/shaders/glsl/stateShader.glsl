precision highp float;
precision highp sampler2D;

varying vec2 vUv;
uniform float maxY;
uniform bool isLarge;

void main () {
    const float PI = 3.1416;

    float xMin = -PI;
    float xMax = isLarge ? 3.0 * PI : PI;

    // Map vUv.x from [0, 1] to [xMin, xMax]
    float xMapped = mix(xMin, xMax, vUv.x);

    // Map vUv.y from [0, 1] to [-maxY, maxY]
    float yMapped = mix(-maxY, maxY, vUv.y);

    gl_FragColor = vec4(xMapped, yMapped, 0.0, 1.0); 
}
