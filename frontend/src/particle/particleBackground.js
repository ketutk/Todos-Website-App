import Particles from "react-tsparticles";
import particleConfig from "./particleConfig";

import { loadFull } from "tsparticles";
import { useCallback } from "react";
export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);
  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);
  return <Particles options={particleConfig} id="tsparticles" init={particlesInit} loaded={particlesLoaded} />;
}
