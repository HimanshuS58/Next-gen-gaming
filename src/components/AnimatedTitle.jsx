import clsx from 'clsx'
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react'
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



const AnimatedTitle = ({ title, containerClass }) => {

    const containerRef = useRef(null);

    useEffect(() => {

        const ctx = gsap.context(() => {   // It scopes all selectors to a specific element. In our case the GSAP only looks inside: <div ref={containerRef}>
            //  Also in this component you don't need to use this context().
            const titleAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "100 bottom",  // Animation starts 100px from the top of the trigger touches, the bottom of the viewport
                    end: 'center bottom', // Animation ends when the center of the trigger touches the bottom of the viewport
                    toggleActions: 'play none none reverse'  // "Trigger enters viewport   Trigger leaves viewport   Trigger re-enters viewport(scrolling upward)   Trigger exits viewport from top(scrolling upward)"
                    // Note: Above toggleActions is important because if you don't use it then the animation will work only one time. 
                }
            });

            titleAnimation.to('.animated-word', {
                opacity: 1, // Animate the opacity of each word to 1 (fully visible)
                transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)", // Animate the transform property of each word to its final state (no translation or rotation)
                ease: "power2.inOut", // Use the "power2.inOut" easing function for a smooth animation
                stagger: '0.02' // Animate each word with a stagger of 0.02 seconds, so they appear one after the other
            })

        }, containerRef)

        return () => ctx.revert(); // clean up on unmount

    }, [])


    return (
        <div
            ref={containerRef}
            className={clsx('animated-title', containerClass)}
        >
            {
                title.split('<br />').map((line, index) => (
                    <div
                        key={index}
                        className='flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3'
                    >
                        {
                            line.split(" ").map((word, index) => (
                                <span
                                    key={index}
                                    className='animated-word'
                                    dangerouslySetInnerHTML={{ __html: word }}
                                />
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default AnimatedTitle