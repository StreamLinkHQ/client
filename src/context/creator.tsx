import { createContext, useState } from "react";

type IntialCreatorState = {
  featuresAdded: boolean;
  setFeaturesAdded: Function;
};

const initialState = {
  featuresAdded: false,
  setFeaturesAdded: () => {},
};

type CreatorProps = {
  children: React.ReactElement;
};

export const CreatorContext = createContext<IntialCreatorState>(initialState);

export const CreatorContextProvider = ({ children }: CreatorProps) => {
  const [featuresAdded, setFeaturesAdded] = useState<boolean>(true);
  console.log(featuresAdded);
  return (
    <CreatorContext.Provider value={{ featuresAdded, setFeaturesAdded }}>
      {children}
    </CreatorContext.Provider>
  );
};
