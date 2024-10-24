import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { LiaUtensilsSolid } from "react-icons/lia";
import { useLoaderData } from "react-router-dom";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
  const  {name, category, price, recipe, _id} = useLoaderData();

  // console.log(item);
  
  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data);
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
      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem)
      console.log(menuRes.data)
      if (menuRes.data.modifiedCount > 0) {
        // show success popup
        // reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is update to the menu`,
          showConfirmButton: false,
          timer: 1500
        });
      }
      
    }
    console.log("with image uri", res.data);
    
  };
  return (
    <div>
      <section className="text-3xl uppercase py-4 mx-auto text-center md:w-4/12 my-8">UPDATE ITEM</section>

      <div>
        <form className="ml-10" onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full my-6">
            <div className="label">
              <span className="label-text">Recipe name*</span>
            </div>
            <input type="text" defaultValue={name} placeholder="Recipe name"
             {...register("name", {required: true})}
            required className="input input-bordered w-full" />
          </label>

          <div className="flex gap-6">
            {/* Category */}
            <label className="form-control w-full my-6">
              <div className="label">
                <span className="label-text">Category*</span>
              </div>
              <select defaultValue={category} {...register("category", {required: true})}
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
              <input type="text" defaultValue={price} placeholder="Price*" {...register("price", {required: true})} className="input input-bordered w-full" />
            </label>
          </div>
          {/* recipe detail */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details*</span>
            </label>
          <textarea
            placeholder="Recipe Details"
            defaultValue={recipe}
            {...register("recipe", {required: true})}
            className="textarea textarea-bordered textarea-lg w-full"></textarea>
          </div>
          {/* file Choose */}
          <div className="form-control w-full my-6" {...register("image", {required: true})}><input type="file" className="file-input w-full max-w-xs" /></div>

         <div className="flex justify-center"><button className="text-white btn btn-active bg-gradient-to-r from-[#835D23] to-[#B58130] ... text-center md:w-4/12 my-8">Add Item</button></div>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;