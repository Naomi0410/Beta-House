import { useState } from "react";
import { ActionButton, Texts } from ".";
import { Container } from "react-bootstrap";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

const SearchBar = () => {
  const [bedrooms, setBedrooms] = useState(1);

  const increment = () => {
    setBedrooms(bedrooms + 1);
  };

  const decrement = () => {
    if (bedrooms > 0) {
      setBedrooms(bedrooms - 1);
    }
  };

  const handleSearch = () => {
    console.log("Searching for properties...");
  };

  return (
    <Container
      fluid="xl"
      className="d-grid searchBox pt-3 rounded-3"
      style={{
        backgroundColor: "white",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
      }}
    >
      <div className="d-flex flex-column ps-5">
        <span className="fw-bold">LOCATION</span>
        <input className="border-0" placeholder="e.g. Gbagada" />
      </div>
      <div className="d-flex flex-column px-5">
        <span className="fw-bold">PROPERTY TYPE</span>
        <input className="border-0" placeholder="eg. Duplex, Bedroom Flat" />
      </div>
      <div className="d-flex flex-column">
        <span className="fw-bold">BEDROOM</span>
        <span className="d-flex gap-2 align-items-center">
          <ActionButton
            text={
              <>
                <CiCircleMinus size="20px" color="black" />
              </>
            }
            size="sm"
            variant="none"
            onClick={decrement}
          />
          <span className="fs-6 fw-medium">{bedrooms}</span>
          <ActionButton
            text={
              <>
                {" "}
                <CiCirclePlus size="20px" color="black" />
              </>
            }
            size="sm"
            variant="none"
            onClick={increment}
          />
        </span>
      </div>
      <ActionButton
        text="Find Property"
        className=" w-100 btns"
        type="submit"
        onClick={handleSearch}
      />
    </Container>
  );
};

export default SearchBar;
