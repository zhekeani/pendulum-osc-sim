precision highp float;

uniform vec2 pointTexelSize;  
uniform vec2 pCoord;
uniform float radiusPx;
uniform float aspectRatio;

void main() {
    // Convert fragment coordinates to normalized texel coordinates
    vec2 uv = gl_FragCoord.xy * pointTexelSize;

    uv.x *= aspectRatio;

    float circleSize = 0.0015;
    float radius = radiusPx * circleSize ; 
    float dist = distance(uv, pCoord) ;

    if (dist < radius) {
        gl_FragColor = vec4(0.8, 0.8, 0.8, 0.7);
    } else {
        discard; 
    }
}

