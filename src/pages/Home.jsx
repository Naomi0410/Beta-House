import { propertyImg } from "@/assets";
import { Nav } from "@/components";
import { Image } from "react-bootstrap";

const Home = () => {
  return (
    <div className="backgroundContainer">
        <Nav />
      <Image src={propertyImg} className="backdrop"/>
      
    </div>
  );
};

export default Home;
