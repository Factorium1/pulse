'use client'

type AuthSubmitButtonProps = {
  label: string
}

const AuthSubmitButton = ({ label }: AuthSubmitButtonProps) => (
  <button
    type="submit"
    className="flex-1 px-3 py-2 text-sm md:text-sm font-medium rounded-lg cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
  >
    {label}
  </button>
)

export default AuthSubmitButton
