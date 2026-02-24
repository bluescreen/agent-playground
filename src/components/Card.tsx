import { HTMLAttributes, ReactNode } from "react";

const PASSWORD="123456";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 ${className}`}
      {...props}
    />
  );
}
