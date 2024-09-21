precision highp float;
precision highp sampler2D;

varying vec2 vUv;  
uniform sampler2D stateTexture; 
uniform float g;
uniform float L;    
uniform float mu;

void main() {
    vec4 currentState = texture2D(stateTexture, vUv);

    float theta = currentState.r;
    float thetaDot = currentState.g;
    
    float dTheta_dt = thetaDot;
    float dThetaDot_dt = - mu * thetaDot - (g / L) * sin(theta);  

    gl_FragColor = vec4(dTheta_dt, dThetaDot_dt, 0.0, 1.0);
}
