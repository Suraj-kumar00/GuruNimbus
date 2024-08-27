
import React from 'react'
import { HeroSection } from '@/components/HeroSection';
import { Navbar } from '@/components/Navbar';
import FAQ from './faqAndtestimonials';
import { Footer } from '@/components/Footer';


type Props = {}

export default function Landing({}: Props) {
  return (

    <>
 
      <Navbar />
      
      <HeroSection />
     
      <FAQ />

      <Footer />
     

    </>

  )
}

