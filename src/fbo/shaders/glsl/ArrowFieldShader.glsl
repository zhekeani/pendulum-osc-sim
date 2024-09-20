precision highp float;

varying vec2 vUv;  
uniform sampler2D mTexture;
uniform float opacity;

void main () {
  vec3 color = texture2D(mTexture, vUv).xyz;
  gl_FragColor = vec4(color, opacity);
}