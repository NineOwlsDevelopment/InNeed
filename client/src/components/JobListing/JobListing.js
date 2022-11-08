import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import LinesEllipsis from "react-lines-ellipsis";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PaymentsIcon from "@mui/icons-material/Payments";

const Box = styled.div`
  display: flex;
  padding: 20px;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border: 1px solid;
  cursor: pointer;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const SubHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  gap: 10px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const ListingLeft = styled.div`
  display: flex;
  flex: 90%;
  flex-direction: column;
`;

const ListingRight = styled.div`
  display: flex;
  padding: 5px;
  flex: 10%;
  justify-content: center;
  align-items: centers;
`;

const Title = styled.span`
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

const Salary = styled.div`
  display: flex;
  background-color: #e5f6e6;
  width: fit-content;
  font-weight: bold;
  padding: 5px;
  border-radius: 5px;
  font-size: small;
  gap: 5px;
  justify-content: center;
  align-items: center;
`;

const JobType = styled.div`
  display: flex;
  background-color: #e3e3e3;
  width: fit-content;
  font-weight: bold;
  padding: 5px;
  border-radius: 5px;
  font-size: small;
  gap: 5px;
  justify-content: center;
  align-items: center;
`;

const Description = styled.span`
  display: flex;
  overflow: hidden;
  font-size: small;
  padding: 10px;
`;

export default function JobListing() {
  return (
    <>
      <Box>
        <ListingLeft>
          <Header>
            <Title>Front End Web Developer</Title>
            <Company>inNeed</Company>
            <Location>Houston, TX</Location>
          </Header>

          <SubHeader>
            <Salary>
              <PaymentsIcon sx={{ fontSize: "medium" }} /> $80,000 - $90,000 per
              year
            </Salary>

            <JobType>Full-time</JobType>
          </SubHeader>

          <Body>
            <Description>
              <LinesEllipsis
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                maxLine="15"
                ellipsis="..."
                trimRight
                basedOn="letters"
              />
            </Description>
          </Body>
        </ListingLeft>

        <ListingRight>
          <FavoriteBorderIcon />
        </ListingRight>
      </Box>
    </>
  );
}
