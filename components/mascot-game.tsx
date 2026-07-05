"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Play, X } from "lucide-react";

type MoveKey = "forward" | "backward" | "left" | "right";

const KEY_TO_MOVE: Record<string, MoveKey> = {
  w: "forward",
  arrowup: "forward",
  s: "backward",
  arrowdown: "backward",
  a: "left",
  arrowleft: "left",
  d: "right",
  arrowright: "right",
};

function createMascot() {
  const group = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.42, 0.9, 8, 20),
    new THREE.MeshStandardMaterial({ color: 0xffd43b, roughness: 0.55 })
  );
  body.position.y = 0.95;
  group.add(body);

  const overalls = new THREE.Mesh(
    new THREE.BoxGeometry(0.72, 0.5, 0.46),
    new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.6 })
  );
  overalls.position.set(0, 0.58, 0.01);
  group.add(overalls);

  const strapMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.65 });
  [-0.22, 0.22].forEach((x) => {
    const strap = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.52, 0.5), strapMat);
    strap.position.set(x, 0.86, 0.05);
    strap.rotation.z = x > 0 ? -0.18 : 0.18;
    group.add(strap);
  });

  const goggleMat = new THREE.MeshStandardMaterial({
    color: 0xc8d0d8,
    metalness: 0.6,
    roughness: 0.25,
  });
  const lensMat = new THREE.MeshStandardMaterial({
    color: 0x0b1726,
    roughness: 0.35,
    emissive: 0x4fd1c5,
    emissiveIntensity: 0.2,
  });

  [-0.18, 0.18].forEach((x) => {
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.025, 12, 24), goggleMat);
    rim.position.set(x, 1.28, 0.38);
    group.add(rim);

    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.095, 24), lensMat);
    lens.position.set(x, 1.28, 0.405);
    group.add(lens);
  });

  const band = new THREE.Mesh(
    new THREE.BoxGeometry(0.92, 0.06, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x172033, roughness: 0.4 })
  );
  band.position.set(0, 1.28, 0.22);
  group.add(band);

  const smile = new THREE.Mesh(
    new THREE.TorusGeometry(0.12, 0.01, 8, 20, Math.PI),
    new THREE.MeshBasicMaterial({ color: 0x111827 })
  );
  smile.position.set(0, 1.05, 0.43);
  smile.rotation.z = Math.PI;
  group.add(smile);

  group.scale.setScalar(1.1);
  return group;
}

function createBanana() {
  const group = new THREE.Group();
  const fruit = new THREE.Mesh(
    new THREE.TorusGeometry(0.16, 0.035, 8, 24, Math.PI * 1.35),
    new THREE.MeshStandardMaterial({
      color: 0xffc928,
      emissive: 0x6b4c00,
      emissiveIntensity: 0.08,
      roughness: 0.4,
    })
  );
  fruit.rotation.set(0.2, 0, -0.7);
  group.add(fruit);

  const stemMat = new THREE.MeshStandardMaterial({ color: 0x5b3714, roughness: 0.7 });
  [-1, 1].forEach((side) => {
    const stem = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), stemMat);
    stem.position.set(side * 0.12, 0.12 * side, 0);
    group.add(stem);
  });

  group.position.y = 0.35;
  return group;
}

function randomWorldPosition(radius = 9) {
  const angle = Math.random() * Math.PI * 2;
  const distance = 2 + Math.random() * radius;
  return new THREE.Vector3(Math.cos(angle) * distance, 0, Math.sin(angle) * distance);
}

export function MascotGame() {
  const [open, setOpen] = useState(false);
  const [score, setScore] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchDirection = useRef({ x: 0, z: 0 });
  const activeMoves = useRef<Record<MoveKey, boolean>>({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    if (!open) return;
    const container = containerRef.current;
    if (!container) return;

    setScore(0);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07111f);
    scene.fog = new THREE.Fog(0x07111f, 12, 30);

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, 4, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const ambient = new THREE.HemisphereLight(0xb7fff8, 0x1b2a1b, 1.4);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xffffff, 2.4);
    sun.position.set(6, 10, 4);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    scene.add(sun);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(28, 28, 40, 40),
      new THREE.MeshStandardMaterial({ color: 0x1f7a42, roughness: 0.85 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const grid = new THREE.GridHelper(28, 28, 0x4fd1c5, 0x1c4250);
    grid.position.y = 0.01;
    scene.add(grid);

    const mascot = createMascot();
    mascot.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    scene.add(mascot);

    const bananas: THREE.Group[] = [];
    for (let i = 0; i < 14; i++) {
      const banana = createBanana();
      banana.position.copy(randomWorldPosition());
      banana.rotation.y = Math.random() * Math.PI * 2;
      bananas.push(banana);
      scene.add(banana);
    }

    const treeMat = new THREE.MeshStandardMaterial({ color: 0x175c32, roughness: 0.8 });
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x6b3f1d, roughness: 0.8 });
    for (let i = 0; i < 16; i++) {
      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.7, 8), trunkMat);
      trunk.position.y = 0.35;
      const top = new THREE.Mesh(new THREE.ConeGeometry(0.45, 1.1, 12), treeMat);
      top.position.y = 1.15;
      tree.add(trunk, top);
      tree.position.copy(randomWorldPosition(12));
      if (tree.position.length() < 4) tree.position.multiplyScalar(1.8);
      scene.add(tree);
    }

    let raf = 0;
    let collected = 0;
    const clock = new THREE.Clock();
    const velocity = new THREE.Vector3();
    const direction = new THREE.Vector3();
    const targetCamera = new THREE.Vector3();
    const pointerState = {
      id: null as number | null,
      startX: 0,
      startY: 0,
    };

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const keyDown = (event: KeyboardEvent) => {
      const move = KEY_TO_MOVE[event.key.toLowerCase()];
      if (!move) return;
      activeMoves.current[move] = true;
      event.preventDefault();
    };

    const keyUp = (event: KeyboardEvent) => {
      const move = KEY_TO_MOVE[event.key.toLowerCase()];
      if (!move) return;
      activeMoves.current[move] = false;
      event.preventDefault();
    };

    const updateTouchDirection = (event: PointerEvent) => {
      if (pointerState.id !== event.pointerId) return;
      const maxDistance = 84;
      const dx = THREE.MathUtils.clamp(
        event.clientX - pointerState.startX,
        -maxDistance,
        maxDistance
      );
      const dy = THREE.MathUtils.clamp(
        event.clientY - pointerState.startY,
        -maxDistance,
        maxDistance
      );
      touchDirection.current = {
        x: dx / maxDistance,
        z: dy / maxDistance,
      };
    };

    const pointerDown = (event: PointerEvent) => {
      if (!event.isPrimary || pointerState.id !== null) return;
      pointerState.id = event.pointerId;
      pointerState.startX = event.clientX;
      pointerState.startY = event.clientY;
      container.setPointerCapture(event.pointerId);
      updateTouchDirection(event);
      event.preventDefault();
    };

    const pointerMove = (event: PointerEvent) => {
      updateTouchDirection(event);
      if (pointerState.id === event.pointerId) event.preventDefault();
    };

    const pointerUp = (event: PointerEvent) => {
      if (pointerState.id !== event.pointerId) return;
      pointerState.id = null;
      touchDirection.current = { x: 0, z: 0 };
      if (container.hasPointerCapture(event.pointerId)) {
        container.releasePointerCapture(event.pointerId);
      }
      event.preventDefault();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    container.addEventListener("pointerdown", pointerDown);
    container.addEventListener("pointermove", pointerMove);
    container.addEventListener("pointerup", pointerUp);
    container.addEventListener("pointercancel", pointerUp);

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.04);
      const moves = activeMoves.current;
      const touch = touchDirection.current;

      direction.set(0, 0, 0);
      if (moves.forward) direction.z -= 1;
      if (moves.backward) direction.z += 1;
      if (moves.left) direction.x -= 1;
      if (moves.right) direction.x += 1;
      direction.x += touch.x;
      direction.z += touch.z;

      if (direction.lengthSq() > 0) {
        direction.normalize();
        velocity.lerp(direction.multiplyScalar(4.2), 0.18);
        mascot.rotation.y = Math.atan2(velocity.x, velocity.z);
      } else {
        velocity.lerp(new THREE.Vector3(0, 0, 0), 0.14);
      }

      mascot.position.addScaledVector(velocity, delta);
      mascot.position.x = THREE.MathUtils.clamp(mascot.position.x, -12.5, 12.5);
      mascot.position.z = THREE.MathUtils.clamp(mascot.position.z, -12.5, 12.5);
      mascot.position.y = Math.sin(clock.elapsedTime * 8) * 0.035;

      bananas.forEach((banana) => {
        banana.rotation.y += delta * 2;
        banana.position.y = 0.42 + Math.sin(clock.elapsedTime * 3 + banana.position.x) * 0.08;
        if (banana.visible && banana.position.distanceTo(mascot.position) < 0.9) {
          banana.visible = false;
          collected += 1;
          setScore(collected);
        }
      });

      targetCamera.set(mascot.position.x, mascot.position.y + 4.2, mascot.position.z + 7);
      camera.position.lerp(targetCamera, 0.08);
      camera.lookAt(mascot.position.x, mascot.position.y + 1, mascot.position.z);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
      container.removeEventListener("pointerdown", pointerDown);
      container.removeEventListener("pointermove", pointerMove);
      container.removeEventListener("pointerup", pointerUp);
      container.removeEventListener("pointercancel", pointerUp);
      document.body.style.overflow = previousOverflow;
      activeMoves.current = { forward: false, backward: false, left: false, right: false };
      touchDirection.current = { x: 0, z: 0 };
      scene.traverse((node) => {
        if (node instanceof THREE.Mesh) {
          node.geometry.dispose();
          const material = node.material;
          if (Array.isArray(material)) {
            material.forEach((m) => m.dispose());
          } else {
            material.dispose();
          }
        }
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#FFB454]/60 bg-[#FFB454] px-5 py-3 font-mono text-[0.82rem] font-semibold uppercase tracking-wide text-[#061018] shadow-[0_0_24px_rgba(255,180,84,0.22)] transition hover:-translate-y-0.5 hover:bg-[#ffc878]"
      >
        <Play size={16} fill="currentColor" />
        Play Game
      </button>

      {open && (
        <div className="fixed inset-0 z-[9999] flex flex-col bg-[#050b13]/95 px-4 py-4 text-[#E7ECF3] backdrop-blur-md md:px-8">
          <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between gap-4 border-b border-[#22405C] pb-3">
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-wide text-[#4FD1C5]">
                // Browser quest
              </p>
              <h3 className="font-display text-lg font-semibold md:text-2xl">
                Mascot Coding Adventure
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 rounded border border-[#22405C] px-3 py-2 font-mono text-[0.75rem] uppercase text-[#E7ECF3] transition hover:border-[#FFB454] hover:text-[#FFB454]"
            >
              <X size={15} />
              Close
            </button>
          </div>

          <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-2 py-3 font-mono text-[0.75rem] text-[#FFB454] sm:flex-row sm:items-center sm:justify-between">
            <span>Bananas collected: {score}</span>
            <span className="text-[#8CA0BC]">Desktop: W A S D / arrows · Mobile: drag the game screen</span>
          </div>

          <div
            ref={containerRef}
            className="mx-auto min-h-0 w-full max-w-[1120px] flex-1 touch-none select-none overflow-hidden rounded-lg border border-[#FFB454]/60 bg-[#07111f] shadow-[0_0_35px_rgba(79,209,197,0.12)]"
          />
          <p className="mx-auto mt-3 text-center font-mono text-[0.7rem] uppercase tracking-wide text-[#5D7592] sm:hidden">
            Touch and drag inside the game area to move
          </p>
        </div>
      )}
    </>
  );
}
