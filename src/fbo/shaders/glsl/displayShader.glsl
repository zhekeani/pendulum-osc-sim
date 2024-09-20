precision highp float;
precision highp sampler2D;

varying vec2 vUv;
uniform sampler2D pTexture;
// uniform sampler2D mTexture;

void main () {
  vec3 c = texture2D(pTexture, vUv).rgb;
  float a = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c, a);

}
