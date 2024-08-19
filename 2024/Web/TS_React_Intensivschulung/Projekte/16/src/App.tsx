import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./components/AppHeader";
import { Theme } from "./domain/theme/Theme";
import { ThemeContext } from "./domain/theme/ThemeContext";

function App() {
  const [primaryColor, setPrimaryColor] = useState("tomato");

  const theme: Theme = {
    primaryColor,
    setPrimaryColor,
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className="App">
        <AppHeader />
        <Outlet />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
