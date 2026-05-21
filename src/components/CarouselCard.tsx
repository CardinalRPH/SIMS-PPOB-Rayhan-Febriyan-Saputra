import type { BannerResponseType } from "../dto/information.dto";

const CarouselCard = ({ banners }: { banners: BannerResponseType[] }) => {
    return (
        <div className="w-full mt-8">
            <h4 className="text-sm md:text-base font-bold text-gray-800 mb-4">Temukan promo menarik</h4>

            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
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

export default CarouselCard