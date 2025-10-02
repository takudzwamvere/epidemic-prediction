'use client';
import { EB_Garamond } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
<<<<<<< HEAD
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
=======
import { InteractiveHoverButton } from '../ui/interactive-hover-button'
>>>>>>> parent of 2ba7d3a (deployment)

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
          <Link href='/about' className=''>About</Link>
          <Link href='/contact' className=''>Contact</Link>
          <Link href='/contribute' className=''>Contribute</Link>
        </section>

<<<<<<< HEAD
        <section className='hidden md:flex items-center gap-3'>
          <SignedOut>
            <SignInButton mode="modal">
              <button className='text-green-500 hover:text-green-600 font-medium px-4 py-3 transition-colors'>
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className='bg-green-500 text-white px-4 py-3 hover:bg-green-600 transition-colors'>
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
=======
        <section className='hidden md:flex'>
            <Link href='/signIn'><InteractiveHoverButton>Sign In</InteractiveHoverButton></Link>
>>>>>>> parent of 2ba7d3a (deployment)
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

      <section className={`${isOpen ? 'flex' : 'hidden'} relative w-full flex-col h-[89vh] px-1 py-5 gap-7 items-center justify-center text-xl z-10 text-black bg-slate-50`}>
        <Link href='/' onClick={() => {setIsOpen(false)}}>Home</Link>
        <Link href='/about' onClick={() => {setIsOpen(false)}}>About</Link>
        <Link href='/contact' onClick={() => {setIsOpen(false)}}>Contact</Link>
        <Link href='/contribute' onClick={() => {setIsOpen(false)}}>Contribute</Link>
        
        <div className='flex flex-col items-center gap-4 mt-4'>
          <SignedOut>
            <SignInButton mode="modal">
              <button 
                className='text-green-500 hover:text-green-600 font-medium px-4 py-3 transition-colors'
                onClick={() => {setIsOpen(false)}}
              >
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button 
                className='bg-green-500 text-white px-4 py-3 hover:bg-green-600 transition-colors'
                onClick={() => {setIsOpen(false)}}
              >
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <div onClick={() => {setIsOpen(false)}}>
<<<<<<< HEAD
              <UserButton afterSignOutUrl="/" />
=======
                <Link href='/signIn'><InteractiveHoverButton>Sign In</InteractiveHoverButton></Link>
>>>>>>> parent of 2ba7d3a (deployment)
            </div>
          </SignedIn>
        </div>
      </section>
    </nav>
  )
}

export default Header