import { propertyImg } from "@/assets";
import { Headings, Nav, SearchBar, Texts } from "@/components";
import { Image } from "react-bootstrap";

const Properties = () => {
  return (
    <div className="backgroundContainer">
      <Nav />
      <Image src={propertyImg} className="backdrop" />
      <div className="content mx-auto text-center">
        <Headings text="Browse Our Properties" size="3.5rem"/>
        <Texts className="text-white mt-3" size="1.25rem" text="Find your perfect home among our curated properties. Start browsing now!"/>
      </div>
      <div>
        <SearchBar/>
      </div>
    </div>
  );
};

export default Properties;
