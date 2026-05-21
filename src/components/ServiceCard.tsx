import type { ServiceResponseType } from "../dto/information.dto";

export const ServiceMenu = ({ services }: { services: ServiceResponseType[] }) => {
    return (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-y-6 gap-x-4 justify-items-center my-10 w-full">
            {services?.map((service) => (
                <button
                    key={service.service_code}
                    className="flex flex-col items-center gap-2 group outline-none max-w-18.75 w-full"
                    onClick={() => console.log(`Membeli layanan: ${service.service_name}`)}
                >
                    <div className="w-12 h-12 flex items-center justify-center transition-transform group-hover:scale-110">
                        <img
                            src={service.service_icon}
                            alt={service.service_name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/initials/svg?seed=PPOB';
                            }}
                        />
                    </div>

                    <span className="text-[10px] md:text-xs text-gray-600 text-center leading-tight font-medium wrap-break-word w-full">
                        {service.service_name}
                    </span>
                </button>
            ))}
        </div>
    );
};