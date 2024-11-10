import React from 'react'
import { motion } from 'framer-motion'

const ShopTitle = () => {
  return (
    <motion.div
    className='h-[80vh] text-center flex items-center justify-center flex-col'>
    <motion.div
     initial={{ opacity: 0, y: 100 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 }} className='mt-20 italic text-5xl font-bold uppercase text-pink-600 tracking-tighter font-serif'>Style <br /> yourself</motion.div>
    <motion.div
     initial={{ opacity: 0, y: 100 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.5, ease: "easeInOut", delay: 0.6 }} className='text-7xl font-bold tracking-tighter uppercase '>Get new Looks</motion.div>
    </motion.div>
  )
}

export default ShopTitle