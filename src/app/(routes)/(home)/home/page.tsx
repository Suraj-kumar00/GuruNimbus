import React from 'react'
import { Navbar } from '@/components/Navbar'
import { Chat } from './chat'
import { Footer } from '@/components/Footer'

type Props = {}

export default function Home({ }: Props) {
  return (
    <><> <Navbar /></>
      <Chat />
      <Footer /></>


  )
}