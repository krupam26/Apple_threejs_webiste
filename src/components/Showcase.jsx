import { useGSAP } from '@gsap/react';
import React from 'react'
import { useMediaQuery } from 'react-responsive';
import gsap from 'gsap';
const Showcase = () => {
    const isTablet= useMediaQuery({query: '(max-width: 1024px)'});

    useGSAP(()=>{
        if(!isTablet){
            const timeline= gsap.timeline({
                scrollTrigger:{
                    trigger: "#showcase",
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    pin: true
                }
            });

            timeline
            .to('.mask img', {
                transform: 'scale(1.1)'
            })
            .to('.content', {
                opacity: 1,
                y: 0,
                ease: 'power1.in'
            })
        }
    }, [isTablet])

  return (
    <section id='showcase'>
        <div className='media'>
            <video src='/videos/game.mp4' loop muted autoPlay playintime = "true"/>
            <div className='mask'>
                <img src='/mask-logo.svg'/>
            </div>
        </div>

        <div className='content'>
            <div className='wrapper'>
                <div className='lg:max-w-md'>
                    <h2>Rocket Chip</h2>

                    <div className='space-y-5 mt-7 pe-10'>
                        <p>
                            Introducing {" "}
                            <span className='text-white'>
                                M4, the next generation of Apple silicon
                            </span>
                            . M4 powers
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil facilis inventore accusamus, placeat non doloribus, blanditiis repellendus impedit ratione ex magnam minus, perferendis eaque! Incidunt iure doloribus quam dolor excepturi.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero enim, nobis distinctio illum sit, dicta alias fuga optio sed exercitationem a obcaecati at sequi consequatur debitis. Nobis aspernatur soluta perferendis.
                        </p>
                        <p className='text-primary'>
                            Learn more about Apple Intelligence
                        </p>
                    </div>
                </div>
                <div className='max-w-3xs space-y-14'>
                    <div className='space-y-2'>
                    <p>Up to</p>
                    <h3>4x faster</h3>
                    <p>pre rendering performance that M2</p>
                </div>

                <div className='space-y-2'>
                    <p>Up to</p>
                    <h3>1.5x faster</h3>
                    <p>CPU performance than M2</p>
                </div>
            </div>
        </div>
        </div>

    </section>
  )
}

export default Showcase