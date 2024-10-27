import React from 'react';
import styled from 'styled-components';

const Switch = ({ isOn, handleToggle }) => (
  <SwitchContainer>
    <SwitchInput type="checkbox" checked={isOn} onChange={handleToggle} />
    <Slider>
      <TextInside>{isOn ? '°C' : '°F'}</TextInside>
    </Slider>
  </SwitchContainer>
);

const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 70px;
  height: 30px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #4CAF50;
  }

  &:checked + span:before {
    transform: translateX(35px);
  }

  &:checked + span > p {
    left: 12px;
    color: #fff;
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 30px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const TextInside = styled.p`
  position: absolute;
  top: 5px;
  left: 38px;
  margin: 0;
  font-size: 12px;
  font-weight: bold;
  color: #4CAF50;
  transition: 0.4s;
`;

export default Switch;
