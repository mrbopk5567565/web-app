import React, { useState, useEffect, useMemo } from 'react';
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

  const FinishDay = () => {
    const start_date = new Date(props.data_detail.start_date)
    const convert_start_date = start_date.getTime() / 1000.0;
    const twoMonth = 5270400;
    const finishDay = convert_start_date + twoMonth;

    return moment(finishDay * 1000).format("DD/MM/YYYY")
  }

  const TimeLineFinishDay = () => {
    const start_date = new Date(props.data_detail.start_date)
    const convert_start_date = start_date.getTime() / 1000.0;
    const twoMonth = 5270400;
    const finishDay = convert_start_date + twoMonth;
    const now = Math.floor(new Date().getTime() / 1000.0)
    if (finishDay > now) {
      return (((now - convert_start_date) / twoMonth) * 100).toFixed(2);
    } else {
      return 100;
    }
  }

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
            <InfoItem className={classes.infoItem}>{`Start day: ${moment(props.data_detail.start_date).format("DD/MM/YYYY")}`}</InfoItem>
            <InfoItem className={classes.infoItem}>{`Finish day: ${FinishDay()}`}</InfoItem>
          </div>
        }
        {props.data_detail &&
          <div className={classes.wrapperTimeline}>
            <div className={classes.timeline}>
              <div className={classes.timeline_total}></div>
              <div className={classes.timeline_reach} style={{ width: `${TimeLineFinishDay()}%` }}></div>
              <div className={classes.timeline_show}>{`${TimeLineFinishDay()}%`}</div>
            </div>
          </div>
        }
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