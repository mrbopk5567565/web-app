import React, { useEffect } from 'react';
import * as internConstants from '../../redux/constants/internConstants';
import { connect } from 'react-redux';
import styles, { InfoItem } from './styles';
import * as userConstant from '../../redux/constants/userConstants';
import imageDefault from '../../images/no_image.jpg';
import { Input, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import moment from 'moment';
import { domain } from '../../utils/common'

const Mentor = (props) => {
  useEffect(() => {
    props.dispatch({ type: internConstants.LOAD_MENTOR_DETAIL_REQUEST })
  }, [])

  const classes = styles();

  return (
    <React.Fragment>
      <div className={ classes.profile }>
        <div className={ classes.editImage }>
          <input id="inputFile" type="file" accept="image/*"/>
        </div>
        <div className={ classes.image }>
          { props.mentor_detail && props.mentor_detail.image &&
            <img src={ props.mentor_detail.image.url !== null ? `${domain}${props.mentor_detail.image.url}` : imageDefault } alt="image_personal"/>
          }
        </div>
        { props.mentor_detail && 
          <div className={ classes.info }>
            <InfoItem className={ classes.infoItem }>{ `Name: ${ props.mentor_detail.name }` }</InfoItem>
            <InfoItem className={ classes.infoItem }>{ `Email: ${ props.mentor_detail.email } ` }</InfoItem>
            <InfoItem className={ classes.infoItem }>{ `DoB: ${ moment(props.mentor_detail.date_of_birth).format("DD/MM/YYYY") }` }</InfoItem>
            <InfoItem className={ classes.infoItem }>{ `Team: ${ props.mentor_detail.team }` }</InfoItem>
          </div>
        }
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    mentor_detail: state.intern.mentor_details,
  }
}

export default connect(mapStateToProps)(Mentor);