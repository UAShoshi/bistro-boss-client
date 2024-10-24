import FoodCard from "../../component/FoodCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


const OrderTab = ({ items }) => {
  return (
    <div>

      <Swiper 
      pagination={true} 
      modules={[Pagination]} 
      className="mySwiper">
        <SwiperSlide>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
          {
            items.map(item => <FoodCard
              key={item._id}
              item={item}
            ></FoodCard>)
          }
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default OrderTab;