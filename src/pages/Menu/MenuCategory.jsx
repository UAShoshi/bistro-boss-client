import { Link } from "react-router-dom";
import MenuItem from "../Home/MenuItem";


const MenuCategory = ({items, title}) => {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-10 my-16">
          {
            items.map(item => <MenuItem 
            key={item._id}
            item={item}
            ></MenuItem>)
          }
        </div>
        <Link to={`/ourShop/${title}`}>
        <div className="flex justify-center">
        <button className="btn btn-outline border-0 border-b-4 mt-4">ORDER YOUR FAVOURITE FOOD</button>
        </div>
        </Link>
    </div>
  );
};

export default MenuCategory;