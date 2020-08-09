import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";

const context = createContext(null);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket((soc) => {
      if (soc) return soc;
      return createSocket();
    });
    return () => {
      if (socket) socket.disconnect();
    };
  }, [socket]);
  return <context.Provider value={{ socket }}>{children}</context.Provider>;
};

const useSocket = () => {
  const value = useContext(context);
  return value;
};

const createSocket = () => {
  const socket = io();
  return socket;
};

export { useSocket };
export default SocketProvider;
