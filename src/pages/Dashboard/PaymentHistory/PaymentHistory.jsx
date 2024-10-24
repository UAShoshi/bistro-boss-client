import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../component/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const PaymentHistory = () => {

  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ['payments', user.email],
    queryFn: async () =>{
      const res = await axiosSecure.get(`/payments/${user.email}`)
      return res.data;
    }
  })
  return (
    <div>
      <SectionTitle
      subHeading={'At a Glance!'}
      heading={'PAYMENT HISTORY'}
      ></SectionTitle>
       <div className="flex justify-start ml-10">
      <h2 className="text-3xl font-bold mb-8">Total Payments: {payments.length}</h2>
      </div>
    {/* table */}
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr className="bg-[#D1A054] text-white">
        <th>EMAIL</th>
        <th>CATEGORY</th>
        <th>TOTAL PRICE</th>
        <th>PAYENT DATE</th>
      </tr>
    </thead>
    <tbody>
      {payments.map((payment) =><tr key={payment._id}>
      <td>{payment.email}</td>
      <td>{payment.transactionId}</td>
      <td>${payment.price}</td>
      <td>{payment.date}</td>
    </tr>)}
      
    </tbody>
    
  </table>
</div>
    </div>
  );
};

export default PaymentHistory;