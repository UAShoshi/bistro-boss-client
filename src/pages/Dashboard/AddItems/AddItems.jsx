import { useForm } from "react-hook-form";
import SectionTitle from "../../../component/SectionTitle";
import { LiaUtensilsSolid } from "react-icons/lia";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    // const formData = new FormData();
    // formData.append("image", data);
    console.log(data)
    // image upload to imgbb and than get an uri
    const imageFile = { image: data.image[0] }
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
    if (res.data.success) {
      // now send the menu item data to the server with the image uri
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.diplay_uri
      }
      // 
      const menuRes = await axiosSecure.post('/menu', menuItem)
      console.log(menuRes.data)
      if (menuRes.data.insertedId) {
        // show success popup
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
      }
      
    }
    console.log("with image uri", res.data);
    
  };


  return (
    <div>
      <SectionTitle heading={'add an item'} subHeading={"What's new?"}></SectionTitle>
      <div>
        <form className="ml-10" onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full my-6">
            <div className="label">
              <span className="label-text">Recipe name*</span>
            </div>
            <input type="text" placeholder="Recipe name" {...register("name", {required: true})}
            required className="input input-bordered w-full" />
          </label>

          <div className="flex gap-6">
            {/* Category */}
            <label className="form-control w-full my-6">
              <div className="label">
                <span className="label-text">Category*</span>
              </div>
              <select defaultValue="dafault" {...register("category", {required: true})}
                className="select select-bordered w-full">
                <option value="default">Category</option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soups">Soups</option>
                <option value="desserts">Desserts</option>
                <option value="drinks">Drinks</option>
              </select>
            </label>

            {/* Price */}
            <label className="form-control w-full my-6">
              <div className="label">
                <span className="label-text">Price*</span>
              </div>
              <input type="text" placeholder="Price*" {...register("price", {required: true})} className="input input-bordered w-full" />
            </label>
          </div>
          {/* recipe detail */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details*</span>
            </label>
          <textarea
            placeholder="Recipe Details"
            {...register("recipe", {required: true})}
            className="textarea textarea-bordered textarea-lg w-full"></textarea>
          </div>
          {/* file Choose */}
          <div className="form-control w-full my-6" {...register("image", {required: true})}><input type="file" className="file-input w-full max-w-xs" /></div>

          <button className="text-white btn btn-active bg-gradient-to-r from-[#835D23] to-[#B58130] ...">Add Item <LiaUtensilsSolid></LiaUtensilsSolid></button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;