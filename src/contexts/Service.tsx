import React, { createContext, useContext } from "react";
import { initializeService, IProvidedService } from "services";

export const ServiceContext = createContext<IProvidedService>(
  initializeService()
);

interface Props {
  children?: React.ReactNode;
}

export const ServiceProvider = React.memo<Props>(({ children }: Props) => {
  const MemoizedValue = React.useMemo(() => initializeService(), []);

  return (
    <ServiceContext.Provider value={MemoizedValue}>
      {children}
    </ServiceContext.Provider>
  );
});

export const useService = () => useContext(ServiceContext);
