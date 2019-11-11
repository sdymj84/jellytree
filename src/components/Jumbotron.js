import React from "react";
import styled from "styled-components";

const StyledJumbotron = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: ${p => (p.category === "Home" ? "700px" : "200px")};
  background-image: url(${p => p.image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
`;

const Jumbotron = props => {
  return (
    <StyledJumbotron category={props.category} image={props.image}>
      {props.children}
    </StyledJumbotron>
  );
};

export default Jumbotron;
