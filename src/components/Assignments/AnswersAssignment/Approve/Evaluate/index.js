import React from 'react';
import * as answerConstant from '../../../../../redux/constants/answerConstants';
import { connect } from 'react-redux';

const Evaluate = (props) => {
  const { id_answer } = props
  const keyPress = (e) => {
    if (e.keyCode == 13) {
      const profile = new FormData();
      profile.append('evaluate', e.target.value)
      props.dispatch({
        type: answerConstant.PUT_MARK_REQUEST,
        id_answer: id_answer,
        profile,
        evaluate: e.target.value,
      })
      e.target.value = ''
    }
  }
  return (
    <React.Fragment>
      <input
        id="evaluate"
        name="evaluate"
        placeholder="evaluate ..."
        type="text"
        onKeyDown={keyPress}
      />
    </React.Fragment>
  )
}

export default connect()(Evaluate)