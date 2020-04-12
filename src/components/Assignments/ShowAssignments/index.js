import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import AssignmentItem from '../AssignmentItem';
import * as assignmentsConstants from '../../../redux/constants/assignmentsConstants';
import * as answerConstants from '../../../redux/constants/answerConstants';
import * as internConstants from '../../../redux/constants/internConstants'

const ShowAssignments = (props) => {
  const [role] = useState(localStorage.getItem('role'))
  const [page, setPage] = useState(1);
  const [totalpage, setTotalpage] = useState([]);
  const {
    // id_intern_user_detail,
    assignment_intern,
  } = props;
  useEffect(() => {
    props.dispatch({ type: assignmentsConstants.LOAD_ASSIGNMENTS_REQUEST, page })
    props.dispatch({ type: answerConstants.LOAD_ANSWER_REQUEST })
    if (role === 'intern' && props.id_intern !== undefined) {
      props.dispatch({
        type: internConstants.LOAD_ASSIGNMENT_OF_INTERN_REQUEST,
        id_intern: props.id_intern,
      })
    }
  }, [page, props.id_intern])

  console.group('123', props.id_intern, assignment_intern)

  useMemo(() => {
    if (props.assignments.metadata !== undefined) {
      const flag = [];
      for (let i = 1; i <= props.assignments.metadata.total_pages; i++) {
        flag.push(i);
      }
      setTotalpage(flag)
    }
  }, [props])

  const SwapPagination = (page) => {
    setPage(page)
    window.scrollTo(0, 0)
  }

  return (
    <React.Fragment>
      <Wrapper>
        {(role === 'mentor' && props.assignments.data) && props.assignments.data.map((item, idx) =>
          <AssignmentItem
            key={idx}
            item={item}
          />
        )}
        {role === 'intern' && assignment_intern.data && assignment_intern.data.map((item, idx) =>
          <AssignmentItem
            key={idx}
            item={item}
          />
        )}
      </Wrapper>
      <Pagination>
        {(props.assignments.metadata && totalpage.length != 0) && totalpage.map((page, idx) =>
          <button key={idx} onClick={() => SwapPagination(page)}>{page}</button>
        )}
      </Pagination>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    assignments: state.assignment.assignments,
    id_intern_user_detail: state.user.user_detail,
    assignment_intern: state.intern.assignment_intern,
  }
}

export default connect(mapStateToProps)(ShowAssignments);

const Wrapper = styled.div`
  width: 100%;
`;

const Pagination = styled.div`
  text-align: center;
  margin: 30px auto;
  button {
    font-size: 18px;
    margin: 0 2px; 
    cursor: pointer;
    padding: 10px 15px;
    border: 1px solid #8e44ad;
    border-radius: 5px;
  }
`;