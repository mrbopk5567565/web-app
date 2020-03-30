import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as commentConstants from '../../../redux/constants/commentConstants';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';

const Comments = (props) => {
  const [comment, setComment] = useState('')
  const { comment_answer } = props;

  useEffect(() => {
    props.dispatch({ type: commentConstants.LOAD_COMMENT_ANSWER_REQUEST, id_answer: props.id_answer })
  }, [comment])

  const handleDeteleComment = (item) => {
    props.dispatch({ type: commentConstants.DETELE_COMMENT_REQUEST, id: item.id })
  }

  const handleChangeComment = (e) => {
    setComment(e.target.value)
  }

  const keyPress = (e) => {
    if (e.keyCode == 13) {
      const profile = new FormData();
      profile.append('content', e.target.value)
      profile.append('answer_id', props.id_answer)
      props.dispatch({ type: commentConstants.POST_COMMENT_REQUEST, profile })
      setComment('')
    }
  }
  return (
    <Wrapper>
      {comment_answer && comment_answer.length !== 0 && comment_answer.map((item, idx) =>
        <CommentItem key={idx}>
          <div>{item.content}</div>
          <IconDetele onClick={() => handleDeteleComment(item)} />
        </CommentItem>
      )}
      <input
        id="comment"
        name="comment"
        placeholder="comment ..."
        type="text"
        onKeyDown={keyPress}
        onChange={handleChangeComment}
        value={comment}
      />
    </Wrapper>
  )
}

const mapStateToProps = (state) => {
  return {
    comment_answer: state.comment.comment_answer,
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
  div {
    border: 1px solid #2271dd;
    padding: 5px 10px;
    background: white;
    border-radius: 5px;
    font-size: 14px;
    margin: 0 0 5px 0;
  }
`;
const IconDetele = styled(DeleteIcon)`
  position: absolute;
  top: 50%;
  right: -30px;
  transform: translate(0 , -50%);
  cursor: pointer;
`;