import { Environment, Lightformer } from '@react-three/drei'
import { rect } from 'framer-motion/client'
import React from 'react'

const StudioLights = () => {
  return (
    // div doesnt work on canvas , u use group (a threejs component) instead to wrap the lights
    /* environment is used to wrap the scene with lights and reflections */
    //lightformer is a light that can be used to create a studio lighting setup, it can be used to create a softbox, a spotlight, a point light, etc. it can be used to create a realistic lighting setup for the model
    <group name='Lights'>
        <Environment resolution={256}>  
             <group>
                <Lightformer
                form="rect"
                intensity={10}
                position={[-10,5,-5]}
                scale={10}
                rotateY={Math.PI/2}
                />

                <Lightformer
                form="rect"
                intensity={10}
                position={[10,0,1]}
                scale={10}
                rotateY={Math.PI/2}
                />
             </group>
        </Environment>
        <spotLight
        position={[-2,10,5]}
        angle={0.15}
        decay={0}
        intensity={Math.PI*0.2}
        />

        <spotLight
        position={[0,-25,10]}
        angle={0.15}
        decay={0}
        intensity={Math.PI*0.2}
        />

        <spotLight
        position={[0,15,5]}
        angle={0.15}
        decay={0.1}
        intensity={Math.PI*1}
        />
    </group>
  )
}

export default StudioLights
