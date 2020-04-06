import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as commentConstants from '../../../redux/constants/commentConstants';
import styled, { keyframes } from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import CachedIcon from '@material-ui/icons/Cached';
import Time from '../AnswersAssignment/Time'

const Comments = (props) => {
  // const [comment, setComment] = useState('')
  const [showComment, setShowComment] = useState(false)
  const { comment_answer, id_answer, loading, user_id } = props;
  const [role] = useState(localStorage.getItem('role'))

  // useEffect(() => {
  //   // props.dispatch({ type: commentConstants.LOAD_COMMENT_ANSWER_REQUEST, id_answer: id_answer })
  // }, [comment, showComment])

  const handleShowComment = () => {
    props.dispatch({ type: commentConstants.LOAD_COMMENT_ANSWER_REQUEST, id_answer: id_answer })
    setShowComment(!showComment)
  }

  const handleDeteleComment = (item) => {
    props.dispatch({ type: commentConstants.DETELE_COMMENT_REQUEST, id: item.id, id_answer })
  }

  // const handleChangeComment = (e) => {
  //   setComment(e.target.value)
  // }

  const keyPress = (e) => {
    if (e.keyCode == 13) {
      const profile = new FormData();
      profile.append('content', e.target.value)
      profile.append('answer_id', props.id_answer)
      props.dispatch({ type: commentConstants.POST_COMMENT_REQUEST, profile })
      e.target.value = ''
    }
  }

  return (
    <Wrapper>
      <div className="btnComment" onClick={handleShowComment}>Comment</div>

      {comment_answer && comment_answer[id_answer] && showComment &&
        comment_answer[id_answer].map((item, idx) => {
          if (id_answer === item.answer_id) {
            return (
              <CommentItem key={idx}>
                <div className="user">{`${item.user.name}`}</div>
                <div>{item.content}</div>
                {role === "mentor" &&
                  <IconDetele onClick={() => handleDeteleComment(item, id_answer)} />
                }
                {role === "intern" && item.user.id === user_id.id &&
                  <IconDetele onClick={() => handleDeteleComment(item, id_answer)} />
                }
                <Time
                  time_update={item.updated_at}
                />
              </CommentItem>
            )
          }
        }
        )
      }
      {loading && showComment &&
        <WrapperIconLoading>
          <LoadingIcon />
        </WrapperIconLoading>
      }

      {showComment &&
        <input
          id="comment"
          name="comment"
          placeholder="comment ..."
          type="text"
          onKeyDown={keyPress}
        // onChange={handleChangeComment}
        // value={comment}
        />
      }
    </Wrapper>
  )
}

const mapStateToProps = (state) => {
  return {
    comment_answer: state.comment.comment_answer,
    loading: state.comment.loading,
    user_id: state.user.user_detail,
  }
}

export default connect(mapStateToProps)(Comments);

const Wrapper = styled.div`
  input {
    margin: 0 0 5px 0;
    width: 100%;
    padding: 5px 10px;
    outline: none;
    border: 1px solid black;
    border-radius: 3px;
  }
`;
const CommentItem = styled.div`
  position: relative;
  border: 1px solid #2271dd;
  padding: 5px 10px;
  background: white;
  border-radius: 5px;
  font-size: 14px;
  margin: 0 0 25px 0;
  .user {
    border-bottom: 0.5px solid black;
    margin: 0 0 5px 0;
  }
  /* .mentor {
    border-bottom: 0.5px solid black;
    margin: 0 0 5px 0;
    color: red;
  } */
  div {
    
  }
`;
const IconDetele = styled(DeleteIcon)`
  position: absolute;
  top: 50%;
  right: -30px;
  font-size: 14px;
  transform: translate(0 , -50%);
  cursor: pointer;
  &:hover{
    color: red;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const WrapperIconLoading = styled.div`
  text-align: center;
`;

const LoadingIcon = styled(CachedIcon)`
  color: #2271dd;
  animation: ${rotate} 2s linear infinite;
`;

