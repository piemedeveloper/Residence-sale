import React, { useEffect, useState } from 'react'
import wave from "../../assets/images/wave.png"
import crypo_news from "../../assets/images/press/Cryptos-Newss.png"
import bezinga from "../../assets/images/press/bezinga.jpg"
import coinmarketcap_logo from "../../assets/images/press/coinmarketcap_logo.png"
import investing from "../../assets/images/press/investing.png"
import thestreet from "../../assets/images/press/thestreet.png"
import udottoday from "../../assets/images/press/udottoday.png"
import hn_logo from "../../assets/images/press/hn-logo.png"
import binance_logo from "../../assets/images/press/Binance_logo.png"
import chainbits from "../../assets/images/press/chainbits.png"


import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";


function Media() {
    const media = [
        { icon: crypo_news, link: "https://cryptosnewss.com/blocksquare-launches-marketplace-pool-for-hotel-investment" },
        { icon: bezinga, link: "https://www.benzinga.com/pressreleases/24/07/39932259/blocksquare-launches-marketplace-pool-for-hotel-investment" },
        { icon: coinmarketcap_logo, link: "https://coinmarketcap.com/community/articles/66a0ff75dba74164e8ec2a64" },
        { icon: investing, link: "https://www.investing.com/news/cryptocurrency-news/blocksquare-launches-marketplace-pool-for-hotel-investment-3533595" },
        { icon: thestreet, link: "https://www.thestreet.com/crypto/newsroom/blocksquare-launches-marketplace-pool-for-hotel-investment" },
        { icon: udottoday, link: "https://u.today/blocksquare-introduces-novel-marketplace-tool-for-investing-in-hotels-1" },
        { icon: hn_logo, link: "https://hackernoon.com/blocksquare-brings-tokenized-hotel-ownership-to-retail-launches-pooling-marketplace" },
        { icon: binance_logo, link: "https://www.binance.com/en/square/post/11497053039513" },
        { icon: chainbits, link: "https://www.chainbits.com/press-releases/blocksquares-hotel-investment-pool-goes-live" },
    ]


    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    });


    return (
        <div >
            <div className='container mx-auto mb-10'>
                {/* <div className='container grid gap-6 mx-auto mb-10 lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-3'> */}
                {/* {media.map((m, i) => <a href={m.link} target='_blank' rel="noreferrer" key={i} className='flex justify-center'>
                    <img src={m.icon} alt="" className='object-contain h-12' />
                </a>)} */}

                <Swiper
                    spaceBetween={30}
                    modules={[Autoplay, Pagination, Navigation, A11y]}
                    loop
                    slidesPerView={
                        windowSize[0] < 1400
                            ? windowSize[0] < 1200
                                ? windowSize[0] < 1000
                                    ? windowSize[0] < 800
                                        ? 3
                                        : 4
                                    : 5
                                : 5
                            : 6
                    }
                    navigation
                    pagination={{ clickable: true, dynamicBullets: true }}
                    autoplay={true}
                >
                    {media.map((m, k) => (
                        <SwiperSlide key={k}>
                            <a href={m.link} target='_blank' rel="noreferrer" className="flex items-center justify-center">
                                <img
                                    src={m.icon}
                                    alt="logos"
                                    className="object-contain h-20"
                                />
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default Media
