import React, { useState } from 'react';
import { connect } from 'react-redux';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import styled from 'styled-components';
import * as answerConstant from '../../../../redux/constants/answerConstants'
import * as assignmentsConstants from '../../../../redux/constants/assignmentsConstants'
import Evaluate from './Evaluate'

const Approve = (props) => {
  const [role] = useState(localStorage.getItem('role'))
  const [show, setShow] = useState(false)
  const { id_answer, approve, assignment_id, mark, evaluate } = props
  const handleApprove = () => {
    // Do luu data cua api answer_assignment khong dung cho nen phai tach approve ra nhu vay :(((
    if (role === 'mentor' && props.define === 'approve_in_intern_detail') {
      props.dispatch({ type: answerConstant.APPROVE_REQUEST, id_answer })
    } else if (role === 'mentor') {
      props.dispatch({ type: assignmentsConstants.APPROVE_BY_MENTOR_REQUEST, id_answer, assignment_id })
    }
  }

  const handleShowChooseMark = () => {
    setShow(!show)
  }

  const handlePickMark = (item) => {
    const profile = new FormData();
    profile.append('mark', item)
    props.dispatch({
      type: answerConstant.PUT_MARK_REQUEST,
      id_answer: id_answer,
      profile,
      mark: item,
      assignment_id: assignment_id,
    })
    setShow(!show)
  }

  return (
    <div>
      <IconApprove approve={approve.toString()} onClick={handleApprove} />
      {approve && role === "mentor" &&
        < ShowChooseMark show={show.toString()} onClick={handleShowChooseMark}>Mark</ShowChooseMark>
      }
      <WrapMark>
        {show && approve && markData.map((item, idx) =>
          <Mark key={idx} onClick={() => handlePickMark(item)}>{item}</Mark>
        )}
      </WrapMark>
      {
        approve &&
        <WrapperEvaluate>
          <ShowMark>{`Mark: ${mark}`}</ShowMark>
          {role === 'mentor' &&
            <Evaluate
              id_answer={id_answer}
            />
          }
          <p>{`Evaluate: ${evaluate === null ? '' : evaluate}`}</p>
        </WrapperEvaluate>
      }
    </div >
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
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.37);
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
  margin-bottom: 5px;
`;
const ShowMark = styled.div`
  color: #e21a22;
`;

const WrapperEvaluate = styled.div`
  input {
    margin: 5px 0 0 0;
    padding: 5px 10px;
    border: 1px solid #00cec9;
    border-radius: 3px;
  }
  p {
    margin: 5px 0 0 0;
  }
`;

const markData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];