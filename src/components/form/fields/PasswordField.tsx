import { forwardRef, useState } from "react";
import type { FieldError } from "react-hook-form";
import { BsEye, BsEyeSlash, BsLock } from "react-icons/bs";

interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: FieldError;
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
    ({ placeholder, error, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        return (
            <div className="w-full mb-5 flex flex-col">
                <div className="w-full relative flex items-center">
                    <div className={`absolute left-3 text-xl ${error ? 'text-red-500' : 'text-gray-400'}`}>
                        <BsLock />
                    </div>

                    <input
                        {...props}
                        ref={ref}
                        type={showPassword ? 'text' : 'password'}
                        placeholder={placeholder}
                        className={`w-full pl-10 pr-10 py-2.5 border rounded text-sm outline-none transition-all
            ${error
                                ? 'border-red-500 focus:border-red-600 bg-red-50/10'
                                : 'border-gray-300 focus:border-red-500'
                            }`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-gray-400 hover:text-gray-600 text-lg focus:outline-none z-10"
                    >
                        {showPassword ? <BsEye /> : <BsEyeSlash />}
                    </button>
                </div>
                {error && (
                    <p className="text-[11px] text-red-500 mt-1 pr-l animate-fade-in">
                        {error.message}
                    </p>
                )}
            </div>
        );
    }
);

export default PasswordField