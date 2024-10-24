import { Helmet } from "react-helmet-async";
import Bannar from "./Bannar";
import Category from "./Category";
import Featured from "./Featured";
import PopularSection from "./PopularSection";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div>
      
      <Helmet>
        <title>Bistro Boss | Home</title>
      </Helmet>
      <Bannar></Bannar>
      <Category></Category>
      <PopularSection></PopularSection>
      <Featured></Featured>
      <Testimonials></Testimonials>
</div>
  );
};

export default Home;