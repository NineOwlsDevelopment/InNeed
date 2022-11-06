import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Box = styled.div`
  display: flex;
  padding: 10px;
  width: 100%;
  height: 300px;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border: 1px solid;
  cursor: pointer;
`;

const ListingLeft = styled.div`
  display: flex;
  flex: 90%;
  flex-direction: column;
`;

const ListingRight = styled.div`
  display: flex;
  padding: 5px;
  height: fit-content;
  flex: 10%;
  justify-content: center;
  align-items: centers;
`;

const JobTitle = styled.span`
  display: flex;
  width: 100%;
  font-weight: bold;
  font-size: larger;
`;

const Company = styled.span`
  display: flex;
  width: 100%;
  font-size: large;
`;

const Location = styled.span`
  display: flex;
  width: 100%;
  font-size: large;
`;

export default function JobListing() {
  return (
    <>
      <Box>
        <ListingLeft>
          <JobTitle>Front End Web Developer</JobTitle>
          <Company>inNeed</Company>
          <Location>Houston, TX</Location>
        </ListingLeft>

        <ListingRight>
          <FavoriteBorderIcon />
        </ListingRight>
      </Box>
    </>
  );
}
