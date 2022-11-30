import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import axios from "axios";

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: fit-content;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border: 1px solid;
  cursor: pointer;
`;

const Header = styled.div`
  display: flex;
  flex: 30%;
  width: 100%;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  font-size: large;
  cursor: pointer;
  justify-content: flex-start;
  align-items: center;
  font-weight: bolder;
`;

const Description = styled.span`
  display: flex;
  overflow: hidden;
  font-size: small;
  padding: 10px;
`;

export default function JobDetails(props) {
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/job/find/${props.uuid}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.message);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [props.uuid]);

  if (job) {
    return (
      <>
        <DetailsWrapper>
          <Header>
            <Title>
              {job.title
                .toLowerCase()
                .split(" ")
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(" ")}
            </Title>

            <Description>{job.description}</Description>
          </Header>

          <button>Apply Now</button>
        </DetailsWrapper>
      </>
    );
  }
}
