import { useStore } from "@/hooks";
import { Link, NavLink } from "react-router-dom";
import Texts from "./Texts";
import { Container, Dropdown, Image } from "react-bootstrap";

const Nav = () => {
  const { loggedInUser, logout } = useStore();
  return (
    <Container
      fluid="xl"
      className="navbar d-flex justify-content-between align-items-center p-3"
    >
      <div>
        <Link to="/">
          <Texts
            text={
              <>
                <span className="logo fw-bold">BH</span> BetaHouse
              </>
            }
            size="30px"
            className="fw-medium text-white"
          />
        </Link>
      </div>
      <div
        className="d-flex align-items-center gap-4 "
        style={{ color: "var(--bg-white-200)" }}
      >
        <NavLink to="/">Home</NavLink>
        <NavLink to="/properties">Properties</NavLink>
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/contact">Contact us</NavLink>
      </div>
      <div>
      <Dropdown className="d-none d-lg-block">
          <Dropdown.Toggle
            variant="none"
            id="dropdown-basic"
            className="w-100 text-start dropdown-toggle"
          >
            <Image
              src={
                loggedInUser
                  ? loggedInUser?.photo
                  : "https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png"
              }
              roundedCircle
              className="object-fit-cover"
              style={{ width: "30px", height: "30px" }}
              alt="profilepic"
            />
            <span className="fw-bold mx-2">
              {loggedInUser ? loggedInUser?.firstName : "firstName"}
            </span>
          </Dropdown.Toggle>
          </Dropdown>
      </div>
    </Container>
  );
};

export default Nav;
