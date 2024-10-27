import React from "react";
import styled from "styled-components";
import Switch from "./Switch";

function Navbar({ searchValue, setSearchValue, getSearchData, units, setUnits, getWeather}) {
  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };
  const handleToggle = () => {
    setUnits(units === 'metric' ? 'imperial' : 'metric')
    getWeather()
  }

  return (
    <NavBar>
      <div>
        <input type="text" onChange={handleChange}
          value={searchValue} />
        <button onClick={getSearchData}>Search</button>
      </div>
      <Switch handleToggle={handleToggle} isOn={units=== 'metric'}/>
    </NavBar>
  );
}

const NavBar = styled.div`
  width: 100%;
  height: 80px;
  background-color: purple;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export default Navbar;