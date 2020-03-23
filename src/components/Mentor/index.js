import React, { useEffect } from 'react';
import * as internConstants from '../../redux/constants/internConstants';
import { connect } from 'react-redux'

const Mentor = (props) => {
  useEffect(() => {
    props.dispatch({ type: internConstants.LOAD_MENTOR_DETAIL_REQUEST })
  }, [])
  return (
    <div>
      Mentor
    </div>
  )
}

export default connect()(Mentor);