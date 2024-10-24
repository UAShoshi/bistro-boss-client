import SectionTitle from "../../component/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css';
import { BiSolidQuoteLeft } from "react-icons/bi";


const Testimonials = () => {

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/reviews')
      .then(res => res.json())
      .then(data => setReviews(data))
  }, [])



  return (
    <div>
      <section>
        <SectionTitle
          subHeading={'What Our Clients Say'}
          heading={'testimonials'}
        ></SectionTitle>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {
            reviews.map(review => <SwiperSlide
              key={review._id}

            >
              <div className="flex flex-col items-center mx-24 my-16">
              <Rating
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
              />
              <BiSolidQuoteLeft className="mt-5 text-6xl"></BiSolidQuoteLeft>
                <p className="py-8">{review.details}</p>
                <h3 className="text-2xl uppercase text-[#D99904]">{review.name}</h3>
              </div></SwiperSlide>)
          }
        </Swiper>
      </section>
    </div>
  );
};

export default Testimonials;