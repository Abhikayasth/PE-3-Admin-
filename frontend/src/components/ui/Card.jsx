"use client";

const Card = ({ children, className = "", onClick, hover = false }) => {
  return (
    <div
      className={`card bg-white ${
        hover ? "hover:shadow-card-hover transform hover:scale-[1.01] transition-all duration-300" : ""
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
