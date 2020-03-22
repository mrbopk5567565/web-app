import React from 'react';

import Navigation from '../Navigation';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const WrapLink = styled.div`
`;

const Icon = styled(Link)`
  text-decoration: none;
  padding: 5px 10px;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e21a22;
  padding: 5px 10px;
  border-radius: 5px;
  margin-left: 20px;

  input {
    padding: 5px;
    font-size: 14px;
    border: none;
    outline: none
  }

  div {}
`;

const IconSearch = styled(FontAwesomeIcon)`
  font-size: 14px;
  color: #e21a22;
`;

const NavList = styled.ul`
  display: flex;
  padding: 0;
  width: 100%;
  justify-content: flex-end;
  padding-right: 50px;
`;

function Header(){
  return(
    <Wrapper>
      <WrapLink>
        <Icon to="/">
          <img src="https://vinova.sg/wp-content/themes/Divi/assetsV2/img/Vinova_Logo.png"/>
        </Icon>
      </WrapLink>
      <Search>
        <label htmlFor="search">
          <IconSearch icon={ faSearch }/>
        </label>
        <input name="search" id="search" type="search" placeholder="Search ..."/>
      </Search>
      <NavList>
        <Navigation/>
      </NavList>
    </Wrapper>
  )
}

export default Header;