precision highp float;
precision highp sampler2D;

varying vec2 vUv;
uniform float maxY;

void main () {
    const float PI = 3.1416;

    // Use mix to map vUv.x from [0, 1] to [-PI, PI]
    float xMapped = mix(-PI, PI, vUv.x);

    // Use mix to map vUv.y from [0, 1] to [-maxY, maxY]
    float yMapped = mix(-maxY, maxY, vUv.y);

    // Output the mapped coordinates (for visualization or further processing)
    gl_FragColor = vec4(xMapped, yMapped, 0.0, 1.0); 
}
