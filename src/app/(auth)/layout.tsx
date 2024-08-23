import React from 'react'


export default function Authlayout({children}: {
    children: React.ReactNode
}) {
   
  return (
    <div className='flex flex-col justify-center items-center bg-black h-screen'>
       
        {children}
    </div>
  )
}