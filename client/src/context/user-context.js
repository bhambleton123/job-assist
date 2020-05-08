import { createContext } from "react";

const userContext = createContext({
  user: null,
  setUser: () => {},
});

export { userContext };
