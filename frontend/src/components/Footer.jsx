import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaInstagram } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { RiTwitterXLine } from "react-icons/ri";


const Footer = () => {
  return (
    <div className='grid grid-cols-5 w-full ml-3  mb-5 border-2 border-black'>
        <div className='col-span-3 bg-gradient-to-r from-cyan-100 to-sky-50 '>
        <NavLink to="/shop" reloadDocument = {true} >
            <div className='relative pl-10 py-2 w-full h-[5rem] border-b-2 border-black text-6xl tracking-tighter  font-bold text-black  uppercase outline-0 overflow-hidden bg-transparent z-10 cursor-pointer transition ease-in duration-[500ms] fill group'>SHOP
            <span className="absolute inset-0 bg-gradient-to-r from-purple-300 to-pink-100 right-full transition-top duration-[800ms] ease-in z-[-1] group-hover:right-0"></span>
            </div>
          </NavLink>
          <NavLink to="/shop" reloadDocument = {true} >
            <div className='relative pl-10 py-2 w-full h-[5rem] border-b-2 border-black text-6xl tracking-tighter  font-bold text-black  uppercase outline-0 overflow-hidden bg-transparent z-10 cursor-pointer transition ease-in duration-[500ms] fill group'>ABOUT US
            <span className="absolute inset-0 bg-gradient-to-r from-purple-300 to-pink-100 right-full transition-top duration-[800ms] ease-in z-[-1] group-hover:right-0"></span>
            </div>
          </NavLink>
          <NavLink to="/shop" reloadDocument = {true} >
            <div className='relative pl-10 py-2 w-full h-[5rem] border-b-2 border-black text-6xl tracking-tighter  font-bold text-black  uppercase outline-0 overflow-hidden bg-transparent z-10 cursor-pointer transition ease-in duration-[500ms] fill group'>FAQ
            <span className="absolute inset-0 bg-gradient-to-r from-purple-300 to-pink-100 right-full transition-top duration-[800ms] ease-in z-[-1] group-hover:right-0"></span>
            </div>
          </NavLink>
          <NavLink to="/shop" reloadDocument = {true} >
            <div className='relative pl-10 py-2 w-full h-[5rem] border-b-2 border-black text-6xl tracking-tighter  font-bold text-black  uppercase outline-0 overflow-hidden bg-transparent z-10 cursor-pointer transition ease-in duration-[500ms] fill group'>Contact US
            <span className="absolute inset-0 bg-gradient-to-r from-purple-300 to-pink-100 right-full transition-top duration-[800ms] ease-in z-[-1] group-hover:right-0"></span>
            </div>
          </NavLink>
          <NavLink to="/profile" reloadDocument = {true} >
            <div className='relative pl-10 py-2 w-full h-[5rem] text-6xl tracking-tighter  font-bold text-black  uppercase outline-0 overflow-hidden bg-transparent z-10 cursor-pointer transition ease-in duration-[500ms] fill group'>ACCOUNT
            <span className="absolute inset-0 bg-gradient-to-r from-purple-300 to-pink-100 right-full transition-top duration-[800ms] ease-in z-[-1] group-hover:right-0"></span>
            </div>
          </NavLink>
        </div>
        <div className='col-span-2 bg-gradient-to-r from-violet-200 to-sky-100 border-l-2 border-black  '>
           
       <h1 className='uppercase text-5xl font-bold tracking-tighter text-center mt-10'>want updates on new products</h1>
       <p className='ml-10 font-serif mt-4 text-lg'>Be the first to know about new products, brand updates, <br />exclusive events, and more!</p>
      <div className='flex ml-9 mt-3'>
       <input type="text" placeholder=' Enter your email'  className='pl-4 rounded-3xl text-xl py-2 mt-5'/>
       <button className=' px-7 text-sm h-12 rounded-full mt-5 ml-3 bg-white uppercase font-serif font-medium'>submit</button>
      </div>
   
      <div className='flex mt-10 ml-8 justify-around w-[50%]'>

       <FaInstagram size={50} color='#FD03BA'/>
       <FaSquareFacebook size={50} color='#156EFF'/>
       <RiTwitterXLine size={50} />
      </div>

     
        </div>
    </div>
  )
}

export default Footer