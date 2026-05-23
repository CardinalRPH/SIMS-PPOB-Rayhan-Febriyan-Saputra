import { useEffect, useRef } from "react";
import type { BannerResponseType } from "../dto/information.dto";

const CarouselCard = ({ banners }: { banners: BannerResponseType[] }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container || !banners || banners.length === 0) return;

        const intervalId = setInterval(() => {
            const cardWidth = container.firstElementChild?.getBoundingClientRect().width || 0;

            const gap = 24;
            const totalStep = cardWidth + gap;

            const isEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;

            if (isEnd) {
                container.scrollTo({
                    left: 0,
                    behavior: "smooth"
                });
            } else {
                container.scrollBy({
                    left: totalStep,
                    behavior: "smooth"
                });
            }
        }, 3000);

        return () => clearInterval(intervalId);
    }, [banners]);

    return (
        <div className="w-full mt-8">
            <h4 className="text-sm md:text-base font-bold text-gray-800 mb-4">
                Temukan promo menarik
            </h4>

            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory no-scrollbar scroll-smooth"
            >
                {banners.map((banner, index) => (
                    <div
                        key={`banner-${index}`}
                        className="shrink-0 w-67.5 sm:w-72.5 h-30 rounded-xl overflow-hidden snap-start hover:shadow-md transition-shadow cursor-pointer"
                    >
                        <img
                            src={banner.banner_image}
                            alt={banner.banner_name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarouselCard;