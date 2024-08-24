import React from 'react'
import { Chat } from './chat'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'

type Props = {}

export default function Home({}: Props) {
  return (
    <><><Chat />
      <Footer /></>
      <Navbar /></>
  )
}