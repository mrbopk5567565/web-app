import React, { useState, useEffect, useMemo } from 'react';
import styles, { InfoItem } from './styles';
import { connect } from 'react-redux';
import { domain } from '../../../utils/common';
import imageDefault from '../../../images/no_image.jpg';
import moment from 'moment';
import { LOAD_INTERNS_REQUEST } from '../../../redux/constants/mentorConstants';
import { ANSWER_INTERN_BY_MENTOR_REQUEST } from '../../../redux/constants/answerConstants'
import { ConvertSecToDay } from '../../../utils/common';
import styled from 'styled-components';
import AnswerInternDetail from './AnswerInternDetail'

const InternDetail = (props) => {
  const [id] = useState(props.match.params.id);
  const [page] = useState(props.match.params.page);
  useEffect(() => {
    props.dispatch({ type: LOAD_INTERNS_REQUEST, page, id })
    props.dispatch({ type: ANSWER_INTERN_BY_MENTOR_REQUEST, id_intern: id })
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
      // return (((now - convert_start_date) / twoMonth) * 100).toFixed(2);
      // return ConvertSecToDay(now - convert_start_date)
      return {
        percent: (((now - convert_start_date) / twoMonth) * 100).toFixed(2),
        show: ConvertSecToDay(now - convert_start_date)
      }
    } else {
      return {
        percent: 100,
        show: `60 days`
      }
    }
  }

  const Average = () => {
    if (props.answer_intern_detail.data !== undefined) {
      var count = 0
      var average = 0;
      props.answer_intern_detail.data.map(item => {
        if (item.completed === true) {
          average += item.mark
          count += 1;
        }
      })
      console.log('123', count / props.answer_intern_detail.data.length)
      return {
        width: (count / props.answer_intern_detail.data.length) * 100,
        show: `${count} / ${props.answer_intern_detail.data.length} approved ; Average: ${(average / count).toFixed(2)}`
      };
    }
  }

  return (
    <Wrapper>
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
              <div className={classes.timeline_reach} style={{ width: `${TimeLineFinishDay().percent}%` }}></div>
              <div className={classes.timeline_show}>{`${TimeLineFinishDay().show}`}</div>
            </div>
          </div>
        }
        {props.answer_intern_detail.data &&
          <div className={classes.wrapperAverage}>
            <div className={classes.average}>
              <div className={classes.average_total}></div>
              <div className={classes.average_reach} style={{ width: `${Average().width}%` }}></div>
              <div className={classes.average_show}>{`${Average().show}`}</div>
            </div>
          </div>
        }
      </div>
      <WrapperAnswerAssignment>
        {props.answer_intern_detail.data &&
          <AnswerInternDetail
            data={props.answer_intern_detail.data}
          />
        }
      </WrapperAnswerAssignment>
    </Wrapper>
  )
}

const mapStateToProps = (state) => {
  return {
    data_detail: state.mentor.intern_detail,
    answer_intern_detail: state.answer.answer_intern,
  }
}

export default connect(mapStateToProps)(InternDetail);

const Wrapper = styled.div`
  display: flex;
`

const WrapperAnswerAssignment = styled.div`
  display: inline-block;
  width: calc(100% - 550px);
  margin-left: 5px;
`;