import { createContext } from "react";
import { Theme } from "./Theme";

export const ThemeContext = createContext<Theme>({
  primaryColor: "steelblue",
  setPrimaryColor: () => {},
});
