import React from "react";
import styled from "styled-components";

function Navbar({ searchValue, setSearchValue, getSearchData }) {
  const handleChange = (event) => {
    setSearchValue(event.target.value);
};
  return (
    <NavBar>
      <input type="text" onChange={handleChange}
        value={searchValue} />
      <button onClick={getSearchData}>Search</button>
    </NavBar>
  );
}

const NavBar = styled.div`
  width: 100%;
  height: 80px;
  background-color: purple
`;

export default Navbar;