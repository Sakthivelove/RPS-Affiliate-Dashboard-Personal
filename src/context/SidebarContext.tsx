import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the types for the context value
interface SidebarContextType {
  sidebarActive: boolean;
  toggleSidebar: () => void;
  setSidebarActive: (active: boolean) => void;
}

// Define the SidebarContext
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Create a custom hook to use the sidebar context
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

// Define the props type for SidebarProvider
interface SidebarProviderProps {
  children: ReactNode;  // This is the correct type for children prop
}

// SidebarProvider component that provides the context to its children
export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [sidebarActive, setSidebarActive] = useState<boolean>(true);

  const toggleSidebar = () => {
    setSidebarActive((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ sidebarActive, toggleSidebar, setSidebarActive }}>
      {children}
    </SidebarContext.Provider>
  );
};
