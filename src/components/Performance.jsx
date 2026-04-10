import React, { useRef } from 'react'
import { performanceImages } from '../constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Performance = () => {
  const sectionRef = useRef(null)
  const paragraphRef = useRef(null)

  useGSAP(() => {
    // Responsive check
    const isDesktop = () => window.innerWidth > 1024

    // Clean up ScrollTriggers on re-runs
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())

    // Animate paragraph fade-in/up
    gsap.fromTo(
      paragraphRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        duration: 0.8,
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          markers: false,
          once: false,
          refreshPriority: 1
        }
      }
    )

    // Animate images on desktop only
    if (isDesktop()) {
      // pin the section & scrub images in at once
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: '+=80%',
          scrub: true,
          markers: false,
          invalidateOnRefresh: true,
          refreshPriority: 1
        }
      })

      performanceImages.forEach(({ id, left, right, bottom, transform }) => {
        if (id === 'p5') return // skip p5 as instructed

        // Initial: hidden and slightly offset (down and faded out)
        const img = sectionRef.current.querySelector(`.${id}`)
        if (img) {
          timeline.fromTo(
            img,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              left: left !== undefined ? left : 'auto',
              right: right !== undefined ? right : 'auto',
              bottom: bottom !== undefined ? bottom : 'auto',
              transform: transform || 'none',
              duration: 1,
              ease: 'power3.out'
            },
            0 // all at the start of the timeline
          )
        }
      })
    }

    // Make sure triggers refresh on resize for responsiveness
    const handleResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
    // eslint-disable-next-line
  }, [])

  return (
    <section id='performance' ref={sectionRef}>
      <h2> Next-level graphics performance. Game on.</h2>

      <div className='wrapper'>
        {performanceImages.map(({ id, src }) =>
          id === 'p5' ? null : (
            <img key={id} src={src} alt={id} className={id} />
          )
        )}
      </div>

      <div className='component'>
        <p ref={paragraphRef}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique fuga enim perspiciatis! Eius a, amet consequuntur ratione dicta et quisquam, maiores illo incidunt repellendus dolores, libero iste odio numquam facere.
          {' '}
          <span className='text-white'>
            gaming feels more immersive and realistic than ever.
          </span>{' '}
        </p>
      </div>
    </section>
  )
}

export default Performance
