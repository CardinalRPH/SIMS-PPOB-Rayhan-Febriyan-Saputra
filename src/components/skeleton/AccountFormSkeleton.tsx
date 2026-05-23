const AccountFormSkeleton = () => {
    return (
        <div className="w-full space-y-6 animate-pulse">
            <div>
                <div className="h-4 bg-gray-200 rounded w-12 mb-2" />
                <div className="w-full h-11.5 bg-gray-100 border border-gray-200 rounded-md" />
            </div>
            <div>
                <div className="h-4 bg-gray-200 rounded w-20 mb-2" />
                <div className="w-full h-11.5 bg-gray-100 border border-gray-200 rounded-md" />
            </div>
            <div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
                <div className="w-full h-11.5 bg-gray-100 border border-gray-200 rounded-md" />
            </div>
            <div className="pt-4 space-y-4">
                <div className="w-full h-11.5 bg-gray-100 border border-gray-200 rounded-md" />
                <div className="w-full h-11.5 bg-gray-200 rounded-md" />
            </div>
        </div>
    );
};

export default AccountFormSkeleton;