"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1, 4);
    const material = new THREE.MeshStandardMaterial({
      color: 0x3366ff,
      flatShading: true,
      metalness: 0.2,
      roughness: 0.7,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(2, 2, 2);
    scene.add(light);

    const animate = () => {
      mesh.rotation.x += 0.002;
      mesh.rotation.y += 0.003;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      canvasRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (textRef.current) {
      gsap.from(textRef.current.children, {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out",
      });
    }
  }, []);

  return (
    <main className="relative w-full h-screen bg-black text-white overflow-hidden">
      <div ref={canvasRef} className="absolute inset-0 z-0" />
      <div
        ref={textRef}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-4">
          AuthVerse
        </h1>

        <p className="text-lg md:text-xl max-w-xl mb-6 opacity-80">
          Experience seamless authentication with stunning UI and secure access.
        </p>

        <div className="flex gap-4">
          <Link href="/login">
            <Button size="lg">Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline" className="text-black" size="lg">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .gradient-text {
          background: linear-gradient(90deg, #74c0fc, #9775fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </main>
  );
}
