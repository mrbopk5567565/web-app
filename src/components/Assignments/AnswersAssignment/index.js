import React, { useEffect, useState, useMemo } from 'react';
import * as assignmentsConstants from '../../../redux/constants/assignmentsConstants';
import styled from 'styled-components';
import { connect } from 'react-redux';
// import { useForm } from 'react-hook-form';
import Comments from '../Comments'

const AnswersAssignment = (props) => {
  const [role] = useState(localStorage.getItem('role'))
  const { id_assignment, answers_assignment } = props;
  const [showComment, setShowComment] = useState(false)
  const [answer, setAnswer] = useState('')

  // const { handleSubmit } = useForm()

  // const [id_user, setId_user] = useState(0);
  // const onSubmit = (data) => {
  //   console.log('adad', data)
  // }
  const handleShowComment = () => {
    setShowComment(!showComment)
  }
  const handleChange = (e) => {
    switch (e.target.name) {
      case 'answer':
        setAnswer(e.target.value);
        break;
      default:
        break;
    }
  }

  const keyPress = (e) => {
    if (e.keyCode == 13) {
      console.log('asd', e.target.value)
      // const profile = new FormData();
      // profile.append('content', e.target.value)
      // profile.append('answer_id')
    }
  }

  return (
    <Wrapper>
      {role === "mentor" &&
        <InputAnswer>
          <label htmlFor="answer">Answers: </label>
          <input
            id="answer"
            name="answer"
            placeholder="answer ..."
            type="text"
            // onChange={handleChange}
            onKeyDown={keyPress}
          />
        </InputAnswer>
      }
      {answers_assignment && answers_assignment.length != 0 && answers_assignment.map((item1) =>
        item1.map((item2, idx2) => {
          if (item2.assignment_id === id_assignment) {
            return (
              <WrapperAnswers key={idx2}>
                <Answers>
                  <p>{`#${item2.user_id}`}</p>
                  <p className="link">
                    {item2.link}
                  </p>
                </Answers>
                <div className="btnComment" onClick={handleShowComment}>Comment</div>
                {showComment &&
                  <div>
                    <InputComment>
                      {
                        <Comments
                          id_answer={item2.id}
                        />
                      }
                    </InputComment>
                  </div>
                }
              </WrapperAnswers>
            )
          }
        })
      )}

    </Wrapper>
  )
}

const mapStateToProps = (state) => {
  return {
    answers_assignment: state.assignment.answers_assignment,
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
  .btnComment {
    margin: 10px 0 0 0 ;
    text-align: end;
    color: #2271dd;
    font-size: 14px;
    cursor: pointer;
  }
`;
const Answers = styled.div`
  margin: 0;
  border: 1px solid #2271dd;
  padding: 5px 10px;
  background: white;
  border-radius: 5px;
  font-size: 16px;
  p {
    margin: 0;
  }
  .link {
    border-top: 0.5px solid black;
  }
`;