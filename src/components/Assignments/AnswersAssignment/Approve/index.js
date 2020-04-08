import React, { useState } from 'react';
import { connect } from 'react-redux';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import styled from 'styled-components';
import * as answerConstant from '../../../../redux/constants/answerConstants'
import * as assignmentsConstants from '../../../../redux/constants/assignmentsConstants'

const Approve = (props) => {
  const [role] = useState(localStorage.getItem('role'))
  const [mark1, setMark] = useState(0)
  const [show, setShow] = useState(false)
  const { id_answer, approve, assignment_id } = props
  const handleApprove = () => {
    if (role === 'mentor') {
      props.dispatch({ type: assignmentsConstants.APPROVE_BY_MENTOR_REQUEST, id_answer, assignment_id })
    }
  }

  const handleShowChooseMark = () => {
    setShow(!show)
  }

  const handlePickMark = (item) => {
    console.log('item', item, id_answer)
    setMark(item)
  }

  return (
    <div>
      <IconApprove approve={approve.toString()} onClick={handleApprove} />
      {approve &&
        <ShowChooseMark show={show.toString()} onClick={handleShowChooseMark}>Mark</ShowChooseMark>
      }
      <WrapMark>
        {show && approve && mark.map((item, idx) =>
          <Mark key={idx} onClick={() => handlePickMark(item)}>{item}</Mark>
        )}
      </WrapMark>
      {approve &&
        <ShowMark>{`Mark: ${mark1}`}</ShowMark>
      }
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
const ShowChooseMark = styled.div`
  cursor: pointer;
  background: #2271dd;
  border-radius: 3px;
  width: fit-content;
  padding: 5px;
  padding-right: 23px;
  color: white;
  margin-top: 5px;
  position: relative;
  &::after{
    position: absolute;
    content: '';
    width: 8px;
    height: 8px;
    border-top: 2px solid white;
    border-right: 2px solid white;
    top: 50%;
    right: 10px;
    transform: translate(0, -50%) rotate(45deg);
    transform: translate(0, -50%) rotate(${props => props.show === "true" ? '135deg' : '45deg'});
    transition: 0.3s;
  }
`;
const WrapMark = styled.div`
  display: flex;
  margin-top: 5px;
  padding-top: 5px;
`;
const Mark = styled.div`
  margin-right: 10px;
  border: 1px solid black;
  border-radius: 3px;
  text-align: center;
  width: 30px;
  padding: 3px 0;
  cursor: pointer;
`;
const ShowMark = styled.div`
  margin-top: 5px;
  color: #e21a22;
`;

const mark = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];