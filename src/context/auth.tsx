import axios from "axios";
import { useState, createContext } from "react";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { baseApi } from "../config";

type AuthProps = {
  children: React.ReactElement;
};

type IntialUserState = {
  user: any;
  setUser: Function;
};

const initialState = {
  user: {},
  setUser: () => {},
};

export const AuthContext = createContext<IntialUserState>(initialState);

export const AuthContextProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState(() => {
    // getting stored value
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    return currentUser;
  });
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "7550a575-2c16-4470-a533-1e85520046ba",
        walletConnectors: [SolanaWalletConnectors],
        eventsCallbacks: {
          onAuthSuccess: async (args) => {
            const {
              user: {
                email,
                firstName,
                lastName,
                verifiedCredentials: [{ address }],
              },
            } = args;
            if (address !== undefined) {
              const { data } = await axios.post(`${baseApi}/user`, {
                name: `${firstName} ${lastName}`,
                email,
                wallet: address,
              });
              localStorage.setItem("user", JSON.stringify(data));
              setUser(data);
            }
          },
        },
      }}
    >
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    </DynamicContextProvider>
  );
};
