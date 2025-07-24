'use client';
import { useEffect, useRef } from 'react';

export default function Background() {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const prevMousePos = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize WebGL
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

const fragmentShaderSource = `
precision highp float;

uniform vec2 iResolution;
uniform float iTime;
uniform vec4 iMouse;
uniform vec2 uMouseForce;

float rand(vec2 co) {
        return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
      }

// Utility functions
float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// Fixed-iteration FBM
float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  
  value += amplitude * noise(p * 1.0);
  amplitude *= 0.5;
  value += amplitude * noise(p * 2.0);
  amplitude *= 0.5;
  value += amplitude * noise(p * 4.0);
  amplitude *= 0.5;
  value += amplitude * noise(p * 8.0);
  
  return value;
}

// Fluid simulation
vec2 slowFluid(vec2 p, float time, float speed) {
  vec2 v = vec2(0.0);
  
  // Manually unrolled loop
  float t1 = time * 1.0 * speed;
  vec2 pos1 = p * 1.0 * 0.3;
  v.x += sin(pos1.y + t1 * 0.8) * cos(pos1.x - t1 * 1.2) * (2.0 / 1.0);
  v.y += cos(pos1.x + t1 * 0.8) * sin(pos1.y + t1 * 1.2) * (2.0 / 1.0);
  
  float t2 = time * 2.0 * speed;
  vec2 pos2 = p * 2.0 * 0.3;
  v.x += sin(pos2.y + t2 * 0.8) * cos(pos2.x - t2 * 1.2) * (2.0 / 2.0);
  v.y += cos(pos2.x + t2 * 0.8) * sin(pos2.y + t2 * 1.2) * (2.0 / 2.0);
  
  float t3 = time * 3.0 * speed;
  vec2 pos3 = p * 3.0 * 0.3;
  v.x += sin(pos3.y + t3 * 0.8) * cos(pos3.x - t3 * 1.2) * (2.0 / 3.0);
  v.y += cos(pos3.x + t3 * 0.8) * sin(pos3.y + t3 * 1.2) * (2.0 / 3.0);
  
  return v * 0.3;
}

// Magma flow functions
float smoothCollision(float a, float b, float smoothness) {
  return smoothstep(0.0, smoothness, a) * smoothstep(0.0, smoothness, b);
}

float cornerMagma(vec2 p, vec2 corner, float time, float speed) {
  vec2 center = vec2(0.5 * iResolution.x / iResolution.y, 0.5);
  vec2 dir = normalize(center - corner);
  float dist = length(p - corner);
  float strength = smoothstep(1.5, 0.0, dist);
  vec2 distortion = slowFluid(p * 0.5, time, speed * 0.5);
  vec2 flowPos = p + distortion * 0.2;
  float flow = fbm(flowPos - dir * time * speed * 0.25);
  flow *= 0.90 + 0.1 * sin(time * 0.05 + dist * 2.0);
  return flow * strength;
}

float magmaLayer(vec2 p, float depth, float time, float speed) {
  vec2 distortion = slowFluid(p, time, speed) * (1.0 - depth * 0.5);
  float layer = fbm(p + distortion + vec2(time * 0.05 * speed, 0.0));
  layer = mix(layer, layer * layer, depth + 18.85);
  return layer;
}

// Main image function
      void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        vec2 uv = fragCoord/iResolution.xy;
        vec2 p = uv;
        p.x *= iResolution.x / iResolution.y;
        
        // Apply distortion based on mouse force
        vec2 distortion = uMouseForce * 0.1 * smoothstep(0.0, 0.2, length(uMouseForce));
        p += distortion * (0.5 + 0.5 * sin(iTime * 2.0));
  
  float time = iTime * 0.15;
  vec2 mouse = iMouse.xy / iResolution.xy;
  mouse.x *= iResolution.x / iResolution.y;
  
  vec2 cornerTL = vec2(0.0, 1.0);
  vec2 cornerTR = vec2(iResolution.x / iResolution.y, 1.0);
  vec2 cornerBL = vec2(0.0, 0.0);
  vec2 cornerBR = vec2(iResolution.x / iResolution.y, 0.0);
  
  float speedTL = 0.2 + 0.5 * sin(time * 0.3);
  float speedTR = 0.25 + 0.5 * sin(time * 0.25 + 1.0);
  float speedBL = 0.18 + 0.5 * sin(time * 0.2 + 2.0);
  float speedBR = 0.22 + 0.5 * sin(time * 0.35 + 3.0);
  
  float magmaTL = cornerMagma(p, cornerTL, time, speedTL);
  float magmaTR = cornerMagma(p, cornerTR, time, speedTR);
  float magmaBL = cornerMagma(p, cornerBL, time, speedBL);
  float magmaBR = cornerMagma(p, cornerBR, time, speedBR);
  
  float depthTL = magmaTL * (0.7 + 0.9 * fbm(p * 2.0 + time * 0.03));
  float depthTR = magmaTR * (0.7 + 0.9 * fbm(p * 2.0 + time * 0.04 + 10.0));
  float depthBL = magmaBL * (0.7 + 0.9 * fbm(p * 2.0 + time * 0.02 + 20.0));
  float depthBR = magmaBR * (0.7 + 0.9 * fbm(p * 2.0 + time * 0.05 + 30.0));
  
  float layerTL = magmaLayer(p, depthTL, time, speedTL);
  float layerTR = magmaLayer(p, depthTR, time, speedTR);
  float layerBL = magmaLayer(p, depthBL, time, speedBL);
  float layerBR = magmaLayer(p, depthBR, time, speedBR);
  
  layerTL = mix(layerTL, layerTL * layerTL, depthTL);
  layerTR = mix(layerTR, layerTR * layerTR, depthTR);
  layerBL = mix(layerBL, layerBL * layerBL, depthBL);
  layerBR = mix(layerBR, layerBR * layerBR, depthBR);
  
  float collisionTL_TR = smoothCollision(magmaTL, magmaTR, 0.3);
  float collisionTL_BL = smoothCollision(magmaTL, magmaBL, 0.3);
  float collisionTR_BR = smoothCollision(magmaTR, magmaBR, 0.3);
  float collisionBL_BR = smoothCollision(magmaBL, magmaBR, 0.3);
  
  float weightTL = magmaTL * layerTL;
  float weightTR = magmaTR * layerTR;
  float weightBL = magmaBL * layerBL;
  float weightBR = magmaBR * layerBR;
  
  float totalWeight = weightTL + weightTR + weightBL + weightBR + 0.001;
  weightTL /= totalWeight;
  weightTR /= totalWeight;
  weightBL /= totalWeight;
  weightBR /= totalWeight;
  
  vec3 colorTL = vec3(0.8, 0.4, 0.05);
  vec3 colorTR = vec3(0.7, 0.1, 0.0);
  vec3 colorBL = vec3(0.9, 0.3, 0.1);
  vec3 colorBR = vec3(0.6, 0.1, 0.05);
  
  colorTL *= 0.9 + 0.2 * fbm(p * 3.0 + time * 0.1);
  colorTR *= 0.9 + 0.2 * fbm(p * 3.0 + time * 0.12 + 10.0);
  colorBL *= 0.9 + 0.2 * fbm(p * 3.0 + time * 0.09 + 20.0);
  colorBR *= 0.9 + 0.2 * fbm(p * 3.0 + time * 0.11 + 30.0);
  
  vec3 finalColor = vec3(0.0);
  finalColor += colorTL * weightTL;
  finalColor += colorTR * weightTR;
  finalColor += colorBL * weightBL;
  finalColor += colorBR * weightBR;
  
  vec3 collisionColor = vec3(1.0, 0.5, 0.2);
  float collisionTotal = collisionTL_TR + collisionTL_BL + collisionTR_BR + collisionBL_BR;
  finalColor = mix(finalColor, collisionColor, collisionTotal * 0.95);
  
  float totalDepth = depthTL * weightTL + depthTR * weightTR + depthBL * weightBL + depthBR * weightBR;
  finalColor = mix(finalColor * 0.7, finalColor * 1.5, totalDepth+0.30);
  
  float heat = fbm(p * 2.0 + time * 0.07);
  heat = pow(heat, 2.0);
  finalColor += vec3(0.3, 0.1, 0.0) * heat * 0.2;
  
  float vignette = 1.0 - smoothstep(0.5, 1.2, length(uv - vec2(0.5)));
  finalColor *= vignette;
  
  fragColor = vec4(finalColor, 1.0);

        float grain = rand(uv + iTime) * 0.1;
        finalColor += grain;
        
        fragColor = vec4(finalColor, 5.0);
}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

    // Compile shaders
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    // Check for shader errors
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.error('Vertex shader error:', gl.getShaderInfoLog(vertexShader));
    }

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error('Fragment shader error:', gl.getShaderInfoLog(fragmentShader));
    }

    // Create program
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Full-screen quad
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const resolutionUniform = gl.getUniformLocation(program, 'iResolution');
    const timeUniform = gl.getUniformLocation(program, 'iTime');
    const mouseForceUniform = gl.getUniformLocation(program, 'uMouseForce');

    // Mouse tracking
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current.x = (e.clientX - rect.left) / rect.width;
      mousePos.current.y = 1.0 - (e.clientY - rect.top) / rect.height;
    };

    // Only track mouse movement
    canvas.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationFrameId;
    const startTime = Date.now();
    const mouseForce = { x: 0, y: 0 };

    const animate = () => {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / 1000;

      // Calculate mouse force based on movement
      mouseForce.x = (mousePos.current.x - prevMousePos.current.x) * 0.1;
      mouseForce.y = (mousePos.current.y - prevMousePos.current.y) * 0.1;
      prevMousePos.current = { ...mousePos.current };

      gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
      gl.uniform1f(timeUniform, elapsedTime);
      gl.uniform2f(mouseForceUniform, mouseForce.x, mouseForce.y);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
}