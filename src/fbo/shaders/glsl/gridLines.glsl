precision highp float;

varying vec2 vUv;  // The UV coordinates passed from the vertex shader
uniform float xGridSpacing; // Precomputed spacing for grid lines along the x-axis
uniform float yGridSpacing; // Precomputed spacing for grid lines along the y-axis
uniform float xRest;
uniform float yRest;
uniform vec2 texelSize;     // The size of one texel in UV coordinates

void main() {
    // Calculate grid positions by using the precomputed spacing
    vec2 adjustedUv = vec2(vUv.x + xRest, vUv.y + yRest);
    vec2 grid = mod(adjustedUv, vec2(xGridSpacing, yGridSpacing));

    // Line thickness control: scale the thickness based on the texel size
    float lineThickness = 2.0 * max(texelSize.x, texelSize.y);
    float lineX = step(grid.x, lineThickness);
    float lineY = step(grid.y, lineThickness);
    
    // If either the X or Y coordinate is within the line thickness, we draw a line
    float gridLine = max(lineX, lineY);
    
    // Set the color of the grid lines to blue
    vec3 gridColor = vec3(0.0, 0.0, 1.0); // Blue lines for the grid
    vec3 backgroundColor = vec3(0.0, 0.0, 0.0); // Transparent background

    // Mix the grid color and background color based on the gridLine
    gl_FragColor = vec4(mix(backgroundColor, gridColor, gridLine), gridLine); // Transparency based on gridLine
}
