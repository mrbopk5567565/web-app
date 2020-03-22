import React from 'react';

import { Link } from 'react-router-dom';
import { navData } from './NavData/navData';
import styled from 'styled-components';

const NavItem = styled.li`
  list-style-type: none;
  padding: 10px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #e21a22;
`;

function Navigation(){
  return(
    <>
      { navData && 
        navData.map((item, idx) =>
          <NavItem key={ idx }>
            <NavLink to={ item.link }>{ item.name }</NavLink>
          </NavItem>
        )
      }
    </>
  )
}

export default Navigation;