import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type UserProviderProps = {
  children: ReactNode;
};

type UserProps = {
  customerData?: {
    _id: string;
    firstName: string;
  };
  setUser: Function;
  userType?: string;
};

interface customer {
  _id: string;
  firstName: string;
}

const UserContext = createContext({} as UserProps);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: UserProviderProps) {
  const [customerData, setCustomerData] = useState<customer>();
  const [userType, setUserType] = useState<string>("Null");

  useEffect(() => {
    axios({
      method: "Get",
      url: "http://localhost:5000/api/customer/verify",
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.UserType === "Customer") {
          setUserType("Customer");
          setCustomerData(res.data.UserData[0]);
        } else if (res.data.UserType === "Vendor") {
          setUserType("Vendor");
        } else if (res.data.Authorization === false) {
          setUserType("Null");
        }
      })
      .catch((err) => setCustomerData(err));
  }, [userType]);

  const setUser = (Props: string) => {
    setUserType(Props);
  };

  return (
    <UserContext.Provider value={{ customerData, setUser, userType }}>
      {children}
    </UserContext.Provider>
  );
}
