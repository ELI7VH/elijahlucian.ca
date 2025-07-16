
// Example Pixel Shader

// uniform float exampleUniform;

out vec4 fragColor;
void main()
{

  float x = vUV.x;
  float y = vUV.y;

	vec4 color = texture(sTD2DInputs[0], vUV.st);
	
  // vec4 color = vec4(x, y, 1.0, 1.0);


	fragColor = TDOutputSwizzle(color);


}
