import type { InputFieldProps } from '@/types/props'

const InputField = ({ label, type, placeholder, required }: InputFieldProps) => {
  return (
    <div className="">
      <label htmlFor={label.toLowerCase()} className="font-semibold text-muted-foreground text-sm">
        {label}
        <input
          id={label.toLowerCase()}
          type={type}
          placeholder={placeholder}
          required={required}
          className="input w-full bg-muted rounded-xl p-3 shadow-sm text-xs md:text-sm"
        />
      </label>
    </div>
  )
}

export default InputField
