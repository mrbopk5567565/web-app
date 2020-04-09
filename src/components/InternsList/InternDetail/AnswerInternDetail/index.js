import React, { useState } from 'react';
import styled from 'styled-components';
import Comments from '../../../Assignments/Comments';
import Approve from '../../../Assignments/AnswersAssignment/Approve';
import { device } from '../../../../utils/device';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import { ConvertSecToDay } from '../../../../utils/common'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@material-ui/core';
import * as answerConstants from '../../../../redux/constants/answerConstants'

const AnswerInternDetail = (props) => {
  const [openDeteleMentor, setOpenDeteleMentor] = useState(false);
  const [id_answer, setId_Answer] = useState(0);
  const { data } = props;

  // delete answer mentor
  const handleCloseDeleteMentor = () => {
    setOpenDeteleMentor(false);
  };

  const handleOpenDeleteAnswerMentor = (item) => {
    setId_Answer(item.id)
    setOpenDeteleMentor(true);
  }

  const handleDeleteDataAnswerMentor = () => {
    props.dispatch({ type: answerConstants.DELETE_ANSWER_REQUEST, id_answer: id_answer })
    setOpenDeteleMentor(false);
  }
  // delete answer mentor

  const DeadlineAssignment = (data) => {
    const timeCreateAssingment = new Date(data.updated_at)
    const convert_timeCreateAssignment = Math.floor(timeCreateAssingment.getTime() / 1000.0);
    const estimation = 3600 * data.estimation;
    const now = Math.floor(new Date().getTime() / 1000.0)
    if ((convert_timeCreateAssignment + estimation) > now) {
      const timeoutNumber = (convert_timeCreateAssignment + estimation) - now;
      var myDate = new Date(timeoutNumber * 1000);
      // const timeout = moment(timeoutNumber * 1000).format('h:mm')
      // return `Time left: ${ConvertSecToDay(timeoutNumber)}`
      return {
        show: `Time left: ${ConvertSecToDay(timeoutNumber)}`,
        time: true
      }

    } else {
      const timeoutNumber = now - (convert_timeCreateAssignment + estimation);
      // const timeout = moment(timeoutNumber * 1000).format('hh:mm');
      // return `Time out: ${ConvertSecToDay(timeoutNumber)}`
      return {
        show: `Time out: ${ConvertSecToDay(timeoutNumber)}`,
        time: false
      }
    }
  }

  return (
    <Wrapper>
      {data && data.map((item, idx) => {
        if (item.assignment !== null) {
          return (
            <WrapperAnswerIntern key={idx}>
              <Assignment>
                <IdAssingment>{`# ${item.assignment.id}`}</IdAssingment>
                <IconDelete onClick={() => handleOpenDeleteAnswerMentor(item)} />
                <Question>
                  Question:
                  <span>
                    {item.assignment.question}
                  </span>
                </Question>
                <Description>
                  Decription:
                  <span>
                    {item.assignment.description}
                  </span>
                </Description>
                <InfoQuestion>
                  <p>{`Estimation: ${item.assignment.estimation} hours`}</p>
                  <p style={{ color: `${DeadlineAssignment(item.assignment).time == false ? 'yellow' : 'white'}` }}> {DeadlineAssignment(item.assignment).show}</p>
                  <p>{`Team: ${item.assignment.team}`}</p>
                </InfoQuestion>
              </Assignment>
              <Answer>
                <Link>
                  Answer:
                  <span>{item.link}</span>
                </Link>
                <Approve
                  id_answer={item.id}
                  approve={item.completed}
                  define="approve_in_intern_detail"
                  mark={item.mark}
                  evaluate={item.evaluate}
                  id_assignment={item.assignment.id}
                />
              </Answer>
              <InputComment>
                <Comments
                  id_answer={item.id}
                />
              </InputComment>
            </WrapperAnswerIntern>
          )
        }
      })}


      {/* Dialog Delete Mentor*/}
      <Dialog
        fullWidth={true}
        open={openDeteleMentor}
        onClose={handleCloseDeleteMentor}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
      >
        <DialogTitle id="form-dialog-title">Detele Answer</DialogTitle>
        <DialogContent>
          Are you sure want to delete this answer
          <DialogActions>
            <Button onClick={handleCloseDeleteMentor} color="primary">
              Cancel
              </Button>
            <Button onClick={handleDeleteDataAnswerMentor} color="primary">
              Detele
              </Button>
          </DialogActions>

        </DialogContent>
      </Dialog>
    </Wrapper>
  )
}

export default connect()(AnswerInternDetail);

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const WrapperAnswerIntern = styled.div`
  border: 1px solid #00cec9;
  margin: 5px 10px 10px 0;
  border-radius: 5px;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.37);
  width: calc(50% - 10px);
  height: fit-content;

  @media ${device.mobileS} {
    width: calc(100%/1 - 10px);
  };
  @media ${device.laptopL} {
    width: calc(100%/2 - 10px);
  };
`;
const Assignment = styled.div`
  border-bottom: 1px solid #00cec9;
  padding-left: 10px;
  position: relative;
`;

const IconDelete = styled(DeleteIcon)`
  position: absolute;
  font-size: 14px;
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
  cursor: pointer;
  &:hover{
    color: red;
  };
`;

const IdAssingment = styled.div`
  /* background: #2271dd; */
  background: black;
  color: white;
  padding: 5px;
  border-radius: 3px;
  width: fit-content;
  margin: 5px 0;
  font-weight: 500;
`;

const Question = styled.p`
  span {
    margin: 0 0 0 5px;
    padding: 5px 10px;
    background: #00cec9;
    border-radius: 3px;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.37);
  }
`;
const Description = styled.p`
  span {
    margin: 0 0 0 5px;
    padding: 5px 10px;
    background: #00cec9;
    border-radius: 3px;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.37);
  }`;
const InfoQuestion = styled.div`
  display: flex;
  margin: 5px 0;
  p {
    font-size: 12px;
    padding: 8px;
    border-radius: 3px;
    background: #00cec9;
    margin: 0px;
    margin-right: 10px;
  }
`;
const Answer = styled.div`
  position: relative;
  margin-left: 35px;
  padding-left: 10px;
  border-left: 0.5px solid #00cec9;
  span {
    margin: 0 0 0 5px;
    padding: 5px 10px;
    background: #00cec9;
    border-radius: 3px;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.37);
  }
`;
const InputComment = styled.div`
  margin: 10px 50px 10px 70px;
  font-size: 16px;
`;
const Link = styled.p``;