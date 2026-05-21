import BalanceCard from "../components/BalanceCard"


const HomePage = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 flex flex-row md:flex-col items-start text-left space-x-8">
                <div className="w-16 h-16 rounded-full border border-gray-200 overflow-hidden mb-4 bg-gray-50">
                    <img src={"user.avatar"} alt="User Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                    <p className="text-gray-400 text-sm md:text-base font-light">Selamat datang,</p>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mt-1">{"user.naasdasdasdasdme"}</h2>
                </div>
            </div>

            <div className="md:col-span-7 w-full">
                <BalanceCard balance={50000} />
            </div>
        </div>
    )
}

export default HomePage