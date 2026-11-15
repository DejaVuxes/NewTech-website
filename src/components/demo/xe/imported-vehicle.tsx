"use client";

import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import * as THREE from "three";
import type { Model, Paint, Rim } from "./data";

/** Keep cached geometry/textures shared, but give each viewer its own materials. */
export function ImportedVehicle({ model, paint, rim }: { model: Model; paint: Paint; rim: Rim }) {
  const asset = model.asset!;
  const gltf = useGLTF(asset.src, false, false, (loader) => loader.setMeshoptDecoder(MeshoptDecoder));
  const prepared = useMemo(() => {
    const object = gltf.scene.clone(true);
    const materials = new Map<THREE.Material, THREE.Material>();
    const paintMaterials: THREE.MeshStandardMaterial[] = [];
    const rimMaterials: THREE.MeshStandardMaterial[] = [];
    const paintPattern = new RegExp(asset.paintMaterial);
    const rimPattern = asset.rimMaterial ? new RegExp(asset.rimMaterial) : null;
    object.traverse((node) => {
      if (!(node instanceof THREE.Mesh)) return;
      node.castShadow = true;
      node.receiveShadow = true;
      const clone = (original: THREE.Material) => {
        if (materials.has(original)) return materials.get(original)!;
        const material = original.clone();
        materials.set(original, material);
        if (material instanceof THREE.MeshStandardMaterial) {
          if (paintPattern.test(material.name)) {
            // Original paint maps bake in a colour. Preserve normal/AO maps,
            // but let the configurator supply the body colour instead.
            material.map = null;
            material.metalness = 0.55;
            material.roughness = 0.28;
            paintMaterials.push(material);
          } else if (rimPattern?.test(material.name)) {
            rimMaterials.push(material);
          }
          if (material.transparent) material.depthWrite = false;
        }
        return material;
      };
      node.material = Array.isArray(node.material) ? node.material.map(clone) : clone(node.material);
    });
    object.updateMatrixWorld(true);
    let bounds = new THREE.Box3().setFromObject(object);
    let size = bounds.getSize(new THREE.Vector3());
    if (size.z > size.x) {
      object.rotation.y += Math.PI / 2;
      object.updateMatrixWorld(true);
      bounds = new THREE.Box3().setFromObject(object);
      size = bounds.getSize(new THREE.Vector3());
    }
    const centre = bounds.getCenter(new THREE.Vector3());
    const scale = Math.min((model.type === "bike" ? 4.1 : 4.7) / size.x, 2.7 / size.y);
    return { object, materials, paintMaterials, rimMaterials, scale, offset: [-centre.x, -bounds.min.y, -centre.z] as [number, number, number] };
  }, [gltf.scene, asset, model.type]);

  useEffect(() => {
    prepared.paintMaterials.forEach((material) => material.color.set(paint.hex));
    prepared.rimMaterials.forEach((material) => {
      material.color.set(rim.hex);
      material.metalness = rim.metalness;
      material.roughness = rim.roughness;
    });
  }, [prepared, paint.hex, rim]);

  useEffect(() => () => prepared.materials.forEach((material) => material.dispose()), [prepared]);

  return (
    <group scale={prepared.scale} position-y={0.02}>
      <group position={prepared.offset}>
        <primitive object={prepared.object} dispose={null} />
      </group>
    </group>
  );
}
