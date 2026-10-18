import React from "react";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "narrow" | "default" | "wide" | "full";
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size = "default",
  className = "",
  ...props
}) => {
  const sizeClasses = {
    narrow: "max-w-3xl",
    default: "max-w-7xl",
    wide: "max-w-screen-2xl",
    full: "max-w-full",
  };

  return (
    <div
      className={`mx-auto w-full px-5 md:px-6 lg:px-8 ${sizeClasses[size]} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
};
