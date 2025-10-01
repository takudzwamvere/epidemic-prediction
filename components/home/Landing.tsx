import React from 'react'
import Image from 'next/image'
import { EB_Garamond } from 'next/font/google';

const ebGaramond = EB_Garamond({
  weight: '400',
  subsets: ["latin"],
});

const Landing = () => {
  return (
    <main className="w-full h-[88vh] flex flex-col-reverse pt-5 py-14 items-center justify-center">
      <section className="w-full flex flex-col items-center justify-between gap-6">
        <h1 className="px-15 text-2xl md:text-4xl md:leading-12 text-center">Welcome to <span className={`${ebGaramond.className} text-green-500 font-bold text-3xl md:text-5xl`}>EpiMetrics</span>, epidemic prediction made easier with the power of Machine Learning!</h1>
        <Image src='/move-down.svg' alt='move_down' height={30} width={30} className="animate-bounce"/>
      </section>
      <section className="h-56 w-56 md:w-[350px] md:h-[350px] relative overflow-hidden">
        <Image src='/doctor.svg' alt='landing' fill={true} priority className="animate-collapsible-up"/>
      </section>
    </main>
  )
}

export default Landing