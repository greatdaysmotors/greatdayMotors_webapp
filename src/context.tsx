// TripContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface TripContextProps {
  isPending: boolean;
  setIsPending: (pending: boolean) => void;
}

// Create the Trip Context
const TripContext = createContext<TripContextProps | undefined>(undefined);

// Create a provider component
export const TripProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isPending, setIsPending] = useState(false);

  return (
    <TripContext.Provider value={{ isPending, setIsPending }}>
      {children}
    </TripContext.Provider>
  );
};

// Create a custom hook to use the Trip Context
// eslint-disable-next-line react-refresh/only-export-components
export const useTripContext = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error("useTripContext must be used within a TripProvider");
  }
  return context;
};
