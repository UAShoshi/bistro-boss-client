import SectionTitle from "../../component/SectionTitle";
import featuredImg from '../../assets/home/featured.jpg'; 
import '/src/pages/Home/Featured.css'

const Featured = () => {
  return (
    <div className="featured-item bg-fixed text-white pt-8 my-20">
      <SectionTitle
      subHeading={'Check it out'}
      heading={'FROM OUR MENU'}
      ></SectionTitle>
     <div className="md:flex justify-center bg-black bg-opacity-50 items-center pb-20 pt-12 px-36">
     <div>
        <img src={featuredImg} alt="" />
      </div>
      <div className="md:ml-10">
        <h3>June 20, 2024</h3>
        <h2 className="uppercase">WHERE CAN I GET SOME?</h2>
        <p>WHERE CAN I GET SOME?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
        <button className="btn btn-outline border-0 border-b-4 mt-4">Read More</button>
      </div>
     </div>
    </div>
  );
};

export default Featured;