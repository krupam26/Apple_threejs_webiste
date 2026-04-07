import React, { use } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';


const Hero = () => {
    const videoRef = useRef();

    useEffect(()=>{
       if (videoRef.current) {
        videoRef.current.playbackRate=2; //if u want the video to play 2 times
       }
    },[]);
  return (
    <section id='hero'>
        <div>
            <h1>MacBook Pro</h1>
            <img src='/title.png' alt='Macbook Title' />
        </div>

        <video ref={videoRef} src='/videos/hero.mp4' autoPlay muted playsInline></video>
        <button>Buy</button>
        <p>From $1,999 or $166.62/mo. for 12 mo.*</p>
    </section>
  )
}

export default Hero
