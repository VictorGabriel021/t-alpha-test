import { Link, NavLink } from "react-router-dom";

import { Header, NavbarContainer } from "./styles";

import LogoTAlpha from "assets/images/logo.png";
import { Button } from "@mui/material";

import { useAuth } from "context/AuthContext";

const Navbar = () => {
  const { logout, token } = useAuth();

  return (
    <Header>
      <Link to="/">
        <img src={LogoTAlpha} alt="Logo T-Alpha" />
      </Link>
      <NavbarContainer>
        {token ? (
          <ul>
            <li>
              <Button variant="text" onClick={logout}>
                Logout
              </Button>
            </li>
          </ul>
        ) : (
          <>
            <ul>
              <li>
                <NavLink to="/">
                  <Button variant="contained">Entrar</Button>
                </NavLink>
              </li>
            </ul>
            <ul>
              <li>
                <NavLink to="/register">
                  <Button variant="outlined">Cadastrar</Button>
                </NavLink>
              </li>
            </ul>
          </>
        )}
      </NavbarContainer>
    </Header>
  );
};

export default Navbar;
