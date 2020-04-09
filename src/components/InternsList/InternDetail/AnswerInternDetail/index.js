import React from 'react';
import styled from 'styled-components';
import Comments from '../../../Assignments/Comments';
import Approve from '../../../Assignments/AnswersAssignment/Approve';
import { device } from '../../../../utils/device';

const AnswerInternDetail = (props) => {
  const { data } = props
  return (
    <Wrapper>
      {data && data.map((item, idx) => {
        if (item.assignment !== null) {
          return (
            <WrapperAnswerIntern key={idx}>
              <Assignment>
                <IdAssingment>{`# ${item.assignment.id}`}</IdAssingment>
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
    </Wrapper>
  )
}

export default AnswerInternDetail;

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
`;

const IdAssingment = styled.div``;

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
