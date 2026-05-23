const ServiceCardSkeleton = () => {
    const dummySkeletons = Array.from({ length: 12 });

    return (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-y-6 gap-x-4 justify-items-center my-10 w-full animate-pulse">
            {dummySkeletons.map((_, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center gap-3 max-w-18.75 w-full"
                >
                    <div className="w-12 h-12 bg-gray-200 rounded-lg shrink-0" />
                    <div className="w-full flex flex-col items-center gap-1">
                        <div className="h-2.5 bg-gray-200 rounded w-10/12" />
                        <div className="h-2.5 bg-gray-200 rounded w-7/12 md:hidden" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ServiceCardSkeleton;