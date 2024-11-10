import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
         <div className="rounded-b-[3rem] h-[18rem] w-full bg-cyan-300">
          <h1 className="text-white pt-24 text-center font-serif font-bold text-6xl">LOG IN</h1>
    </div>
      <section className=" bg-white pl-20 justify-center flex ">
        <div className="mr-[4rem] mt-[4rem]">
          <form onSubmit={submitHandler} className="container w-[34rem]">
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className=" text-lg px-4 py-3 border-2 border-black rounded-full w-full"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className=" text-lg px-4 py-3 border-2 border-black rounded-full w-full"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="border-4 ml-[11rem] text-xl text-center border-black rounded-full text-black font-semibold px-12 py-3 cursor-pointer my-[1rem] hover:text-white hover:bg-black"
            >
              {isLoading ? "SIGNING IN..." : "SIGN IN"}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className="mt-3 mb-20">
            <p className="text-white">
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className=" my-5 pl-[4.5rem]  text-xl text-center  text-black font-bold  cursor-pointer  hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
