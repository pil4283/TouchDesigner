#define MAX_POINTS 100 // 최대 점 개수

uniform vec2 uPoints[MAX_POINTS]; // 좌표 배열
uniform vec2 uDirections[MAX_POINTS];
uniform vec3 uColors[MAX_POINTS]; // 색상 배열
uniform float uRadius; // 반경 배열
uniform float uAspectRatio;
uniform int uNumPoints; // 실제 점 개수

out vec4 fragColor;
void main() {
    vec2 velocity = vec2(0.0);
    
    for(int i=0; i<uNumPoints; i++){
        vec2 p = vUV.st - uPoints[i];
        p.x *= uAspectRatio;
        
        // 가우시안 힘 적용 (방향+크기)
        float weight = exp(-dot(p,p)/uRadius);
        velocity += uForces[i] * weight;
    }
    
    fragColor = vec4(velocity, 0.0, 1.0);
}