import { createContext, useContext } from "react";

export interface ModalContextI {
  isModal: boolean;
}

interface ModalContextDataProviderI {
  children: React.ReactNode;
}

export const ModalContext = createContext<ModalContextI | null>(null);

export const ModalContextDataProvider = ({
  children,
}: ModalContextDataProviderI) => {
  const isModal = true;

  return (
    <ModalContext.Provider value={{ isModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
