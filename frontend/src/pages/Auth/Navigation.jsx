import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineShoppingBag } from "react-icons/md";
import { CiShoppingCart } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { TbUserBolt } from "react-icons/tb";
import { TbArrowLeft } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";
import NavbarComponent from "./Navbar";
import { motion } from "framer-motion";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };





  return (
    
     
    <motion.div
    initial={{ opacity: 0, x: -50 }}
     animate={{ opacity: 1, x: 2 }}
     transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{ zIndex:50 }}
      className={`
      flex flex-col w-[300px] justify-between pt-4 pl-7 text-black bg-white shadow-2xl   h-[100vh] fixed `}
    >
    
  {/* <NavbarComponent/>       */}
      <div className="flex flex-col justify-center space-y-4">
         
        {/* <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2 mt-[3rem]" size={26} strokeWidth={1} />
          <span className="font-semibold mt-[3rem]">HOME</span>{" "}
        </Link> */}

        <Link
          to="/shop"
          className="flex items-center mt-[3rem] hover:bg-gray-100 py-3"
        >
          <MdOutlineShoppingBag className="mr-2" size={32} />
          <span className="font-semibold text-2xl capitalize transition-transform transform hover:translate-x-3">Shop</span>{" "}
        </Link>

        <Link to="/favorite" className="flex relative pl-1 py-3 hover:bg-gray-100">
          <div className="flex justify-center items-center ">
            <FaRegHeart size={26} strokeWidth={2} />
            <span className=" pl-3 font-semibold text-2xl transition-transform transform hover:translate-x-3">Favorites</span>
            <FavoritesCount />
          </div>
        </Link>

        <Link to="/cart" className="flex relative py-3 hover:bg-gray-100">
          <div className="flex items-center capitalize ">
            <CiShoppingCart strokeWidth={1} className=" mr-2" size={34} />
            <span className=" font-semibold text-2xl transition-transform transform hover:translate-x-3">Cart</span>{" "}
          </div>

          <div className="absolute top-[-2px] left-5">
            {cartItems.length > 0 && (
              <span>
                <span className="px-1.5  text-sm text-white bg-pink-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              </span>
            )}
          </div>
        </Link>

        {userInfo && (
          <Link to="/profile" className="capitalize flex text-2xl py-3 hover:bg-gray-100 font-semibold ">
            <TbUserBolt size={32} className="mr-2.5"/>
            <span className="transition-transform transform hover:translate-x-3"> Profile</span> 
          </Link>
        )}

        {userInfo && (
          <button className="flex text-2xl capitalize font-semibold py-3 hover:bg-gray-100 " onClick={logoutHandler}>
            <TbArrowLeft size={33}  className="mt-0.5 mr-2"/>
            <span className="transition-transform transform hover:translate-x-3">Logout </span> 
          </button>
        )}
      </div>

      <div className="relative pt-4 hover:bg-gray-100">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-800 focus:outline-none "
        >
          {userInfo ? (
            <div className="flex items-center mb-5 ">
             
              <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full ">
                <span className="font-semibold text-2xl capitalize text-gray-600 ">
                {userInfo.username[0]}
                </span>
              </div>
              <span className="text-black capitalize font-semibold text-xl pl-2">{userInfo.username}</span>
              
            </div>
          ) : (
            <></>
          )}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {dropdownOpen && userInfo && (
          <ul
            className={`absolute right-0 mt-2 mr-14 space-y-2 bg-gray-100 rounded-xl text-black ${
              !userInfo.isAdmin ? "top-[-50px] " : "top-[-50px] right-16"
            } `}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                          target="_blank"
                    className="block px-4 py-2 hover:bg-gray-200 rounded-2xl text-lg font-semibold"
                  >
                    Dashboard
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Products
                  </Link>
                </li> */}
                {/* <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Category
                  </Link>
                </li> */}
                {/* <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                </li> */}
                {/* <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Users
                  </Link>
                </li> */}
              </>
            )}

            {/* <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Logout
              </button>
            </li> */}
          </ul>
        )}
        {!userInfo && (
          <ul className="mb-5 ml-1">
            <li>
              <Link
                to="/login"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <FaArrowRightLong className="mr-2 mt-[4px]" size={29} />
                <span className="font-semibold text-xl">LOGIN</span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineUserAdd size={29} strokeWidth={1} />
                <span className="font-semibold text-xl">REGISTER</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export default Navigation;
