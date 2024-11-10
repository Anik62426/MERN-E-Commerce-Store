import React, { useState, useEffect } from 'react';
import { LuWaves } from "react-icons/lu";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import Navigation from './Navigation';
import { ImCross } from "react-icons/im";
import { motion } from 'framer-motion';

const NavbarComponent = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY || document.documentElement.scrollTop;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [showSidebar, setShowSidebar] = useState(false);
  

  function onclickHandler(){
    setShowSidebar((prev)=>!prev)
  }
 
   console.log(showSidebar)
  return (
    <div>
      {showSidebar ? <motion.div
      >
        <Navigation/>
        <button onClick={onclickHandler} className='fixed top-7 z-50 left-60 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-xl p-1'>
     <ImCross size={27}/>
    </button>
      </motion.div> :"" }

      <div
        className={`fixed  p-4 transition-all duration-300 bg-white z-30  rounded-full border-2 border-black  left-8
          ${scrollPosition > 50 ? ' h-12 top-5 w-[97%]' : ' h-14 top-8  w-[95%]'}`}
      >
       <div className={`flex items-center relative justify-between  ${scrollPosition > 50 ? ' mt-[-15px] ' : ' mt-[-10px] '}`}>
        <div className="flex items-center">
          
          <button onClick={onclickHandler}   className={`${scrollPosition > 50 ? ' ml-3  ' : ' ml-8 '}`}>
            
            <LuWaves size={` ${scrollPosition >50 ? '30' : '35'}`} />
          </button>

          <Link to="/shop" className="">
            <p className="font-bold ml-5 text-2xl">Shop</p>
          </Link>
        </div>
        <p className="text-2xl font-bold">Reebok</p>
        <div className="flex ">
          <Link to="/login" className="mr-4 mt-0.5">
            <CgProfile size={36} />
          </Link>
          <Link to="cart">
            <button className={` rounded-full  bg-black text-white  text-xl font-bold border-2 border-black ${scrollPosition > 50 ? 'px-5 py-0.5 mt-1 mr-1' : ' px-5 py-1.5 mt-[-2px] mr-4 '}`}>
              Cart
            </button>
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default NavbarComponent;





