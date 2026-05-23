const CarouselCardSkeleton = () => {
    const dummyBanners = Array.from({ length: 4 });

    return (
        <div className="w-full mt-8 animate-pulse">
            <div className="h-5 bg-gray-200 rounded w-48 mb-4" />
            <div className="flex gap-6 overflow-x-hidden pb-2">
                {dummyBanners.map((_, index) => (
                    <div
                        key={`banner-skeleton-${index}`}
                        className="shrink-0 w-67.5 sm:w-72.5 h-30 bg-gray-200 rounded-xl"
                    />
                ))}
            </div>
        </div>
    );
};

export default CarouselCardSkeleton;