precision highp float;
precision highp sampler2D;

varying vec2 vUv;
uniform sampler2D vTexture;
uniform float max;

void main () {
  vec2 slope = texture2D(vTexture, vUv).xy;
  float dt = 0.00001;
  vec2 d = slope * dt;

  float magnitude = length(d);
  float normalizedM = clamp(magnitude / max, 0.0, 1.0);

  vec3 color;

  // Use normalizedMagnitude to map it to colors: 
  // blue -> green -> yellow -> red
  if (normalizedM < 0.25) {
    color = mix(vec3(0.0, 0.0, 1.0), vec3(0.0, 1.0, 1.0), normalizedM / 0.25);  // Blue to Cyan
  } else if (normalizedM < 0.5) {
    color = mix(vec3(0.0, 1.0, 1.0), vec3(0.0, 1.0, 0.0), (normalizedM - 0.25) / 0.25);  // Cyan to Green
  } else if (normalizedM < 0.75) {
    color = mix(vec3(0.0, 1.0, 0.0), vec3(1.0, 1.0, 0.0), (normalizedM - 0.5) / 0.25);  // Green to Yellow
  } else {
    color = mix(vec3(1.0, 1.0, 0.0), vec3(1.0, 0.0, 0.0), (normalizedM - 0.75) / 0.25);  // Yellow to Red
  };

  gl_FragColor = vec4(color, 1.0);
}