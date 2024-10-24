// import { useEffect, useState } from "react";
import SectionTitle from "../../component/SectionTitle";
import MenuItem from "./MenuItem";
import useMenu from "../../hooks/useMenu";


const PopularSection = () => {
  const [menu] = useMenu();
  const popular = menu.filter(item => item.category === 'popular');

  return (
    <div>
      <section className="mb-12">
        <SectionTitle
        subHeading={'Check it out'}
        heading={'from our menu'}
        ></SectionTitle>
        <div className="grid md:grid-cols-2 gap-10">
          {
            popular.map(item => <MenuItem
            key={item._id}
            item={item}
            ></MenuItem>)
          }
        </div>
     <div className="justify-center flex items-center">
     <button className="btn btn-outline border-0 border-b-4 mt-4">Read More</button>
     </div>
      </section>
    </div>
  );
};

export default PopularSection;