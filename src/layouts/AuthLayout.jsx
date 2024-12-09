import { Outlet, useLocation, Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Texts } from "@/components";
import { Container, Image } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { authImg } from "@/assets";

const AuthLayout = () => {
  const location = useLocation();

  return (
    <>
      <Helmet>
        <title>Welcome to Beta</title>
        <meta name="description" content="Get started" />
      </Helmet>
      <Container fluid className="d-lg-flex p-0">
        <div
          className={`${styles.authBg} min-vh-100 d-flex flex-column justify-content-center align-items-center px-4`}
        >
          {location.pathname === "/authorize" ? (
            <>
              <Texts
                text="Join our community of home seekers and explore the possibilities that await."
                className="fw-bold text-center"
                size="2.5rem"
                color="var(--bg-zinc-800)"
              />
              <Texts
                text={
                  <>
                    {" "}
                    Click
                    <span className="fw-bold mx-1">
                      <Link to="/authorize/register" className="text-success">
                        sign up
                      </Link>
                    </span>
                    to register now.
                  </>
                }
                size="1.5rem"
              />
            </>
          ) : (
            <Outlet />
          )}
        </div>
        <div className="position-relative">
          <Image
            src={authImg}
            alt="authImage"
            loading="lazy"
            className="w-100 object-fit-cover rounded-3"
          />
          <div className="position-absolute top-0 p-5">
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
        </div>
      </Container>
    </>
  );
};

export default AuthLayout;
