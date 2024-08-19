import { usePrimaryColor } from "../domain/theme/hooks";
import logo from "../images/logo.png";
import { NavLink } from "react-router-dom";

export const AppHeader = () => {
  const primaryColor = usePrimaryColor();

  const links = [
    { path: '/books', text: 'Books' },
    { path: '/about', text: 'About' }
  ];

  return (
    <header className="app-header">
      <img src={logo} alt="Awesome comic-style monkey with sunglasses" />
      <h1 style={{ color: primaryColor }}>Bookmonkey</h1>
      <nav>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            
            style={({ isActive }) => ({
              color: isActive ? primaryColor : ''
            })}
          >
            {link.text}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};
