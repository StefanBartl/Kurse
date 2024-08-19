import { usePrimaryColor } from "../domain/theme/hooks";
import logo from "../images/logo.png";
import { ThemeEditor } from "./ThemeEditor";
import { NavLink } from "react-router-dom";

export const AppHeader = () => {
  const primaryColor = usePrimaryColor();

  const highlightActiveLink = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? primaryColor : "",
  });

  return (
    <header className="app-header">
      <img src={logo} alt="Awesome comic-style monkey with sunglasses" />
      <h1 style={{ color: primaryColor }}>Bookmonkey</h1>
      <ThemeEditor />

      <nav style={{ "--c-brand-primary": primaryColor } as React.CSSProperties}>
        <NavLink to="/books">Books</NavLink>
        <NavLink to="/about" style={highlightActiveLink}>
          About
        </NavLink>
      </nav>
    </header>
  );
};
