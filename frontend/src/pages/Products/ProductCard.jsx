import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";
import { useEffect, useState, useRef } from "react";
import {  FaStar} from "react-icons/fa";
import {
  motion,
  useAnimation,
  useSpring,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";


const ProductCard = ({ p }) => {
  const dispatch = useDispatch();


  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  const firstRef = useRef(null);
  const isInView = useInView(firstRef, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

 
  const colors = [
    "bg-gradient-to-b from-slate-50 to-orange-400",
    "bg-gradient-to-b from-slate-50 to-blue-500",
    "bg-gradient-to-b from-slate-50 to-green-300",
    "bg-gradient-to-b from-slate-50 to-pink-600",
    "bg-gradient-to-b from-slate-50 to-brown-500",
    "bg-gradient-to-b from-slate-50 to-yellow-400",
    "bg-gradient-to-b from-slate-50 to-red-500"
  ];
 
  const [currentColor, setCurrentColor] = useState(colors[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColor((prevColor) => {
        const currentIndex = colors.indexOf(prevColor);
        const nextIndex = (currentIndex + 1) % colors.length;
        return colors[nextIndex];
      });
    }, 2000); 

    return () => clearInterval(interval); 
  }, [colors]);
 


  return (
    <motion.div className={`w-full rounded-[2rem] ${currentColor}  h-[470px] shadow-lg border-2 border-black ml-4`}
    ref={firstRef}
                  animate={mainControls}
                  initial="hidden"
                  variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  transition={{ duration:1, ease: "easeInOut", delay: 0.1}}>
      <motion.div className="relative flex  ">
        <Link to={`/product/${p._id}`}>
         <div className="flex ">
          
          <div className="flex ml-4 mt-7">
          <div className="relative flex">
          {Array.from({ length: 5 }, (v, i) => <FaStar strokeWidth={2} size={20} color="#D1D5DB"/>)}  
          </div>
          <div className="absolute flex">
          {Array.from({ length: p.rating}, (v, i) => <FaStar   size={20} color="#FF719D"/>)}
          </div>
          </div>

          <div className="font-mono mt-7 ml-7 font-semibold italic w-32">
          {p.numReviews == 0 ? "" :<p>{p.numReviews} REVIEWS</p> }
          </div>
  
      
         <p className="mt-6 font-mono font-bold text-xl ml-1">RS.{p.price}</p>
         

         </div>

          <img
            className="cursor-pointer rounded-2xl w-60 mt-5 ml-16 hover:transform hover:-translate-y-3  hover:scale-105 hover:origin-top-right"
            src={p.image}
            alt={p.name}
            style={{ objectFit:"cover"}}
          />
         
          <div className="flex items-center ml-6 mt-4">
            <h5 className="mb-2 text-2xl font-bold text-black w-44">{p?.name?.substring(0, 25)} </h5>
            <button
            className="py-2.5 px-5 ml-2  bg-white rounded-full uppercase font-mono font-bold hover:bg-black hover:text-white border-2 border-black"
            onClick={() => addToCartHandler(p, 1)}
          >
          Add to Cart
          </button>
          </div>
        </Link>
        
        {/* <HeartIcon product={p} /> */}
      </motion.div>

      {/* <div className="p-5">
        <div className="flex justify-between">
          <h5 className="mb-2 text-xl text-whiet dark:text-white">{p?.name}</h5>

          <p className="text-black font-semibold ">
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>

        <p className="mb-3 font-normal text-[#CFCFCF]">
          {p?.description?.substring(0, 60)} ...
        </p>

        <section className="flex justify-between items-center">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
          >
            Read More
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <button
            className="p-2 rounded-full"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={25} />
          </button>
        </section>
      </div> */}
    </motion.div>
  );
};

export default ProductCard;
