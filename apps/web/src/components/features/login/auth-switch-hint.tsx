'use client'

type AuthSwitchHintProps = {
  message: string
  actionLabel: string
  onAction: () => void
}

const AuthSwitchHint = ({ message, actionLabel, onAction }: AuthSwitchHintProps) => (
  <div className="flex-center flex-row">
    <span className="text-xs text-muted-foreground">
      {message}{' '}
      <button
        type="button"
        onClick={onAction}
        className="text-primary font-medium hover:text-primary/90 cursor-pointer"
      >
        {actionLabel}
      </button>
    </span>
  </div>
)

export default AuthSwitchHint
