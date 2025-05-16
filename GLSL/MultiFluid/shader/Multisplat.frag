#define MAX_POINTS 100 // 최대 점 개수

uniform vec2 uPoints[MAX_POINTS]; // 좌표 배열
uniform vec2 uDirections[MAX_POINTS];
uniform vec3 uColors[MAX_POINTS]; // 색상 배열
uniform float uRadius; // 반경 배열
uniform float uAspectRatio;
uniform int uNumPoints; // 실제 점 개수

out vec4 fragColor;
void main() {
    vec3 base = texture(sTD2DInputs[0], vUV.st).xyz;
    vec3 splat = vec3(0.0);

    for (int i = 0; i < uNumPoints; i++) { // 실제 점 개수만큼 반복
    	vec2 p = vUV.xy - uPoints[i];
    	p.x *= uAspectRatio;

    	// normalized motion direction
    	vec2 dir = normalize(uDirections[i]);
    	// distance along dir (signed)
    	float forward = dot(p, dir);
    	// ignore pixels behind the splat point
    	if (forward < 0.0) continue;

    	// vector from axis (perpendicular component)
    	vec2 perp = p - dir * forward;
    	// Gaussian fall-off based on perpendicular distance
    	float weight = exp(-dot(perp, perp) / (uRadius * uRadius));

    	splat += weight * uColors[i];
    }

    fragColor = TDOutputSwizzle(vec4(base + splat, 1.0));
}