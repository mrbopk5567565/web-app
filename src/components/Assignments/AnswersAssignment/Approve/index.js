import React, { useState } from 'react';
import { connect } from 'react-redux';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import styled from 'styled-components';
import * as answerConstant from '../../../../redux/constants/answerConstants'
import * as assignmentsConstants from '../../../../redux/constants/assignmentsConstants'

const Approve = (props) => {
  const [role] = useState(localStorage.getItem('role'))
  const { id_answer, approve, assignment_id } = props
  const handleApprove = () => {
    if (role === 'mentor') {
      props.dispatch({ type: assignmentsConstants.APPROVE_BY_MENTOR_REQUEST, id_answer, assignment_id })
    }
  }

  return (
    <div>
      <IconApprove approve={approve.toString()} onClick={handleApprove} />
    </div>
  )
}

export default connect()(Approve);

const IconApprove = styled(ThumbUpAltIcon)`
position: absolute;
  top: 50%;
  left: -30px;
  font-size: 20px;
  transform: translate(0, -50%);
  cursor: pointer;
  color: ${props => props.approve === "true" ? '#2271dd' : 'black'};
`;