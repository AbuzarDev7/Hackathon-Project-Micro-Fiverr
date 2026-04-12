import React, { useState, useEffect, useRef } from "react"
import { cn } from "../../utils/cn"

export const DropdownMenu = ({ children, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Pass isOpen and toggle/close methods to children
          return React.cloneElement(child, { isOpen, toggle, close });
        }
        return child;
      })}
    </div>
  );
};

export const DropdownMenuTrigger = ({ children, asChild, toggle }) => {
  return (
    <div onClick={toggle} className="cursor-pointer">
      {children}
    </div>
  );
};

export const DropdownMenuContent = ({ className, children, isOpen, close }) => {
  if (!isOpen) return null;

  return (
    <div 
      onClick={close}
      className={cn(
        "absolute right-0 z-50 mt-2 min-w-[12rem] overflow-hidden rounded-xl border bg-white p-1 text-gray-800 shadow-xl animate-in fade-in zoom-in-95 duration-200", 
        className
      )}
    >
      {children}
    </div>
  );
};

export const DropdownMenuItem = ({ className, children, onClick, close }) => {
  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (close) close();
  };

  return (
    <div 
      onClick={handleClick} 
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm outline-none hover:bg-indigo-50 hover:text-indigo-600 transition-colors", 
        className
      )}
    >
      {children}
    </div>
  );
};

export const DropdownMenuLabel = ({ className, children }) => <div className={cn("px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400", className)}>{children}</div>
export const DropdownMenuSeparator = () => <div className="-mx-1 my-1 h-px bg-slate-100" />
