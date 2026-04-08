import { PresentationControls } from '@react-three/drei';
import React, { use } from 'react'
import { useRef } from 'react'
import MacbookModel16 from '../models/Macbook-16';
import MacbookModel14 from '../models/Macbook-14';
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react"

const ANIMATION_DURATION=1;
const OFFSET_DISTANCE=5;

const fadeMeshes= (group,opacity) => {
    if(!group) return;
    group.traverse((child)=>{
        if(child.isMesh){
            child.material.transparent=true;
            gsap.to(child.material, { opacity, duration: ANIMATION_DURATION });
        }
    })
}


const moveGroup = (group,x) =>{
    if(!group) return;
    gsap.to(group.position, { x, duration: ANIMATION_DURATION });
}

const ModelSwitcher = ({ scale, isMobile }) => {

    const SCALE_LARGE_DESKTOP=0.08;
    const SCALE_LARGE_MOBILE=0.05;


    const smallMacBookRef=useRef();
    const largeMacBookRef=useRef();

    const showLargeMacBook = scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE;

    useGSAP(() => {
        if(showLargeMacBook){
        moveGroup(smallMacBookRef.current, -OFFSET_DISTANCE);
        moveGroup(largeMacBookRef.current, 0);

        fadeMeshes(smallMacBookRef.current, 0);
        fadeMeshes(largeMacBookRef.current, 1);

        }else{
        moveGroup(smallMacBookRef.current, 0);
        moveGroup(largeMacBookRef.current, OFFSET_DISTANCE);

        fadeMeshes(smallMacBookRef.current, 1);
        fadeMeshes(largeMacBookRef.current, 0);
        }
    },[scale])

//snap will maek the model return to its original position after the user realease the controls
    const controlsConfig={
            snap: true,
            speed: 1,
            zoom:1,
            //polar is the vertical rotation of the model, it will limit the rotation of the model to a certain range, in this case it will limit the rotation to 90 degrees up and 90 degrees down, so the user can only rotate the model in a certain range, and it will prevent the user from rotating the model upside down or too much to the sides
            // polar: [-Math.PI/2, Math.PI/2],
            //azimuth is the horizontal rotation of the model, it will limit the rotation of the model to a certain range, in this case it will limit the rotation to 360 degrees, so the user can rotate the model all the way around, but it will prevent the user from rotating the model too much to the sides, and it will prevent the user from rotating the model upside down
            azimuth: [-Infinity, Infinity],
            // mass is the mass of the model, it will affect the inertia of the model, so the higher the mass, the more inertia the model will have, and the slower it will rotate, and the lower the mass, the less inertia the model will have, and the faster it will rotate
            config: { mass: 1, tension: 0, friction: 26 }
    }
  
  return (
    <>
        <PresentationControls {...controlsConfig}>
            <group ref={largeMacBookRef}>
                <MacbookModel16 scale={isMobile ? 0.05 : 0.08}/>
            </group>

        </PresentationControls>

        <PresentationControls {...controlsConfig}>
            <group ref={smallMacBookRef}>
                <MacbookModel14 scale={isMobile ? 0.03 : 0.06}/>
            </group>

        </PresentationControls>
    </>
  )
}

export default ModelSwitcher
