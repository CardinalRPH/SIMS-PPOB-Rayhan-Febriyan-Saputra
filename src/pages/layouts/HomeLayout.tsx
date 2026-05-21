import { useState } from 'react';
import { BsList, BsXLg } from 'react-icons/bs';
import { Outlet } from 'react-router-dom';


const navigationLinks = [
    { label: 'Top Up', href: '/top-up' },
    { label: 'Transaction', href: '/transaction' },
    { label: 'Akun', href: '/akun' },
];

export const HomeLayout = () => {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white font-sans antialiased flex flex-col">
            <header className="md:hidden w-full bg-white border-b border-gray-100 sticky top-0 z-40 h-14 px-4 flex items-center gap-3">
                <button
                    onClick={() => setIsMobileSidebarOpen(true)}
                    className="text-gray-700 hover:text-gray-900 text-2xl p-1 focus:outline-none"
                >
                    <BsList />
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#f02c1c] rounded-sm flex items-center justify-center text-white font-bold text-[10px]">🎯</div>
                    <span className="font-bold text-gray-800 tracking-wide text-sm">SIMS PPOB</span>
                </div>
            </header>
            {/* mobile menu */}
            <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${isMobileSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileSidebarOpen(false)} />
                <div className={`absolute top-0 left-0 w-64 h-full bg-white shadow-xl p-5 flex flex-col transform transition-transform duration-300 ease-in-out ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-[#f02c1c] rounded-sm flex items-center justify-center text-white font-bold text-[10px]">🎯</div>
                            <span className="font-bold text-gray-800 text-sm">SIMS PPOB</span>
                        </div>
                        <button onClick={() => setIsMobileSidebarOpen(false)} className="text-gray-500 text-lg p-1">
                            <BsXLg />
                        </button>
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                        {navigationLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-sm font-semibold text-gray-700 hover:text-[#f02c1c] py-2.5 px-3 rounded-lg hover:bg-gray-50 transition-all"
                                onClick={() => setIsMobileSidebarOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* desktop menu */}
            <nav className="hidden md:block w-full bg-white border-b border-gray-100 sticky top-0 z-40">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Logo Desktop */}
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-[#f02c1c] rounded-sm flex items-center justify-center text-white font-bold text-xs">🎯</div>
                        <span className="font-bold text-gray-800 tracking-wide">SIMS PPOB</span>
                    </div>

                    <div className="flex items-center gap-10">
                        {navigationLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-sm font-semibold text-gray-600 hover:text-[#f02c1c] transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>
            <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-10">
                <Outlet />
            </main>

        </div>
    );
};

export default HomeLayout