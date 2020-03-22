import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const colorLogo = '#e21a22';

const Wrapper = styled.div`
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    font-size: 80px;
    color: ${ colorLogo };
    margin: 20px 0;
  }

  a {
    font-size: 24px;
    text-decoration: none;
    color: ${ colorLogo };
  }
`;


class PageNotFound extends React.Component {
  render(){
    return(
      <Wrapper>
        <p>{`Page Not Found :(`}</p>
        <Link to="/">Return Home</Link>
      </Wrapper>
    )
  }
}

export default PageNotFound;