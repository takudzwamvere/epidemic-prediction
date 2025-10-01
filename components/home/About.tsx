import React from 'react'
import { InteractiveHoverButton } from '../ui/interactive-hover-button'
import Image from 'next/image'

const About = () => {
  return (
    <div className='w-full flex flex-col-reverse md:flex-row items-center justify-center gap-3 p-4'>

        <section className='w-full h-full md:w-1/2 flex flex-col items-center justify-center gap-3 p-3'>
            <h1 className='text-3xl font-semibold text-center'>Best viral outbreak prediction platform</h1>
            <p className='text-xl text-center'>You can freely view publicly released data, OR BETTER YET!, sign up so that you can get email and SMS notifications</p>
            <div className='w-full flex flex-col md:flex-row items-center justify-center p-3 gap-3 md:gap-10'>
                <button className='bg-green-500 text-white px-4 py-3'>About EpiMetrics</button>
                <InteractiveHoverButton>Sign Up</InteractiveHoverButton>
            </div>
        </section>

        <section className='w-full h-64 md:h-96 md:w-1/2 relative'>
            <Image src='/dashboard.jpg' alt='notifications' fill={true} priority/>
        </section>
    </div>
  )
}

export default About