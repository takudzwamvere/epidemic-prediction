'use client';
import { EB_Garamond } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const ebGaramond = EB_Garamond({
  weight: '400',
  subsets: ["latin"],
});

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className='sticky w-full flex flex-col'>
    <div className='w-full h-[11vh] flex items-center justify-between p-5 shadow-sm shadow-green-200'>
        <section>
            <Link href='/'><h1 className={`${ebGaramond.className} text-3xl text-green-500 font-bold italic`}>EpiMetrics</h1></Link>
        </section>

        <section className='hidden md:flex items-center justify-center gap-5'>
            <Link href='/' className=''>Home</Link>
            <Link href='/' className=''>About</Link>
            <Link href='/' className=''>Contact</Link>
            <Link href='/' className=''>Contribute</Link>
        </section>

        <section className='hidden md:flex'>
            <Link href='/signIn'><button className='bg-green-500 text-white px-4 py-3'>Sign Up</button></Link>
        </section>

        <section className='md:hidden z-10'>
            <button onClick={() => {setIsOpen(!isOpen)}}>
                <span className={`${isOpen? 'hidden' : 'flex'}`}>
                    <Image src='/menu.svg' alt='hamburger' width={30} height={30}/>
                </span>
                <span className={`${isOpen? 'flex' : 'hidden'}`}>
                    <Image src='/x.svg' alt='hamburger' width={30} height={30}/>
                </span>
            </button>
        </section>

    </div>

    <section className={`${isOpen ? 'flex' : 'hidden'} relative w-full flex-col h-[87vh] px-1 py-5 gap-7 items-center justify-center text-xl z-10 text-black bg-slate-50`}>
            <Link href='/' onClick={() => {setIsOpen(false)}}>Home</Link>
            <Link href='/' onClick={() => {setIsOpen(false)}}>About</Link>
            <Link href='/' onClick={() => {setIsOpen(false)}}>Contact</Link>
            <Link href='/' onClick={() => {setIsOpen(false)}}>Contribute</Link>
            <div onClick={() => {setIsOpen(false)}}>
                <Link href='/signIn'><button className='bg-green-500 text-white px-4 py-3'>Sign Up</button></Link>
            </div>
        </section>
    </nav>
  )
}

export default Header