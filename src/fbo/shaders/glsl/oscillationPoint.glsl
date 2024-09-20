precision highp float;

uniform vec2 pointTexelSize;
uniform vec2 pCoord;
uniform float radiusPx;
uniform float aspectRatio;

void main() {
    // Convert fragment coordinates to normalized texel coordinates
    vec2 uv = gl_FragCoord.xy * pointTexelSize;

    uv.x *= aspectRatio;

    float circleSize = 0.002;
    float radius = radiusPx * circleSize ;
    float dist = distance(uv, pCoord);

    // Define a feathering range for smoothing the circle's edge
    float feather = 0.005;

    // Calculate the alpha value based on the distance to smooth the edge
    float alpha = smoothstep(radius, radius - feather, dist);

    // If inside the circle, output a color with the calculated alpha
    if (dist < radius + feather) {
        gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
    } else {
        discard;
    }
}
