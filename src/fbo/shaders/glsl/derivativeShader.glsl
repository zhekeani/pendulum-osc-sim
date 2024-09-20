precision highp float;
precision highp sampler2D;

varying vec2 vUv;  // UV coordinates for texture sampling
uniform sampler2D stateTexture; // Texture that holds the current state [theta, thetaDot]
uniform float g;    // Gravitational constant
uniform float L;    // Length of the pendulum

void main() {
    // Fetch the current state from the texture
    vec4 currentState = texture2D(stateTexture, vUv);

    // Extract the current angle (theta) and angular velocity (thetaDot)
    float theta = currentState.r;      // The angle theta(t)
    float thetaDot = currentState.g;
    
    float dTheta_dt = thetaDot;
    float dThetaDot_dt = -thetaDot - (g / L) * sin(theta);  // Derivative of angular velocity

    // Output the new derivatives (dTheta/dt, dThetaDot/dt)
    gl_FragColor = vec4(dTheta_dt, dThetaDot_dt, 0.0, 1.0);
}
