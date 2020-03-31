import React from 'react';
import styled from 'styled-components';

const Answers = () => {
  return (
    <Wrapper>
      <p>{`#${item2.user_id}`}</p>
      <p className="link">
        {item2.link}
      </p>
    </Wrapper>
  )
}

export default Answers;

const Wrapper = styled.div`
  margin: 0;
  border: 1px solid #2271dd;
  padding: 5px 10px;
  background: white;
  border-radius: 5px;
  font-size: 16px;
  p {
    margin: 0;
  }
  .link {
    border-top: 0.5px solid black;
  }
`;