import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import AssignmentItem from '../AssignmentItem';
import * as assignmentsConstants from '../../../redux/constants/assignmentsConstants';
import * as answerConstants from '../../../redux/constants/answerConstants';

const ShowAssignments = (props) => {
  const [page] = useState(0);
  useEffect(() => {
    props.dispatch({ type: assignmentsConstants.LOAD_ASSIGNMENTS_REQUEST, page })
    props.dispatch({ type: answerConstants.LOAD_ANSWER_REQUEST })
  }, [])
  return (
    <React.Fragment>
      <Wrapper>
        {props.assignments.data && props.assignments.data.map((item, idx) =>
          <AssignmentItem
            key={idx}
            item={item}
          />
        )}
      </Wrapper>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    assignments: state.assignment.assignments,
  }
}

export default connect(mapStateToProps)(ShowAssignments);

const Wrapper = styled.div`
  width: 100%;
`