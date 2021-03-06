import React, { useState, useEffect } from 'react';
import * as assignmentsConstants from '../../../redux/constants/assignmentsConstants';
import * as answerConstants from '../../../redux/constants/answerConstants';
import styled from 'styled-components';
import { connect } from 'react-redux';
// import { useForm } from 'react-hook-form';
import Comments from '../Comments';
import moment from 'moment'
import DeleteIcon from '@material-ui/icons/Delete';
import InputEditAnswer from './EditAnswer';
import Approve from './Approve';
import Time from './Time';
import styles from './styles';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

const AnswersAssignment = (props) => {
  const [role] = useState(localStorage.getItem('role'))
  const {
    id_assignment,
    answers_assignment,
    answers, list_interns,
  } = props;
  const [answer_id, setAnswer_id] = useState(0);
  const [openDeteleIntern, setOpenDeteleIntern] = useState(false);
  const [openDeteleMentor, setOpenDeteleMentor] = useState(false);
  const [id_intern, setID_Intern] = useState(0);

  useEffect(() => {
    if (id_intern !== 0) {
      const profile = new FormData();
      profile.append('intern_id', id_intern)
      props.dispatch({ type: answerConstants.ASSIGN_INTERN_TO_ASSIGNMENT_REQUEST, id_assignment, profile })
    }
  }, [id_intern])

  const classes = styles();

  // Create Answer
  const keyPressCreateAnwer = (e) => {
    if (e.keyCode == 13) {
      const profile = new FormData();
      profile.append('link', e.target.value)
      profile.append('assignment_id', id_assignment)
      props.dispatch({ type: answerConstants.CREATE_ANSWER_REQUEST, profile })
      e.target.value = '';
    }
  }

  // delete answer mentor
  const handleCloseDeleteMentor = () => {
    setOpenDeteleMentor(false);
  };

  const handleOpenDeleteAnswerMentor = (item) => {
    setAnswer_id(item.id)
    setOpenDeteleMentor(true);
  }

  const handleDeleteDataAnswerMentor = () => {
    props.dispatch({
      type: assignmentsConstants.DELETE_ANSWER_MENTOR_REQUEST,
      id_answer: answer_id,
      id_assignment: id_assignment,
    })
    setOpenDeteleMentor(false);
  }
  // delete answer mentor

  // delete answer intern
  const handleCloseDeleteIntern = () => {
    setOpenDeteleIntern(false);
  };

  const handleOpenDeleteAnswerIntern = (item) => {
    setAnswer_id(item.id)
    setOpenDeteleIntern(true);
  }

  const handleDeleteDataAnswerIntern = () => {
    props.dispatch({ type: answerConstants.DELETE_ANSWER_REQUEST, id_answer: answer_id })
    setOpenDeteleIntern(false);
  }
  // delete answer intern

  const handleChangeSelectIntern = (e) => {
    setID_Intern(e.target.value)
  }

  return (
    <Wrapper>
      {role === "intern" &&
        <InputAnswer>
          <label htmlFor="answer">Answers: </label>
          <input
            id="answer"
            name="answer"
            placeholder="answer ..."
            type="text"
            // onChange={handleChange}
            onKeyDown={keyPressCreateAnwer}
          />
        </InputAnswer>
      }

      {/* show answer in mentor */}
      {/* {answers_assignment && answers_assignment[id_assignment] &&
        answers_assignment[id_assignment].map((item, idx) =>
          <WrapperAnswers key={idx}>
            <Answers>
              <p>{`${item.user.name}`}</p>
              <p className="link">
                {item.link}
              </p>
              <IconDelete onClick={() => handleOpenDeleteAnswerMentor(item)} />
              <Approve
                id_answer={item.id}
                approve={item.completed}
                assignment_id={item.assignment.id}
                mark={item.mark}
                evaluate={item.evaluate}
              />
              <Time
                time_update={item.updated_at}
              />
            </Answers>
            <InputComment>
              {
                <Comments
                  id_answer={item.id}
                  approve={item.completed}
                />
              }
            </InputComment>
          </WrapperAnswers>
        )
      } */}

      {/* show interns of mentor */}
      {role === "mentor" &&
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel className={classes.inputLabel} id="demo-simple-select-outlined-label">List Interns</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={id_intern}
            onChange={handleChangeSelectIntern}
            label="Interns"
          >
            <MenuItem value={0}>None</MenuItem>
            {list_interns.data && list_interns.data.map((item, idx) =>
              <MenuItem key={idx} value={item.id}>{`${item.id}: ${item.name}`}</MenuItem>
            )}
          </Select>
        </FormControl>
      }

      {/* show answer in intern */}
      {answers && answers.length !== 0 && role === "intern" && answers.map((item, idx) => {
        if (item.assignment !== null && item.assignment.id === id_assignment) {
          return (
            <WrapperAnswers key={idx}>
              <Answers>
                <p>{`${item.user.name}`}</p>
                <p className="link">
                  {item.link}
                </p>
                {/* <IconEdit onClick={() => handleEditAnswer(item)} /> */}
                <IconDelete onClick={() => handleOpenDeleteAnswerIntern(item)} />
                <Approve
                  id_answer={item.id}
                  approve={item.completed}
                  mark={item.mark}
                  evaluate={item.evaluate}
                />
                <InputEditAnswer
                  id_answer={item.id}
                  link={item.link}
                />
                <Time
                  time_update={item.updated_at}
                />
              </Answers>
              <InputComment>
                {
                  <Comments
                    id_answer={item.id}
                  />
                }
              </InputComment>
            </WrapperAnswers>
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

      {/* Dialog Delete Intern*/}
      <Dialog
        fullWidth={true}
        open={openDeteleIntern}
        onClose={handleCloseDeleteIntern}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
      >
        <DialogTitle id="form-dialog-title">Detele Answer</DialogTitle>
        <DialogContent>
          Are you sure want to delete this answer
          <DialogActions>
            <Button onClick={handleCloseDeleteIntern} color="primary">
              Cancel
              </Button>
            <Button onClick={handleDeleteDataAnswerIntern} color="primary">
              Detele
              </Button>
          </DialogActions>

        </DialogContent>
      </Dialog>
    </Wrapper >
  )
}

const mapStateToProps = (state) => {
  return {
    // answers_assignment: state.assignment.assignments.data,
    answers_assignment: state.assignment.answers_assignment,
    answers: state.answer.answers,
    list_interns: state.mentor.interns_mentor,
  }
}

export default connect(mapStateToProps)(AnswersAssignment);

const Wrapper = styled.div``;
const InputAnswer = styled.div`
  margin: 10px 0;
  font-size: 16px;
  input {
    width: 80%;
    padding: 5px 10px;
    outline: none;
    border: 1px solid black;
    border-radius: 3px;
  }
`;
const InputComment = styled.div`
  margin: 10px 0 10px 70px;
  font-size: 16px;
`;

const WrapperAnswers = styled.div`
  margin: 10px 0 20px 20px;
`;
const Answers = styled.div`
  margin: 0;
  border: 1px solid #2271dd;
  padding: 5px 10px;
  background: white;
  border-radius: 5px;
  font-size: 16px;
  position: relative;
  p {
    margin: 0;
  }
  .link {
    border-top: 0.5px solid black;
  }
`;

// const IconEdit = styled(EditIcon)`
//   position: absolute;
//   top: 10%;
//   right: -30px;
//   font-size: 14px;
//   cursor: pointer;
//   &:hover{
//     color: #2271dd;
//   };
// `;
const IconDelete = styled(DeleteIcon)`
  position: absolute;
  font-size: 14px;
  top: 50%;
  right: -30px;
  cursor: pointer;
  &:hover{
    color: red;
  };
`;