import React, { useEffect } from 'react';
import CreateAssignment from './CreateAssignment';
import ShowAssignments from './ShowAssignments';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as mentorConstants from '../../redux/constants/mentorConstants';

const Assignments = (props) => {
  useEffect(() => {
    if (props.id_mentor.id !== undefined) {
      props.dispatch({ type: mentorConstants.LOAD_INTERNS_MENTOR_REQUEST, id_mentor: props.id_mentor.id })
    }
  })
  return (
    <React.Fragment>
      <Wrapper>
        <CreateAssignment />
        <ShowAssignments id_intern={props.id_intern.id} />
      </Wrapper>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    id_mentor: state.user.user_detail,
    id_intern: state.user.user_detail,
  }
}

export default connect(mapStateToProps)(Assignments);

const Wrapper = styled.div`
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;