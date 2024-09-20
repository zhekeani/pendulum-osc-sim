precision highp float;

attribute vec2 aPosition;
uniform mat3 uTransformMatrix;
uniform float aspectRatio;  
varying vec2 vUv;

void main () {
  vec3 position = vec3(aPosition, 1.0);
  vec3 transformedPosition = uTransformMatrix * position;

  transformedPosition.x /= aspectRatio;
  vUv = transformedPosition.xy * 0.5 + 0.5;

  gl_Position = vec4(transformedPosition.xy, 0.0, 1.0);
}