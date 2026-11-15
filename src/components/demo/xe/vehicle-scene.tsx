"use client";
/* three.js materials are mutable GPU objects that r3f expects us to update imperatively. */
/* eslint-disable react-hooks/immutability */

/**
 * Procedural 3D showroom (no model files are downloaded).
 * Cars: extruded side profile (body) + extruded greenhouse (glass) + painted roof + wheels.
 * Bikes: torus wheels, tube frame, capsule tank/seat, scooter body panels.
 * Paint and rim colours lerp to their new value so a swatch click visibly "repaints" the vehicle.
 */
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { BikeShape, CarShape, Model, Paint, Rim } from "./data";

type Mats = { paint: THREE.MeshPhysicalMaterial; rim: THREE.MeshStandardMaterial };

const rubber = new THREE.MeshStandardMaterial({ color: "#16181b", roughness: 0.92, metalness: 0 });
const trimDark = new THREE.MeshStandardMaterial({ color: "#1d2024", roughness: 0.55, metalness: 0.2 });
const chrome = new THREE.MeshStandardMaterial({ color: "#d9dde1", roughness: 0.15, metalness: 1 });
const engineMat = new THREE.MeshStandardMaterial({ color: "#3a3f45", roughness: 0.4, metalness: 0.8 });
const seatMat = new THREE.MeshStandardMaterial({ color: "#26201c", roughness: 0.8, metalness: 0 });
const glass = new THREE.MeshPhysicalMaterial({
  color: "#26323c",
  roughness: 0.04,
  metalness: 0.2,
  clearcoat: 1,
  transparent: true,
  opacity: 0.88,
});
const headlight = new THREE.MeshStandardMaterial({ color: "#ffffff", emissive: "#f4f7ff", emissiveIntensity: 2.2 });
const taillight = new THREE.MeshStandardMaterial({ color: "#7a0d14", emissive: "#d01826", emissiveIntensity: 1.6 });

/* ------------------------------------------------------------------ cars */

type CarDims = {
  L: number; W: number; r: number; g: number; belt: number; roof: number;
  wb: number; hoodDrop: number; cabin: [number, number, number, number]; // rear base, rear top, front top, front base (x)
};

const CAR: Record<CarShape, CarDims> = {
  sedan: { L: 4.5, W: 1.8, r: 0.34, g: 0.18, belt: 0.86, roof: 1.42, wb: 2.7, hoodDrop: 0.14, cabin: [-1.55, -0.95, 0.45, 1.05] },
  suv: { L: 4.7, W: 1.92, r: 0.4, g: 0.26, belt: 1.06, roof: 1.78, wb: 2.85, hoodDrop: 0.1, cabin: [-2.05, -1.9, 0.55, 1.05] },
  coupe: { L: 4.45, W: 1.86, r: 0.35, g: 0.15, belt: 0.78, roof: 1.26, wb: 2.6, hoodDrop: 0.16, cabin: [-1.9, -0.75, 0.25, 0.95] },
};

function bodyShape(d: CarDims) {
  const { L, r, g, belt, wb, hoodDrop } = d;
  const xf = wb / 2 + 0.05;
  const xr = -wb / 2 + 0.05;
  const ra = r + 0.07;
  const a0 = Math.asin((g - r) / ra); // where the arch meets the sill line
  const h = L / 2;
  const s = new THREE.Shape();
  s.moveTo(-h, g + 0.16);
  s.lineTo(-h, belt - 0.12);
  s.quadraticCurveTo(-h, belt, -h + 0.18, belt);
  s.lineTo(h - 1.1, belt);
  s.quadraticCurveTo(h - 0.35, belt - hoodDrop * 0.4, h - 0.12, belt - hoodDrop - 0.1);
  s.quadraticCurveTo(h, belt - hoodDrop - 0.16, h, belt - hoodDrop - 0.3);
  s.lineTo(h, g + 0.2);
  s.quadraticCurveTo(h, g, h - 0.18, g);
  s.lineTo(xf + ra * Math.cos(a0), g);
  s.absarc(xf, r, ra, a0, Math.PI - a0, false);
  s.lineTo(xr + ra * Math.cos(a0), g);
  s.absarc(xr, r, ra, a0, Math.PI - a0, false);
  s.lineTo(-h + 0.16, g);
  s.quadraticCurveTo(-h, g, -h, g + 0.16);
  return s;
}

function cabinShape(d: CarDims, inset = 0) {
  const [rb, rt, ft, fb] = d.cabin;
  const b = d.belt - 0.02;
  const t = d.roof - inset;
  const s = new THREE.Shape();
  s.moveTo(rb + inset, b);
  s.quadraticCurveTo(rt - 0.05, t - 0.02, rt + 0.25, t);
  s.lineTo(ft - 0.25, t);
  s.quadraticCurveTo(ft + 0.05, t - 0.01, fb - inset, b);
  s.closePath();
  return s;
}

function roofShape(d: CarDims) {
  const [, rt, ft] = d.cabin;
  const t = d.roof;
  const s = new THREE.Shape();
  s.moveTo(rt + 0.12, t - 0.02);
  s.lineTo(ft - 0.12, t - 0.02);
  s.quadraticCurveTo(ft - 0.08, t + 0.06, ft - 0.32, t + 0.06);
  s.lineTo(rt + 0.32, t + 0.06);
  s.quadraticCurveTo(rt + 0.06, t + 0.05, rt + 0.12, t - 0.02);
  return s;
}

function extrude(shape: THREE.Shape, depth: number, bevel = 0.06) {
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 5,
    curveSegments: 32,
  });
  geo.translate(0, 0, -depth / 2);
  geo.computeVertexNormals();
  return geo;
}

function CarWheel({ r, mats, side }: { r: number; mats: Mats; side: 1 | -1 }) {
  const spokes = [0, 1, 2, 3, 4];
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh material={rubber} castShadow>
        <cylinderGeometry args={[r, r, 0.26, 40]} />
      </mesh>
      <mesh material={rubber} position={[0, side * 0.13, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[r * 0.86, r * 0.14, 12, 40]} />
      </mesh>
      <mesh material={mats.rim} position={[0, side * 0.12, 0]}>
        <cylinderGeometry args={[r * 0.66, r * 0.66, 0.04, 40]} />
      </mesh>
      {spokes.map((i) => (
        <mesh key={i} material={mats.rim} position={[0, side * 0.145, 0]} rotation={[0, (i / 5) * Math.PI * 2, 0]}>
          <boxGeometry args={[r * 1.3, 0.03, 0.07]} />
        </mesh>
      ))}
      <mesh material={trimDark} position={[0, side * 0.15, 0]}>
        <cylinderGeometry args={[r * 0.14, r * 0.14, 0.03, 20]} />
      </mesh>
    </group>
  );
}

function Car({ shape, mats }: { shape: CarShape; mats: Mats }) {
  const d = CAR[shape];
  const geos = useMemo(
    () => ({
      body: extrude(bodyShape(d), d.W - 0.12, 0.06),
      cabin: extrude(cabinShape(d), d.W * 0.78, 0.07),
      roof: extrude(roofShape(d), d.W * 0.84, 0.04),
    }),
    [d]
  );
  useEffect(() => () => Object.values(geos).forEach((g) => g.dispose()), [geos]);
  const xf = d.wb / 2 + 0.05;
  const xr = -d.wb / 2 + 0.05;
  const zw = d.W / 2 - 0.16;
  const h = d.L / 2;
  const lightY = d.belt - d.hoodDrop - 0.2;
  return (
    <group>
      <mesh geometry={geos.body} material={mats.paint} castShadow receiveShadow />
      <mesh geometry={geos.cabin} material={glass} castShadow />
      <mesh geometry={geos.roof} material={mats.paint} castShadow />
      {/* lower sill / bumpers */}
      <mesh material={trimDark} position={[0, d.g + 0.05, 0]}>
        <boxGeometry args={[d.L - 0.4, 0.08, d.W - 0.02]} />
      </mesh>
      <mesh material={trimDark} position={[h + 0.02, d.g + 0.16, 0]}>
        <boxGeometry args={[0.06, 0.14, d.W * 0.56]} />
      </mesh>
      {/* light strips */}
      <mesh material={headlight} position={[h + 0.05, lightY, 0]}>
        <boxGeometry args={[0.03, 0.04, d.W * 0.86]} />
      </mesh>
      <mesh material={taillight} position={[-h - 0.05, d.belt - 0.18, 0]}>
        <boxGeometry args={[0.03, 0.05, d.W * 0.9]} />
      </mesh>
      {/* mirrors */}
      {[1, -1].map((s) => (
        <mesh key={s} material={mats.paint} position={[d.cabin[3] - 0.25, d.belt + 0.08, s * (d.W / 2 + 0.04)]} castShadow>
          <boxGeometry args={[0.16, 0.1, 0.14]} />
        </mesh>
      ))}
      {[
        [xf, 1],
        [xf, -1],
        [xr, 1],
        [xr, -1],
      ].map(([x, s]) => (
        <group key={`${x}${s}`} position={[x, d.r, s * zw]}>
          <CarWheel r={d.r} mats={mats} side={s as 1 | -1} />
        </group>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ bikes */

const tube = (pts: [number, number, number][], radius: number) =>
  new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p))), 48, radius, 12, false);

function BikeWheel({ R, wide, mats }: { R: number; wide: number; mats: Mats }) {
  return (
    <group>
      <mesh material={rubber} castShadow>
        <torusGeometry args={[R - wide, wide, 16, 48]} />
      </mesh>
      <mesh material={mats.rim}>
        <torusGeometry args={[R - wide * 2.1, 0.018, 8, 48]} />
      </mesh>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh key={i} material={mats.rim} rotation={[0, 0, (i / 6) * Math.PI]}>
          <boxGeometry args={[(R - wide * 2) * 2, 0.025, 0.02]} />
        </mesh>
      ))}
      <mesh material={engineMat} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.14, 20]} />
      </mesh>
    </group>
  );
}

const BIKE: Record<BikeShape, { R: number; wide: number; wb: number; head: [number, number]; seatY: number }> = {
  scooter: { R: 0.29, wide: 0.06, wb: 1.32, head: [0.52, 0.98], seatY: 0.78 },
  naked: { R: 0.33, wide: 0.07, wb: 1.42, head: [0.5, 1.0], seatY: 0.82 },
  cafe: { R: 0.34, wide: 0.065, wb: 1.46, head: [0.55, 0.96], seatY: 0.8 },
};

function Bike({ shape, mats }: { shape: BikeShape; mats: Mats }) {
  const p = BIKE[shape];
  const xf = p.wb / 2;
  const xr = -p.wb / 2;
  const [hx, hy] = p.head;
  const geos = useMemo(() => {
    const fork = tube([[xf, p.R, 0], [hx + 0.04, hy - 0.2, 0], [hx, hy, 0]], 0.028);
    const bar =
      shape === "cafe"
        ? tube([[hx - 0.05, hy - 0.02, -0.34], [hx - 0.02, hy - 0.04, 0], [hx - 0.05, hy - 0.02, 0.34]], 0.016)
        : tube([[hx - 0.16, hy + 0.12, -0.36], [hx - 0.02, hy + 0.06, 0], [hx - 0.16, hy + 0.12, 0.36]], 0.016);
    const frame =
      shape === "scooter"
        ? tube([[hx - 0.02, hy - 0.05, 0], [0.25, 0.3, 0], [-0.25, 0.3, 0], [xr + 0.35, p.R + 0.1, 0]], 0.03)
        : tube([[hx - 0.02, hy - 0.02, 0], [0.05, hy - 0.06, 0], [-0.25, 0.62, 0], [-0.3, 0.42, 0], [xr + 0.05, p.R, 0]], 0.03);
    const exhaust =
      shape === "scooter"
        ? tube([[0.0, 0.26, 0.14], [-0.4, 0.28, 0.18], [xr + 0.05, 0.36, 0.17]], 0.04)
        : tube([[0.12, 0.32, 0.1], [-0.1, 0.22, 0.17], [xr + 0.2, shape === "cafe" ? 0.34 : 0.5, 0.18]], 0.035);
    return { fork, bar, frame, exhaust };
  }, [shape, xf, xr, hx, hy, p.R]);
  useEffect(() => () => Object.values(geos).forEach((g) => g.dispose()), [geos]);

  return (
    <group>
      <group position={[xf, p.R, 0]}>
        <BikeWheel R={p.R} wide={p.wide} mats={mats} />
      </group>
      <group position={[xr, p.R, 0]}>
        <BikeWheel R={p.R} wide={p.wide * 1.2} mats={mats} />
      </group>
      {[0.06, -0.06].map((z) => (
        <mesh key={z} geometry={geos.fork} material={chrome} position={[0, 0, z]} castShadow />
      ))}
      <mesh geometry={geos.bar} material={trimDark} castShadow />
      <mesh geometry={geos.frame} material={shape === "scooter" ? trimDark : mats.rim} castShadow />
      <mesh geometry={geos.exhaust} material={chrome} castShadow />
      {/* swingarm */}
      <mesh material={engineMat} position={[(xr - 0.25) / 2 - 0.05, p.R + 0.08, 0.1]} rotation={[0, 0, 0.12]} castShadow>
        <boxGeometry args={[Math.abs(xr) + 0.1, 0.05, 0.04]} />
      </mesh>
      {/* headlight */}
      <mesh material={shape === "scooter" ? mats.paint : chrome} position={[hx + 0.08, hy - 0.08, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.085, 0.1, 28]} />
      </mesh>
      <mesh material={headlight} position={[hx + 0.135, hy - 0.08, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.075, 0.075, 0.01, 28]} />
      </mesh>
      <mesh material={taillight} position={[xr + 0.18, p.seatY + 0.04, 0]}>
        <boxGeometry args={[0.04, 0.04, 0.14]} />
      </mesh>

      {shape === "scooter" ? (
        <>
          {/* front shield */}
          <mesh material={mats.paint} position={[hx - 0.1, 0.62, 0]} rotation={[0, 0, -0.32]} castShadow>
            <capsuleGeometry args={[0.13, 0.42, 8, 24]} />
          </mesh>
          {/* floorboard */}
          <mesh material={trimDark} position={[0.02, 0.33, 0]} castShadow>
            <boxGeometry args={[0.62, 0.06, 0.3]} />
          </mesh>
          {/* rear body */}
          <mesh material={mats.paint} position={[-0.42, 0.55, 0]} rotation={[0, 0, Math.PI / 2 + 0.12]} scale={[1, 1, 0.82]} castShadow>
            <capsuleGeometry args={[0.2, 0.46, 10, 28]} />
          </mesh>
          <mesh material={seatMat} position={[-0.32, p.seatY, 0]} rotation={[0, 0, Math.PI / 2 + 0.05]} scale={[1, 1, 0.75]} castShadow>
            <capsuleGeometry args={[0.1, 0.5, 8, 24]} />
          </mesh>
          <mesh material={mats.paint} position={[xf, p.R, 0]} rotation={[0, 0, Math.PI * 0.1]} scale={[1, 1, 3]}>
            <torusGeometry args={[p.R + 0.05, 0.03, 8, 32, Math.PI * 0.65]} />
          </mesh>
        </>
      ) : (
        <>
          {/* engine block */}
          <mesh material={engineMat} position={[0.02, 0.42, 0]} castShadow>
            <boxGeometry args={[0.42, 0.34, 0.26]} />
          </mesh>
          {[-0.08, 0.06].map((x) => (
            <mesh key={x} material={chrome} position={[x + 0.04, 0.66, 0]} rotation={[0, 0, 0.2]}>
              <cylinderGeometry args={[0.07, 0.08, 0.18, 16]} />
            </mesh>
          ))}
          {/* tank */}
          <mesh
            material={mats.paint}
            position={[shape === "cafe" ? 0.04 : 0.1, hy - 0.08, 0]}
            rotation={[0, 0, Math.PI / 2 + (shape === "cafe" ? 0.04 : 0.16)]}
            scale={[1, 1, 0.78]}
            castShadow
          >
            <capsuleGeometry args={[0.16, shape === "cafe" ? 0.42 : 0.3, 10, 28]} />
          </mesh>
          {/* seat */}
          <mesh material={seatMat} position={[-0.32, p.seatY + 0.02, 0]} rotation={[0, 0, Math.PI / 2 - 0.06]} scale={[1, 1, 0.8]} castShadow>
            <capsuleGeometry args={[0.075, shape === "cafe" ? 0.32 : 0.42, 8, 24]} />
          </mesh>
          {shape === "cafe" ? (
            <mesh material={mats.paint} position={[-0.62, p.seatY + 0.06, 0]} castShadow>
              <sphereGeometry args={[0.1, 24, 16]} />
            </mesh>
          ) : (
            <mesh material={mats.paint} position={[-0.6, p.seatY + 0.01, 0]} rotation={[0, 0, -0.25]} castShadow>
              <boxGeometry args={[0.26, 0.05, 0.16]} />
            </mesh>
          )}
          <mesh material={mats.paint} position={[xf, p.R, 0]} rotation={[0, 0, Math.PI * 0.2]} scale={[1, 1, 2.6]}>
            <torusGeometry args={[p.R + 0.04, 0.025, 8, 32, Math.PI * 0.5]} />
          </mesh>
        </>
      )}
    </group>
  );
}

/* ------------------------------------------------------------------ scene */

function Vehicle({ model, paint, rim, reduced }: { model: Model; paint: Paint; rim: Rim; reduced: boolean }) {
  const mats = useMemo<Mats>(
    () => ({
      paint: new THREE.MeshPhysicalMaterial({
        color: paint.hex,
        metalness: 0.55,
        roughness: 0.32,
        clearcoat: 1,
        clearcoatRoughness: 0.04,
      }),
      rim: new THREE.MeshStandardMaterial({ color: rim.hex, metalness: rim.metalness, roughness: rim.roughness }),
    }),
    // materials are created once; colours lerp below
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  useEffect(() => () => {
    mats.paint.dispose();
    mats.rim.dispose();
  }, [mats]);

  const target = useRef({ paint: new THREE.Color(paint.hex), rim: new THREE.Color(rim.hex) });
  useEffect(() => {
    target.current.paint.set(paint.hex);
    target.current.rim.set(rim.hex);
    mats.rim.metalness = rim.metalness;
    mats.rim.roughness = rim.roughness;
    if (reduced) {
      mats.paint.color.set(paint.hex);
      mats.rim.color.set(rim.hex);
    }
  }, [paint, rim, mats, reduced]);

  // enter animation when the model changes
  const group = useRef<THREE.Group>(null);
  const enter = useRef(reduced ? 1 : 0);
  useEffect(() => {
    enter.current = reduced ? 1 : 0;
  }, [model.id, reduced]);

  useFrame((_, dt) => {
    const k = 1 - Math.exp(-dt * 6);
    mats.paint.color.lerp(target.current.paint, k);
    mats.rim.color.lerp(target.current.rim, k);
    if (group.current && enter.current < 1) {
      enter.current = Math.min(1, enter.current + dt * 1.8);
      const e = 1 - Math.pow(1 - enter.current, 3);
      group.current.position.x = (1 - e) * -0.8;
      group.current.rotation.y = (1 - e) * 0.5;
    }
  });

  const isBike = model.type === "bike";
  return (
    <group ref={group} scale={isBike ? 2.1 : 1}>
      {isBike ? <Bike shape={model.shape as BikeShape} mats={mats} /> : <Car shape={model.shape as CarShape} mats={mats} />}
    </group>
  );
}

/** Zoom buttons move the camera along its view ray (wheel zoom is off so the page keeps scrolling). */
const MIN_D = 5.6;
const MAX_D = 10.5;
function ZoomRig({ zoom }: { zoom: number }) {
  const camera = useThree((s) => s.camera);
  const aspect = useThree((s) => s.size.width / Math.max(1, s.size.height));
  const target = useMemo(() => new THREE.Vector3(0, 0.95, 0), []);
  useFrame((_, dt) => {
    // narrow canvases (mobile) need the camera further back to keep the whole vehicle in frame
    const want = (MAX_D - (MAX_D - MIN_D) * zoom) * Math.max(1, 1.35 / aspect);
    const dir = camera.position.clone().sub(target);
    const d = dir.length();
    if (Math.abs(d - want) < 0.001) return;
    dir.setLength(d + (want - d) * (1 - Math.exp(-dt * 8)));
    camera.position.copy(target).add(dir);
  });
  return null;
}

export default function VehicleScene({ model, paint, rim, zoom }: { model: Model; paint: Paint; rim: Rim; zoom: number }) {
  const reduced = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      camera={{ position: [5.4, 1.7, 5.8], fov: 30 }}
      aria-label={`Mô hình 3D ${model.name}, kéo để xoay`}
      role="img"
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 8, 3]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} />
      <Vehicle key={model.id} model={model} paint={paint} rim={rim} reduced={reduced} />
      {/* turntable rings on the floor */}
      {[2.8, 2.1].map((r, i) => (
        <mesh key={r} rotation-x={-Math.PI / 2} position-y={0.002}>
          <ringGeometry args={[r, r + 0.025, 128]} />
          <meshBasicMaterial color="#8a939c" transparent opacity={i ? 0.25 : 0.45} />
        </mesh>
      ))}
      <ContactShadows position={[0, 0.001, 0]} opacity={0.7} scale={10} blur={2} far={2} resolution={512} />
      {/* studio reflections built from light panels: nothing is fetched from the network */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.4} position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[10, 4, 1]} />
        <Lightformer form="rect" intensity={1.4} position={[-6, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={1.4} position={[6, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={0.8} position={[0, 1, 6]} scale={[8, 1.5, 1]} />
        <Lightformer form="ring" intensity={1.2} position={[0, 3, -6]} scale={3} />
      </Environment>
      <ZoomRig zoom={zoom} />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        minPolarAngle={0.6}
        maxPolarAngle={Math.PI / 2 - 0.06}
        target={[0, 0.95, 0]}
        autoRotate={!reduced}
        autoRotateSpeed={0.6}
        enableDamping
      />
    </Canvas>
  );
}
