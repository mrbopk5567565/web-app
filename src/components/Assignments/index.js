import React from 'react';
import CreateAssignment from './CreateAssignment';
import ShowAssignments from './ShowAssignments';
import styled from 'styled-components';

const Assignments = () => {
  return (
    <React.Fragment>
      <Wrapper>
        <CreateAssignment />
        <ShowAssignments />
      </Wrapper>
    </React.Fragment>
  )
}

export default Assignments;

const Wrapper = styled.div`
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;