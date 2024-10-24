import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { BiCheese, BiSolidFoodMenu } from "react-icons/bi";
import { HiUserGroup } from "react-icons/hi";
import { CiDeliveryTruck } from "react-icons/ci";


const AdminHome = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  
  const {data: stats} = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () =>{
      const res = await axiosSecure.get('/admin-stats');
      return res.data;
    }
  })

  return (
    <div>
      <h2 className="text-3xl">
      <span>Hi, Welcome Back!</span>
      {
        user?.displayName ? user?.displayName : 'Back!'
      }
      </h2>
      <section className="p-6 my-6 dark:bg-gray-100 dark:text-gray-800">
	<div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
    {/* row1 */}
		<div className="bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] stats shadow flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800">
			<div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
      <BiCheese className="h-9 w-9 text-white"></BiCheese>
			</div>
			<div className="text-white flex flex-col justify-center align-middle">
				<p className="text-3xl font-semibold leading-none">{stats.revenue}</p>
				<p className="capitalize">Revenue</p>
			</div>
		</div>
    {/* row2 */}
		<div className="bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] stats shadow flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800">
			<div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
      <HiUserGroup className="h-9 w-9 text-white"></HiUserGroup>
			</div>
			<div className="text-white flex flex-col justify-center align-middle">
				<p className="text-3xl font-semibold leading-none">{stats.users}</p>
				<p className="capitalize">Customers</p>
			</div>
		</div>
    {/* row3 */}
		<div className="bg-gradient-to-r from-[#FE4880] to-[#FECDE9] stats shadow flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800">
			<div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
      <BiSolidFoodMenu className="h-9 w-9 text-white"></BiSolidFoodMenu>
			</div>
			<div className="text-white flex flex-col justify-center align-middle">
				<p className="text-3xl font-semibold leading-none">{stats.menuItem}</p>
				<p className="capitalize">Products</p>
			</div>
		</div>
    {/* row4 */}
		<div className="bg-gradient-to-r from-[#6AAEFF] to-[#B6F7FF] stats shadow flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800">
			<div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
      <CiDeliveryTruck className="text-white h-9 w-9"></CiDeliveryTruck>
			</div>
			<div className="text-white flex flex-col justify-center align-middle">
				<p className="text-3xl font-semibold leading-none">{stats.orders}</p>
				<p className="capitalize">Orders</p>
			</div>
		</div>
	</div>
</section>
    </div>
  );
};

export default AdminHome;