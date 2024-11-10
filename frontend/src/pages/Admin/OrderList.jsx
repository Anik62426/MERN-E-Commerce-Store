import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <table className="container ml-5 mb-10 mt-28">
          <AdminMenu />

          <thead className="w-full border  ">
            <tr className="mb-[5rem] ">
              <th className="text-left  p-2">ITEMS</th>
              <th className="text-left pl-20">OrderID</th>
              <th className="text-left pl-1">Name</th>
              <th className="text-left pl-5">Date</th>
              <th className="text-left pl-1">TOTAL</th>
              <th className="text-left pl-6">PAID</th>
              <th className="text-left pl-3">DELIVERED</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr className="border-b-2" key={order._id}>
                <td >
                  <img
                    src={order.orderItems[0].image}
                    alt={order._id}
                    className="w-[3rem] pt-4 pb-2"
                  />
                </td>
                <td>{order._id}</td>

                <td>{order.user ? order.user.username : "N/A"}</td>

                <td>
                  {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                </td>

                <td>₹ {order.totalPrice}</td>

                <td className="py-2">
                  {order.isPaid ? (
                    <span className="inline-flex items-center bg-green-100 text-green-700 text-sm font-medium px-3 py-2 rounded-full  ">
                    <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                    Completed
                </span>
                  ) : (
                    <span className="inline-flex items-center bg-red-100 text-red-800 text-sm font-medium px-5 py-2 rounded-full ">
                    <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                    Pending
                </span>
                  )}
                </td>

                <td className="px-2 py-2">
                  {order.isDelivered ? (
                    <span className="inline-flex items-center bg-green-100 text-green-700 text-sm font-medium px-3 py-2 rounded-full  ">
                    <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                    Completed
                </span>
                  ) : (
                    <span className="inline-flex items-center bg-red-100 text-red-800 text-sm font-medium px-5 py-2 rounded-full ">
                    <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                    Pending
                </span>
                  )}
                </td>

                <td>
                  <Link to={`/order/${order._id}`}>
                    <button><span class="inline-flex items-center bg-yellow-100 text-yellow-700 text-sm font-medium px-5 py-2 rounded-md  ">
                    <span class="w-2 h-2 me-1 bg-yellow-400 rounded-full"></span>
                    More
                </span></button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default OrderList;
