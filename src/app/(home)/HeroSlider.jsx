"use client"
import { Navigation, EffectFade, Autoplay,  } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css/bundle';
import { mainSlider } from '@/data/mainSlider';
import SingleHeroSlider from './SingleHeroSlider';

const HeroSlider = () => {
    return (
        <div>
              <Swiper
              loop navigation effect='fade'
      modules={[Navigation, EffectFade, Autoplay]}  
      slidesPerView={1}
      autoplay
    >
      {
        mainSlider.map((slider)=>(
          <SwiperSlide key={slider.id}>
            <SingleHeroSlider items={slider}/>
          </SwiperSlide>
        ))
      }
    </Swiper>
        </div>
    );
};

export default HeroSlider;