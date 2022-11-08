import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import JobListing from "../JobListing/JobListing";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  height: 200px;
  // background-color: antiquewhite;
  border-bottom: 1px solid #e4e2e0;
  justify-content: center;
  align-items: center;
`;

const LowerBanner = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const Search = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const Input = styled.input`
  display: flex;
  border: 1px solid black;
  border-left: none;
  border-radius: 0px 5px 5px 0px;
  height: 40px;
  width: 300px;
  outline: none;
`;

const Button = styled.button`
  background: #15a800;
  border-radius: 3px;
  border: none;
  height: 40px;
  color: white;
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  &:hover {
    background-color: #118f00;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px 0px 0px 5px;
  border: 1px solid black;
  border-right: none;
  height: 40px;
  padding: 10px;
  font-weight: bold;
`;

const Title = styled.div`
  display: flex;
  font-size: large;
  cursor: pointer;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.active &&
    css`
      font-size: larger;
      font-weight: bold;
      border-bottom: 3px solid #15a800;
    `};
`;

const JobSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 75%;
  height: fit-content;
  gap: 20px;
`;

const JobPostings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 50%;
  height: fit-content;
`;

const JobDetails = styled.div`
  display: flex;
  flex: 50%;
  background-color: #e3e3e3;
  height: 300px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export default function Home() {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Wrapper>
      <Banner>
        <Search>
          <Box>
            <Label>What</Label>
            <Input placeholder="Job title, keywords, or company" />
          </Box>

          <Box>
            <Label>Where</Label>
            <Input placeholder="City, state, or zip code" />
          </Box>

          <Box>
            <Button>Find Work</Button>
          </Box>
        </Search>
        Employers: post a job – your next hire is here
      </Banner>

      <LowerBanner>
        <Box>
          <Title active={currentTab === 0} onClick={() => setCurrentTab(0)}>
            Job Feed
          </Title>
        </Box>

        <Box>
          <Title active={currentTab === 1} onClick={() => setCurrentTab(1)}>
            Recent Searches
          </Title>
        </Box>
      </LowerBanner>

      {currentTab === 1 ? (
        <>
          <div>
            <span>Recent Searches</span>
          </div>
        </>
      ) : (
        <>
          <JobSection>
            <JobPostings>
              <JobListing />

              <JobListing />
            </JobPostings>

            <JobDetails></JobDetails>
          </JobSection>
        </>
      )}
    </Wrapper>
  );
}
