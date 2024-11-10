import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3 mt-24">
          <div className="h-12 font-serif text-xl font-medium">
            Create Product
          </div>

          {imageUrl && (
            <div className="text-center mb-3">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className=" text-black px-4 block w-full text-center border-2 border-gray-400  rounded-lg cursor-pointer font-bold py-3">
              {image ? image.name : "Upload Image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-black"}
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-wrap">
              <div className=" relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="floating_name"
                    id="floating_name"
                    className="block pt-3 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label
                    for="floating_name"
                    className="peer-focus:font-medium absolute text-xl text-gray-700  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Name
                  </label>
                </div>
              
                <div className=" relative z-0 w-full mb-5 group">
                  <input
                    type="number"
                    name="floating_price"
                    id="floating_price"
                    className="block pt-3 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={price}
                  onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                  <label
                    for="floating_price"
                    className="peer-focus:font-medium absolute text-xl text-gray-700  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Price
                  </label>
                </div>

            </div>


            <div className="flex flex-wrap">
             
             
            <div className=" relative z-0 w-full mb-5 group">
                  <input
                    type="number"
                    name="floating_price"
                    id="floating_price"
                    className="block pt-3 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                  <label
                    for="floating_price"
                    className="peer-focus:font-medium absolute text-xl text-gray-700  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Quantity
                  </label>
                </div>
  
                <div className=" relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="floating_price"
                    id="floating_price"
                    className="block pt-3 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                  />
                  <label
                    for="floating_price"
                    className="peer-focus:font-medium absolute text-xl text-gray-700  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Brand
                  </label>
                </div>
  
            </div>

           

<div className=" relative z-0 w-full mb-5 group">
                  <textarea
                    type="text"
                    name="floating_price"
                    id="floating_price"
                    className="block pt-3 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  <label
                    for="floating_price"
                    className="peer-focus:font-medium absolute text-xl text-gray-700  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Description
                  </label>
                </div>

            <div className="flex justify-between">
              
            <div className=" relative z-0 w-full mb-5 group mr-5 mt-2">
                  <input
                    type="number"
                    name="floating_price"
                    id="floating_price"
                    className="block pt-3 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={stock}
                  onChange={(e) => setStock(e.target.value)}
                    required
                  />
                  <label
                    for="floating_price"
                    className="peer-focus:font-medium absolute text-xl text-gray-700  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                   Count In Stock
                  </label>
                </div>



              <div>
                <label className=" text-blue-500 font-medium ml-2" htmlFor="">Category</label> <br />
                <select
                  placeholder="Choose Category"
                  className="p-2 mb-3 mt-1 w-[28rem] border rounded-lg  text-black"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-lg px-10 py-3 me-2 mb-2 dark:focus:ring-yellow-900"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
