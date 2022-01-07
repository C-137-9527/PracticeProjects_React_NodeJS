import React from "react";
import styled from "styled-components";
import Fade from "react-reveal";

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: ${(props) => `url("/images/${props.bgImage}")`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ItemText = styled.div`
  padding-top: 15vh;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: auto;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftButton = styled.div`
  background: rgba(23, 26, 32, 0.8);
  height: 40px;
  width: 256px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  opacity: 0.5;
  text-transform: uppercase;
  font-size: 12px;
  cursor: pointer;
`;

const RightButton = styled(LeftButton)`
  background: white;
  opacity: 0.65;
  color: rgba(23, 26, 32, 0.8);
`;

const DownArrow = styled.img`
  margin-top: 10px;
  height: 40px;
  animation: animationDown infinite 1.5s;
  overflow: hidden;
`;

const Section = ({
  title,
  description,
  backgroundImg,
  leftBtnText,
  rightBtnText,
}) => {
  return (
    <Wrap bgImage={backgroundImg}>
      <Fade bottom>
        <ItemText>
          <h1>{title}</h1>
          <p>{description}</p>
        </ItemText>
      </Fade>
      <ButtonGroup>
        <LeftButton>{leftBtnText}</LeftButton>
        {rightBtnText && <RightButton>{rightBtnText}</RightButton>}
      </ButtonGroup>
      <DownArrow src="/images/down-arrow.svg"></DownArrow>
    </Wrap>
  );
};

export default Section;
