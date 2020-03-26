import React from 'react';
import styles, { InfoItem, Profile } from './styles';
import { connect } from 'react-redux';
import { domain } from '../../../utils/common';
import imageDefault from '../../../images/no_image.jpg';
import moment from 'moment';

const InternItem = (props) => {

  const classes = styles();
  return(
    <React.Fragment>
      <Profile className={ classes.profile } onClick={ props.goPageDetail }>
        <div className={ classes.editImage }>
          <input id="inputFile" type="file" accept="image/*"/>
        </div>
        <div className={ classes.image }>
          { props.data &&
            <img src={ props.data.image.url !== null ? `${domain}${props.data.image.url}` : imageDefault } alt="image_personal"/>
          }
        </div>
        { props.data && 
          <div className={ classes.info }>
            <InfoItem className={ classes.infoItem }>{ `Name: ${ props.data.name }` }</InfoItem>
            <InfoItem className={ classes.infoItem }>{ `Email: ${ props.data.email } ` }</InfoItem>
            <InfoItem className={ classes.infoItem }>{ `School: ${ props.data.school ? props.data.school : "school of life"}` }</InfoItem>
            <InfoItem className={ classes.infoItem }>{ `Start day: ${ moment(props.data.start_day).format("DD/MM/YYYY") }` }</InfoItem>
          </div>
        }
    </Profile>
  </React.Fragment>
  )
}

export default connect()(InternItem);