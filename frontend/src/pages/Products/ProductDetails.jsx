import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

    

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const averageRating =
    product?.reviews?.length > 0
      ? product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length
      : 0;

 

  return (
    <>
      <div>
        <Link
          to="/"
          className="text-white font-semibold hover:underline ml-[10rem]"
        >
          Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="flex flex-wrap relative">
           <div className="grid grid-cols-2 " >
             <div className="bg-pink-100 w-[500px] ml-14  rounded-2xl flex justify-center mt-20">
              <img
                src={product.image}
                alt={product.name}
                className="w-[20rem] mt-5 rounded-lg object-cover"
              />
          
              <HeartIcon product={product} />
            </div>

            <div className=" ml-10 mt-20">
           
           <div className="flex">

            <div className="flex ml-4 mt-7">
          <div className="relative flex">
          {Array.from({ length: 5 }, (v, i) => <FaStar strokeWidth={2} size={20} color="#D1D5DB"/>)}  
          </div>
          <div className="absolute flex">
         
          {Array.from({ length: Math.round(averageRating)}, (v, i) => <FaStar   size={20} color="#FF719D"/>)}
          </div>
          </div>

          <div className="font-mono mt-7 ml-5 font-semibold italic w-32">
          {product.numReviews == 0 ? "" :<p>{product.numReviews} REVIEWS</p> }
          </div>
          </div>
              <h2 className="text-5xl font-bold pl-4 pt-2 uppercase">{product.name}</h2>
              <p className="my-4  pl-5 font-bold">
                {product.description}
              </p>
         
         
              

              <div className="flex items-center justify-between w-[20rem]">
                <div>
                  <h1 className="flex items-center font-bold w-28 rounded-xl text-lg ml-5 py-1 border-2 border-black mb-6">
                    <FaStore size={21} className="mr-2 ml-4" />
                    {product.brand}
                  </h1>
                  {/* <h1 className="flex items-center mb-6 w-[20rem]">
                    <FaClock className="mr-2 text-white" /> Added:{" "}
                    {moment(product.createAt).fromNow()}
                  </h1> */}
                  {/* <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-white" /> Reviews:{" "}
                    {product.numReviews}
                  </h1> */}
                </div>

                <div className="two">
                  {/* <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-white" /> Ratings: {Math.round(averageRating)}
                  </h1> */}
                  {/* <h1 className="flex items-center mb-6">
                    <FaShoppingCart className="mr-2 text-white" /> Quantity:{" "}
                    {product.quantity}
                  </h1> */}
                  {/* <h1 className="flex items-center mb-6 w-[10rem]">
                    <FaBox className="mr-2 text-white" /> In Stock:{" "}
                    {product.countInStock}
                  </h1> */}
                </div>
              </div>

              <p className="text-4xl pl-5 mt-1 mb-5 font-extrabold">₹{product.price}</p>

              <div className="flex flex-col pt-2 pl-5 ml-28  border-2 rounded-3xl pb-8 w-[25rem]">
                
                {product.countInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 w-[6rem] rounded-lg text-black"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="bg-black text-white py-4 hover:bg-white hover:text-black text-2xl w-[20rem] px-4 border-2 border-black rounded-full mt-10 ml-5 uppercase font-bold font-mono  "
                >
                  Add To Cart
                </button>
              </div>
            </div>
           </div>
           
          
          
            <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
