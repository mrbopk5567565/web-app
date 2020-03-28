import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
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
import {
  CREATE_ASSIGNMENT_REQUEST,
  LOAD_ASSIGNMENTS_REQUEST
} from '../../../redux/constants/assignmentsConstants'


const CreateAssignment = (props) => {
  const [open, setOpen] = useState(false);
  const [hours, setHours] = useState(0)
  const [days, setDays] = useState(0)
  const [weeks, setWeeks] = useState(0)
  const [question, setQuestion] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState(false);
  const [page] = useState(0)
  useEffect(() => {
    // Show Hello name: 
    props.dispatch({ type: LOAD_USER_DETAIL_REQUEST })
  }, [])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitData = () => {
    if (question !== '' && description !== '') {
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
      props.dispatch({ type: CREATE_ASSIGNMENT_REQUEST, profile })
      props.dispatch({ type: LOAD_ASSIGNMENTS_REQUEST, page })
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
      <Wrapper onClick={handleClickOpen}>
        <Image>
          {props.user && props.user.image &&
            <img src={props.user.image.url !== null ? `${domain}${props.user.image.url}` : imageDefault} alt="image_personal" />
          }
        </Image>
        {props.user && <p>{`Hello ${props.user.name}`}<span>Let's create questions</span></p>}
      </Wrapper>

      {/* Dialog */}
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
      >
        <DialogTitle id="form-dialog-title">Create Question</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              id="question"
              name="question"
              label="Question"
              type="text"
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
                Create
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment >
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user_detail,
  }
}

export default connect(mapStateToProps)(CreateAssignment);

const Wrapper = styled.div`
  /*  distance between Create and Show Assignments */
  margin-bottom: 30px;
  width: 100%;
  height: 75px;
  background: #81d4fa;
  border-radius: 10px;
  display: flex;
  font-size: 16px;
  justify-content: center;
  color: #2271dd;
  cursor: pointer;
  font-weight: 500;
  p {
    display: flex;
    align-items: center;
    position: relative;
    &::after {
      content: ':)';
      position: absolute;
      top: 50%;
      left: 33%;
      transform: translate(0, -50%) rotate(90deg);
    }
    span {
      margin-left: 30px;
      padding: 8px;
      border: 1px solid #2271dd;
      border-radius: 16px;
      background: #2271dd;
      color: white;
    }
  }
`

const Image = styled.div`
  width: 60px;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  margin-right: 10px;
  img {
    border-radius: 50%;
    max-width: 100%;
  }
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