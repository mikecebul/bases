import Services from '@/components/services'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore all the recovery services provided at BASES.",
};


export default function Page() {
  return (
    <Services />
  )
}
