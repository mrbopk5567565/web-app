import React, { useState, useEffect, useMemo } from 'react';
import styles , { InfoItem } from './styles';
import { connect } from 'react-redux';
import { domain } from '../../../utils/common';
import imageDefault from '../../../images/no_image.jpg';
import moment from 'moment';
import { LOAD_INTERNS_REQUEST } from '../../../redux/constants/mentorConstants';

const InternDetail = (props) => {
  const [ id ] = useState(props.match.params.id);
  const [ page ] = useState(props.match.params.page);
  const [ item, setItem ] = useState({})
  useEffect(() => {
    props.dispatch({ type: LOAD_INTERNS_REQUEST, page })
    const handleData = () => {
      if (props.data_page.data !== undefined ){
        const data = props.data_page.data;
        return data.filter(data => data => data.id == id)[0]
      }
    }
    setItem(handleData())
  }, [item])

  const classes = styles();
  return(
    <React.Fragment>
      <div className={ classes.profile } onClick={ props.goPageDetail }>
        <div className={ classes.editImage }>
          <input id="inputFile" type="file" accept="image/*"/>
        </div>
        <div className={ classes.image }>
          { item !== undefined && item.image &&
            <img src={ item.image.url !== null ? `${domain}${item.image.url}` : imageDefault } alt="image_personal"/>
          }
          {/* { props.data &&
            <img src={ props.data.image.url !== null ? `${domain}${props.data.image.url}` : imageDefault } alt="image_personal"/>
          } */}
        </div>
        { item !== undefined  && 
          <div className={ classes.info }>
            <InfoItem className={ classes.infoItem }>{ `Name: ${ item.name }` }</InfoItem>
            <InfoItem className={ classes.infoItem }>{ `Email: ${ item.email } ` }</InfoItem>
            <InfoItem className={ classes.infoItem }>{ `School: ${ item.school ? item.school : "school of life"}` }</InfoItem>
            <InfoItem className={ classes.infoItem }>{ `Start day: ${ moment(item.start_day).format("DD/MM/YYYY") }` }</InfoItem>
          </div>
        }
    </div>
  </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    data_page: state.mentor.list_interns,
  }
}

export default connect(mapStateToProps)(InternDetail);