"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * A stylized wireframe globe (schematic-style, matching the blueprint theme)
 * that sits behind the page content. It rotates continuously and its
 * rotation/zoom respond to scroll position, giving the "dynamic 3D on scroll"
 * effect. Built on raw three.js — no external map data required, so it
 * works fully offline/self-contained (no CDN geojson fetch).
 */
export function Scroll3DBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    // ---- Globe: wireframe sphere ----
    const globeGroup = new THREE.Group();

    const wireGeo = new THREE.SphereGeometry(2.4, 24, 18);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x2e4a66,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireSphere = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireSphere);

    // ---- Surface points (nodes) ----
    const pointCount = 140;
    const positions = new Float32Array(pointCount * 3);
    const colors = new Float32Array(pointCount * 3);
    const cyan = new THREE.Color(0x4fd1c5);
    const amber = new THREE.Color(0xffb454);

    for (let i = 0; i < pointCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / pointCount);
      const theta = Math.sqrt(pointCount * Math.PI) * phi;
      const r = 2.42;
      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);
      positions.set([x, y, z], i * 3);

      const c = Math.random() > 0.85 ? amber : cyan;
      colors.set([c.r, c.g, c.b], i * 3);
    }

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pointsGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const pointsMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const points = new THREE.Points(pointsGeo, pointsMat);
    globeGroup.add(points);

    // ---- A few connecting arcs (data links) ----
    const arcGroup = new THREE.Group();
    const arcMat = new THREE.LineBasicMaterial({
      color: 0x4fd1c5,
      transparent: true,
      opacity: 0.5,
    });

    function randomSpherePoint(radius: number) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      return new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
    }

    for (let i = 0; i < 7; i++) {
      const start = randomSpherePoint(2.42);
      const end = randomSpherePoint(2.42);
      const mid = start
        .clone()
        .add(end)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(3.1);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const curvePoints = curve.getPoints(32);
      const geo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const line = new THREE.Line(geo, arcMat);
      arcGroup.add(line);
    }
    globeGroup.add(arcGroup);

    globeGroup.position.set(2.6, -0.4, -2);
    scene.add(globeGroup);

    // ---- Ambient particle field (depth layer behind the globe) ----
    const fieldCount = 220;
    const fieldPositions = new Float32Array(fieldCount * 3);
    for (let i = 0; i < fieldCount; i++) {
      fieldPositions[i * 3] = (Math.random() - 0.5) * 16;
      fieldPositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      fieldPositions[i * 3 + 2] = -Math.random() * 10 - 2;
    }
    const fieldGeo = new THREE.BufferGeometry();
    fieldGeo.setAttribute("position", new THREE.BufferAttribute(fieldPositions, 3));
    const fieldMat = new THREE.PointsMaterial({
      color: 0x22405c,
      size: 0.03,
      transparent: true,
      opacity: 0.6,
    });
    const field = new THREE.Points(fieldGeo, fieldMat);
    scene.add(field);

    // ---- Scroll reactivity ----
    let scrollT = 0; // 0..1 eased scroll progress
    let targetScrollT = 0;

    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      targetScrollT = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    let raf = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const dt = clock.getDelta();

      if (!prefersReducedMotion) {
        globeGroup.rotation.y += dt * 0.12;
        points.rotation.y -= dt * 0.02;
      }

      // ease current scroll toward target
      scrollT += (targetScrollT - scrollT) * 0.06;

      // scroll drives: globe tilt + camera dolly + field drift
      globeGroup.rotation.x = scrollT * 0.9;
      globeGroup.position.y = -0.4 + scrollT * 1.6;
      camera.position.z = 7.2 - scrollT * 1.6;
      field.rotation.y = scrollT * 0.6;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      pointsGeo.dispose();
      pointsMat.dispose();
      fieldGeo.dispose();
      fieldMat.dispose();
      arcMat.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 opacity-80"
    />
  );
}
