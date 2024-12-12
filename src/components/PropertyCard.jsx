import { property } from "@/utils";
import { Card, Container } from "react-bootstrap";
import { FaLocationDot } from "react-icons/fa6";
import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { formatCurrency } from "@/utils";
import { IoIosSwap } from "react-icons/io";
import { MdFavoriteBorder } from "react-icons/md";
import { PiShareNetworkLight } from "react-icons/pi";

const PropertyCard = () => {
  return (
    <Container fluid="xl" className=" p-3 d-flex  flex-wrap justify-content-between gap-4">
      {property.map(
        ({ id, image, name, price, location, bathroom, bedroom }) => (
          <Card key={id} style={{ width: "20rem" }} className="propertyCard">
            <Card.Img variant="top" src={image} />
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text><FaLocationDot/> {location}</Card.Text>
              <div className="d-flex gap-4 align">
                <Card.Text><IoBedOutline/> {bedroom}</Card.Text>
                <Card.Text><LiaBathSolid/> {bathroom}</Card.Text>
              </div>
              <hr/>
              <div className="d-flex gap-4">
              <Card.Title>{formatCurrency(price)}</Card.Title>
              <IoIosSwap/>
              <PiShareNetworkLight/>
              <MdFavoriteBorder/>
              </div>
            </Card.Body>
          </Card>
        )
      )}
    </Container>
  );
};

export default PropertyCard;
