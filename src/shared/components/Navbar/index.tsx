import { Link, NavLink } from "react-router-dom";

import { Header, NavbarContainer } from "./styles";

import LogoTAlpha from "assets/images/logo.png";

const Navbar = () => {
  return (
    <Header>
      <Link to="/">
        <img src={LogoTAlpha} alt="Logo T-Alpha" />
      </Link>
      <NavbarContainer>
        <ul>
          <li>
            <NavLink to="/">Login</NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink to="/products">Produtos</NavLink>
          </li>
        </ul>
      </NavbarContainer>
    </Header>
  );
};

export default Navbar;
