import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export const usePrimaryColor = () => {
  const { primaryColor } = useContext(ThemeContext);
  return primaryColor;
};
