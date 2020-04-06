import React, { useState, useEffect } from 'react';
import styles, { InfoItem } from './styles';
import { connect } from 'react-redux';
import { domain } from '../../../utils/common';
import imageDefault from '../../../images/no_image.jpg';
import moment from 'moment';
import { LOAD_INTERNS_REQUEST } from '../../../redux/constants/mentorConstants';

const InternDetail = (props) => {
  const [id] = useState(props.match.params.id);
  const [page] = useState(props.match.params.page);
  useEffect(() => {
    props.dispatch({ type: LOAD_INTERNS_REQUEST, page, id })
  }, [])

  const classes = styles();
  return (
    <React.Fragment>
      <div className={classes.profile} onClick={props.goPageDetail}>
        <div className={classes.editImage}>
          <input id="inputFile" type="file" accept="image/*" />
        </div>
        <div className={classes.image}>
          {props.data_detail && props.data_detail.image &&
            <img src={props.data_detail.image.url !== null ? `${domain}${props.data_detail.image.url}` : imageDefault} alt="image_personal" />
          }
        </div>
        {props.data_detail &&
          <div className={classes.info}>
            <InfoItem className={classes.infoItem}>{`Name: ${props.data_detail.name}`}</InfoItem>
            <InfoItem className={classes.infoItem}>{`Email: ${props.data_detail.email} `}</InfoItem>
            <InfoItem className={classes.infoItem}>{`School: ${props.data_detail.school ? props.data_detail.school : "school of life"}`}</InfoItem>
            <InfoItem className={classes.infoItem}>{`Start day: ${moment(props.data_detail.start_day).format("DD/MM/YYYY")}`}</InfoItem>
          </div>
        }
        {/* <div className={classes.timeline}>123</div> */}
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    data_detail: state.mentor.intern_detail,
  }
}

export default connect(mapStateToProps)(InternDetail);