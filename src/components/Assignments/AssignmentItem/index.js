import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as assignmentsConstants from '../../../redux/constants/assignmentsConstants';
import { LOAD_USER_DETAIL_REQUEST } from '../../../redux/constants/userConstants'
import imageDefault from '../../../images/no_image.jpg';
import { domain } from '../../../utils/common';
import TextField from '@material-ui/core/TextField';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@material-ui/core';
import * as colors from '../../../utils/color';

const AssignmentItem = (props) => {
  const [open, setOpen] = useState(false);
  const [hours, setHours] = useState(0)
  const [days, setDays] = useState(0)
  const [weeks, setWeeks] = useState(0)
  const [question, setQuestion] = useState(props.item.question)
  const [description, setDescription] = useState(props.item.description)
  const [errors, setErrors] = useState(false)
  useEffect(() => {
    // props.dispatch({ type: LOAD_USER_DETAIL_REQUEST })
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitData = () => {
    if (question !== '') {
      const profile = new FormData();
      profile.append('question', question)
      profile.append('description', description)
      if (hours !== 0) {
        profile.append('hours', hours)
      }
      if (days !== 0) {
        profile.append('days', days)
      }
      if (weeks !== 0) {
        profile.append('weeks', weeks)
      }
      // props.dispatch({ type: CREATE_ASSIGNMENT_REQUEST, profile })
      setErrors(false);
      setOpen(false);
    } else {
      setErrors(true);
    }
  }

  const handleChange = (e) => {
    switch (e.target.name) {
      case 'Hours':
        setHours(e.target.value);
        break;
      case 'Days':
        setDays(e.target.value);
        break;
      case 'Weeks':
        setWeeks(e.target.value);
        break;
      case 'question':
        setQuestion(e.target.value);
        break;
      case 'description':
        setDescription(e.target.value);
        break;
      default:
        break;
    }
  }

  return (
    <React.Fragment>
      <Wrapper>
        <span onClick={handleClickOpen}>Edit</span>
        <Id>
          <p>{`#${props.item.id}`}</p>
        </Id>
        <Question>
          <div className="question">{props.item.question}</div>
          <InfoQuestion>
            <p>{`Estimation: ${props.item.estimation}`}</p>
            <p>{`Team: ${props.item.team}`}</p>
          </InfoQuestion>
          <Description>
            {`Description: ${props.item.description}`}
          </Description>
        </Question>
      </Wrapper>

      {/* Dialog */}
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
      >
        <DialogTitle id="form-dialog-title">Edit Question</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              id="question"
              name="question"
              label="Question"
              type="text"
              value={question}
              onChange={handleChange}
              fullWidth
            />
            {errors && <Errors>Required</Errors>}
            <TextField
              margin="dense"
              name="description"
              id="description"
              label="Description"
              type="text"
              value={description}
              onChange={handleChange}
              fullWidth
            />
            {errors && <Errors>Required</Errors>}
            <SelectOption>
              {dataSelect &&
                dataSelect.map((item, idx) =>
                  <div key={idx}>
                    <label className="label">{item.label}</label>
                    <select id={item.label} name={item.label} onChange={handleChange}>
                      {item.value.map((itemoption, idx) =>
                        <option
                          value={itemoption}
                          key={idx}
                        >
                          {itemoption}
                        </option>
                      )}
                    </select>
                  </div>
                )
              }
            </SelectOption>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmitData} color="primary">
                Edit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default connect()(AssignmentItem);

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: 500;
  background: #81d4fa;
  padding: 10px 50px 10px 20px;
  border-radius: 10px;
  position: relative;
  span {
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
  }
  span:hover {
    color: #2271dd;
  }
`;
const Id = styled.div`
  display: flex;
  margin-right: 20px;
  align-items: center;
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    /* padding: 10px; */
    border-radius: 50%;
    background: #2271dd;
    color: white;
  };
`;
const Question = styled.div`
  color: white;
  .question {
    padding: 8px;
    border-radius: 16px;
    background: #2271dd;
    margin: 5px 0; 
  };
  
`;
const InfoQuestion = styled.div`
  display: flex;
  margin: 5px 0;
  p {
    padding: 8px;
    border-radius: 16px;
    background: #2271dd;
    margin: 0px;
    margin-right: 10px;
  }
`;
const Description = styled.div`
  margin: 5px 0;
  width: 100%;
  padding: 8px;
  border-radius: 16px;
  background: #2271dd;
`;

const SelectOption = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: space-between;

  label {
    margin-right: 5px;
  }
`;

const Errors = styled.p`
  color: ${colors.colorLogo};
  margin: 0px 0 10px 10px;
  position: relative;
  padding-left: 15px;

  &:before {
    content: '!';
    color: black;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 20px solid ${colors.colorLogo};
    z-index: 1;
    border-radius: 3px;
  }
`

const dataSelect = [
  {
    label: "Hours",
    value: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    label: "Days",
    value: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    label: "Weeks",
    value: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
]