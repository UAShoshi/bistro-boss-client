import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../component/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa";
import { BsTrash3Fill } from "react-icons/bs";
import Swal from "sweetalert2";


const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  })


  const handleMakeAdmin = user =>{
    axiosSecure.patch(`/users/admin/${user._id}`)
    .then(res =>{
      console.log(res.data)
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }

  const handleDeleteUser = user => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`)
        .then(res => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
          }
        })
      }
    });
  }


  return (
    <div>
      <SectionTitle
        subHeading={'How many?'}
        heading={'MANAGE ALL USERS'}
      ></SectionTitle>
      <div>
        <h1 className="ml-10 text-3xl font-bold mb-8">Total users: {users.length}</h1>
      </div>
      {/*  */}
      <div className="overflow-x-auto ml-10">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="bg-[#D1A054] text-white">
              <th></th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ROLE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, index) =>  <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                { user.role ==='admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className="text-white btn bg-[#D1A054]"><FaUsers></FaUsers></button>}
                </td>
                <td>
                <button
            onClick={() => handleDeleteUser(user)}
             className="btn bg-red-800"><BsTrash3Fill className="text-white"></BsTrash3Fill></button>
                </td>
              </tr>)
            }
           
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;