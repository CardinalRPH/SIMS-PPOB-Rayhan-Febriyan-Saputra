import { forwardRef } from "react";
import type { FieldError } from "react-hook-form";
import { BsAt } from "react-icons/bs";



interface EmailFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: FieldError;
}

const EmailField = forwardRef<HTMLInputElement, EmailFieldProps>(
    ({ placeholder = 'masukan email anda', error, ...props }, ref) => {
        return (
            <div className="w-full mb-5 flex flex-col">
                <div className="w-full mb-5 relative flex items-center">
                    <div className={`absolute left-3 text-xl ${error ? 'text-red-500' : 'text-gray-400'}`}>
                        <BsAt />
                    </div>

                    <input
                        {...props}
                        ref={ref}
                        type="email"
                        placeholder={placeholder}
                        className={`w-full pl-10 pr-4 py-2.5 border rounded text-sm outline-none transition-all
            ${error
                                ? 'border-red-500 focus:border-red-600 bg-red-50/10'
                                : 'border-gray-300 focus:border-red-500'
                            }`}
                    />
                </div>
                {error && (
                    <p className="text-[11px] text-red-500 mt-1 pl-1 animate-fade-in">
                        {error.message}
                    </p>
                )}
            </div>
        );
    }
);

export default EmailField