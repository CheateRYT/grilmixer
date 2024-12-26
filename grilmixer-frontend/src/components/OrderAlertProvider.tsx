import React, { createContext, useContext, useState } from "react";

const OrderAlertContext = createContext<any>(null);

export const OrderAlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOrderAlertVisible, setOrderAlertVisible] = useState(false);

  return (
    <OrderAlertContext.Provider
      value={{ isOrderAlertVisible, setOrderAlertVisible }}
    >
      {children}
    </OrderAlertContext.Provider>
  );
};

export const useOrderAlert = () => {
  return useContext(OrderAlertContext);
};
