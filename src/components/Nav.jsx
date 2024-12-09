import { useStore } from "@/hooks";
import { Link, NavLink } from "react-router-dom";
import Texts from "./Texts";
import { Container } from "react-bootstrap";

const Nav = () => {
  const { loggedInUser, logout } = useStore();
  return (
    <Container fluid="xl">
      <div className="d-flex justify-content-between align-items-center p-3 navbar">
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
        <div className="d-flex align-items-center gap-4">
            <NavLink to="/">Home</NavLink>
        </div>
      </div>
    </Container>
  );
};

export default Nav
