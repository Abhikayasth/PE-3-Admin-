"use client"

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  type = "button",
  fullWidth = false,
  icon = null,
}) => {
  const sizeClasses = {
    sm: "py-1 px-3 text-xs",
    md: "py-2 px-4 text-sm",
    lg: "py-2.5 px-5 text-base",
  }

  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outline: "btn-outline",
    ghost: "text-primary hover:bg-primary/10 focus:ring-primary",
    destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  }

  return (
    <button
      type={type}
      className={`
        btn ${variantClasses[variant]} ${sizeClasses[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${icon ? "flex items-center justify-center" : ""}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  )
}

export default Button
