import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import * as answerConstants from '../../../../redux/constants/answerConstants';

const EditAnwer = (props) => {
  const { id_answer, link } = props;
  const [showInputEditAnswer, setShowInputEditAnswer] = useState(false);

  // Edit answer
  const keyPressEdit = (e) => {
    if (e.keyCode === 13) {
      const profile = new FormData();
      profile.append('link', e.target.value)
      // profile.append('id', id_answer)
      props.dispatch({
        type: answerConstants.EDIT_ANSWER_REQUEST,
        profile, id_answer,
        link: e.target.value
      })
      e.target.value = '';
      setShowInputEditAnswer(false)
    }
  }

  // show input edit answer
  const handleEditAnswer = () => {
    setShowInputEditAnswer(!showInputEditAnswer)
  }

  return (
    <div>
      <IconEdit onClick={() => handleEditAnswer()} />
      {showInputEditAnswer &&
        <InputEditAnswer>
          <label htmlFor="edit">Edit: </label>
          <input
            id="edit"
            name="edit"
            placeholder="edit ..."
            type="text"
            defaultValue={link}
            // onChange={handleChange}
            onKeyDown={keyPressEdit}
          />
        </InputEditAnswer>
      }
    </div>
  )
}

export default connect()(EditAnwer);

const InputEditAnswer = styled.div`
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

const IconEdit = styled(EditIcon)`
  position: absolute;
  top: 10%;
  right: -30px;
  font-size: 14px;
  cursor: pointer;
  &:hover{
    color: #2271dd;
  };
`;