import { BsCreditCard } from "react-icons/bs"
import TextField from "./fields/TextField";
import { useForm, type UseFormReset, type UseFormWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { topUpchema, type topUpSchemaType } from "./validations/transactionSchema";
import formatCurrency from "../../utils/formaCurrency";
import RedButton from "../RedButton";
import { useEffect } from "react";

type TopUpFormType = {
    onSubmit: (data: topUpSchemaType) => void
    disabled: boolean,
    resetVal: (reset: UseFormReset<topUpSchemaType>) => void
}

const presetNominals = [10000, 20000, 50000, 100000, 250000, 500000];
const TopUpForm = ({ disabled, onSubmit, resetVal }: TopUpFormType) => {
    const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
        resolver: zodResolver(topUpchema)
    })

    useEffect(() => {
        if (resetVal) {
            resetVal(reset);
        }
    }, [resetVal, reset]);

    const topUpAmount = watch("top_up_amount")
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6" onSubmit={handleSubmit(onSubmit)}>
            <form className="md:col-span-7 flex flex-col gap-4 w-full">

                <TextField
                    {...register("top_up_amount", {
                        valueAsNumber: true, onChange: (e) => {
                            e.target.value = e.target.value.replace(/\D/g, "");
                        }
                    })}
                    icon={<BsCreditCard />}
                    placeholder="masukan nominal Top Up"
                    className="mb-0"
                    pattern="[0-9]*"
                    error={errors.top_up_amount}
                    disabled={disabled}
                />

                <RedButton type="submit" disabled={disabled || !topUpAmount}>Top Up</RedButton>
            </form>
            <div className="md:col-span-5 w-full">
                <div className="grid grid-cols-3 gap-3">
                    {presetNominals.map((val) => (
                        <button
                            key={val}
                            type="button"
                            disabled={disabled}
                            onClick={() => setValue("top_up_amount", val)}
                            className={`py-3 px-2 border text-center rounded-md text-xs font-normal transition-all cursor-pointer mb-5 ${String(topUpAmount) === val.toString()
                                ? 'border-[#f02c1c] text-[#f02c1c] bg-red-50/30 font-medium'
                                : 'border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-50/50'
                                }`}
                        >
                            {formatCurrency(val)}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default TopUpForm