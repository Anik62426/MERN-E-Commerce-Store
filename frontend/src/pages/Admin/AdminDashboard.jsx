import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";
import { AiFillBank } from "react-icons/ai";
import { LuUsers } from "react-icons/lu";
import { PiPackage } from "react-icons/pi";
import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();
  const { data: totalOrder } = useGetOrdersQuery();
  
  // console.log(useGetTotalSalesByDateQuery())

  const [state, setState] = useState({
    options: {
      chart: {
        type: "bar",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#0088FE"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      plotOptions: {
        bar: {
          columnWidth: '40%', 
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -6,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  // console.log(totalOrder)

  useEffect(() => {
    if (totalOrder) {
      const formattedSalesDate =  totalOrder.map((item) => ({
        x: item.isPaid ? item.createdAt && item.createdAt.substring(0, 10) :"",
        y: item.isPaid ? item.totalPrice:"",
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) =>  item.x),
          },
        },

        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [totalOrder]);

  return (
    <>
      <AdminMenu />
     
      <section className="xl:ml-[4rem] md:ml-[0rem] mt-20 ">
        <div className="w-[90%] flex justify-center flex-wrap">
          <div className="rounded-lg flex items-center mr-3 justify-center pr-5 py-6 bg-gray-100 border  w-[18rem] mt-10">
        <div className="border rounded-xl p-1 bg-green-500 ">
          <AiFillBank size={35} color="#fff"/>
        </div>
          
           <div className="ml-3">
             <p className="">Total Sales</p>
            <h1 className="text-xl font-bold">
            ₹{isLoading ? <Loader /> : sales.totalSales.toFixed(2)}
            </h1>
           </div>
          </div>
          <div className="rounded-lg flex items-center mr-3 justify-center pr-5 py-6 bg-gray-100 border  w-[20rem] mt-10">
           <div className="border p-1  bg-blue-400 rounded-xl">
             <LuUsers size={34} color="#fff"/>
           </div>
           
           <div className="ml-3">
            <p className="">Customers</p>
            <h1 className="text-xl font-bold text-center">
               {isLoading ? <Loader /> : customers?.length}
            </h1>
           </div>
          </div>
          <div className="rounded-lg flex items-center  justify-center pr-5 py-6 bg-gray-100 border   w-[20rem] mt-10">
           <div className="p-1 border rounded-xl bg-orange-400">
            <PiPackage size={38} color="#fff"/>
            </div> 
           <div className="pl-3">
            <p className="">All Orders</p>
            <h1 className="text-xl font-bold text-center">
               {isLoading ? <Loader /> : orders?.totalOrders}
            </h1>
           </div>
          </div>
        </div>

        <div className="ml-[4rem] mt-[4rem] ">
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="80%"
          />
        </div>

        <div className="mt-[4rem]">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
