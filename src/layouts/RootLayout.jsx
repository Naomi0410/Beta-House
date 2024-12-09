import { Texts } from "@/components";
import { Container } from "react-bootstrap";
import { Link, useOutlet } from "react-router-dom";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function RootLayout() {
  const outlet = useOutlet();
  return (
    <>
      <main style={{ minHeight: "85vh" }}>{outlet}</main>
      <footer style={{ backgroundColor: "var(--bg-green-500)" }}>
        <Container
          fluid="xl"
          className="px-3 py-5 d-flex align-items-center justify-content-between"
          style={{gap: "7rem"}}
        >
          <div className="d-flex flex-column">
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
            <Texts
              text="Discover, rent, and find your ideal home hassle-free with BetaHouse. Take control of your rental journey today!"
              className="text-white"
            />
            <div className="d-flex flex-column text-white">
              <div className="d-flex align-items-center gap-3">
                <FaLocationDot />
                <span>95 Tinubu Estate, Lekki, Lagos</span>
              </div>
              <div className="d-flex align-items-center gap-3">
                <FaPhone /> <span>+234 675 8935 675</span>
              </div>
              <div className="d-flex align-items-center  gap-3">
                <MdEmail /> <span>support@rentbetahouse.com</span>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column">
            <Texts text="Quick Links" size="25px" className="text-white fw-medium"/>
            <Texts text="Home" className="text-white"/>
            <Texts text="Properties" className="text-white"/>
            <Texts text="About" className="text-white"/>
            <Texts text="Contact us" className="text-white"/>
            <Texts text="Blog" className="text-white"/>
          </div>
          <div className="d-flex flex-column">
            <Texts text="More" size="25px" className="text-white fw-medium"/>
            <Texts text="Agents" className="text-white"/>
            <Texts text="Affordable Houses" className="text-white"/>
            <Texts text="FAQ's" className="text-white"/>
          </div>
          <div className="d-flex flex-column">
          <Texts text="Popular Search" size="25px" className="text-white fw-medium"/>
            <Texts text="Apartments for sale" className="text-white"/>
            <Texts text="Apartments for rent" className="text-white"/>
            <Texts text="3 bedroom flats" className="text-white"/>
            <Texts text="Bungalow" className="text-white"/>
          </div>
        </Container>
      </footer>
    </>
  );
}
