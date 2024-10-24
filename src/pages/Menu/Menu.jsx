import { Helmet } from 'react-helmet-async';
import Cover from '../Shared/Cover';
import menuImg from '../../assets/menu/banner3.jpg';
import dessertBg from '../../assets/menu/dessert-bg.jpeg';
import pizzaBg from '../../assets/menu/pizza-bg.jpg';
import saladBg from '../../assets/menu/salad-bg.jpg';
import soupBg from '../../assets/menu/soup-bg.jpg';
import useMenu from '../../hooks/useMenu';
import SectionTitle from '../../component/SectionTitle';
import MenuCategory from './MenuCategory';
const Menu = () => {

  const [menu] = useMenu();
  const dessert = menu.filter(item => item.category === 'dessert');
  const pizza = menu.filter(item => item.category === 'pizza');
  const salad = menu.filter(item => item.category === 'salad');
  const soup = menu.filter(item => item.category === 'soup');
  const offered = menu.filter(item => item.category === 'offered');

  return (
    <div>
       <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>

      {/* main cover */}
      <Cover 
      img={menuImg} 
      title={'our menu'} 
      p={'Would you like to try a dish?'}></Cover>
      <SectionTitle
      subHeading={"don't miss"}
      heading={"today's offer"} 
      ></SectionTitle>

      {/* offered menu items */}
      <MenuCategory 
      items={offered}
      ></MenuCategory>

      {/* dessert menu items */}
      <Cover img={dessertBg} title={'DESSERTS'} p={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}></Cover>
      <MenuCategory
      items={dessert}
      title={'dessert'}
      ></MenuCategory>


      {/* pizza menu items */}      
      <Cover img={pizzaBg} title={'PIZZA'} p={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}></Cover>
      <MenuCategory
      items={pizza}
      title={'pizza'}
      ></MenuCategory>


      {/* salad menu items */}
      <Cover img={saladBg} title={'SALADS'} p={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}></Cover>
      <MenuCategory
      items={salad}
      title={'salad'}
      ></MenuCategory>


      {/* soup menu items */}
      <Cover img={soupBg} title={'SOUPS'} p={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}></Cover>
      <MenuCategory
      items={soup}
      title={'soup'}
      ></MenuCategory>
    </div>
  );
};

export default Menu;