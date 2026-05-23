const MiniProfileSkeleton = () => {
    return (
        <div className="md:col-span-5 col-span-12 flex flex-row md:flex-col items-center md:items-start text-left space-x-4 md:space-x-0 animate-pulse">
            <div className="w-16 h-16 rounded-full bg-gray-200 mb-0 md:mb-4 shrink-0" />

            <div className="space-y-2 w-full max-w-50">
                <div className="h-4 bg-gray-200 rounded w-24" />
                <div className="h-6 bg-gray-200 rounded w-44" />
            </div>
        </div>
    )
}
export default MiniProfileSkeleton