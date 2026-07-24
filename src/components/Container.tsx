import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/** Sayfa içeriğini ortalayan ve yatay boşluk veren sarmalayıcı. */
export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
