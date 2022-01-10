import React, { useState, useRef, useEffect } from "react";
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";

const Vanta = () => {
  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE,
          color: 0x4ef6c7,
          backgroundColor: 0x1b1b1b,
          maxDistance: 30,
          spacing: 15,
          showDots: true,
          mouseControls: false,
          touchControls: true,
          gyroControls: false,
          minHeight: 450.0,
          minWidth: 600.0,
          maxWidth: 900.0,
          scale: 1.0,
          scaleMobile: 1.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return (
    <section style={{ height: 450 }} className="mb-12">
      <div
        id="#animation-bg"
        className="post-image relative"
        style={{
          height: "40vh",
        }}
        ref={vantaRef}
      ></div>
    </section>
  );
};

export default Vanta;
