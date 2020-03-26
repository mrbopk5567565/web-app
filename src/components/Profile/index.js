import React, { useState, useEffect, memo } from 'react';
import styles, { InfoItem } from './styles';
import { connect } from 'react-redux';
import * as userConstant from '../../redux/constants/userConstants';
import imageDefault from '../../images/no_image.jpg';
import { Input, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import moment from 'moment';
import { domain } from '../../utils/common'

const Profile = memo((props) => {
  const [isShowBtnChange, setIsShowBtnChange] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [name, setName] = useState('');
  const [dayOfBirth, setDayOfBirth] = useState('');
  const [image, setImage] = useState([]);
  useEffect(() => {
    props.dispatch({ type: userConstant.LOAD_USER_DETAIL_REQUEST })

    const profile = new FormData();
    if (image.length !== 0) {
      profile.append('image', image[0])
      props.dispatch({ type: userConstant.UPDATE_USER_DETAIL_REQUEST, profile })
    }

  }, [image])
  const classes = styles();

  const showInput = () => {
    setName(props.user_detail.name)
    setDayOfBirth(moment(props.user_detail.date_of_birth).format("DD/MM/YYYY"))
    setIsShowBtnChange(!isShowBtnChange)
  }

  const saveInfo = () => {
    setDialog(true)
  }

  const handleCloseDialog = () => {
    setDialog(false);
  }

  const handleDialogUpdate = () => {
    const profile = new FormData();
    profile.append('name', name)
    profile.append('date_of_birth', dayOfBirth)

    props.dispatch({ type: userConstant.UPDATE_USER_DETAIL_REQUEST, profile })
    setDialog(false);
    setIsShowBtnChange(false)
  }

  const changeInfo = (e) => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'dayofbirth':
        setDayOfBirth(e.target.value);
        break;
      default:
        break;
    }
  }

  const handleImage = (e) => {
    setImage(e.target.files)
  }

  const handleChangeImage = () => {
    const thinh = document.getElementById('inputFile');
    thinh.click();
  }

  return (
    <React.Fragment>
      <div className={classes.profile}>
        <div className={classes.editImage}>
          <input id="inputFile" onChange={handleImage} type="file" accept="image/*" />
        </div>
        <div onClick={handleChangeImage} className={classes.image}>
          {props.user_detail && props.user_detail.image &&
            <img src={props.user_detail.image.url !== null ? `${domain}${props.user_detail.image.url}` : imageDefault} alt="image_personal" />
          }
        </div>
        {props.user_detail &&
          <div className={classes.info}>
            <Button variant="outlined" className={classes.buttonChange} onClick={showInput}>EDIT</Button>
            {isShowBtnChange &&
              <Button variant="outlined" className={classes.buttonChange} onClick={saveInfo}>SAVE</Button>
            }

            {/* Dialog */}
            <Dialog
              open={dialog}
              onClose={handleCloseDialog}
            >
              <DialogTitle>Nofication !</DialogTitle>
              <DialogContent>
                Do you want change your profile ?
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  Disagree
                </Button>
                <Button onClick={handleDialogUpdate} color="primary">
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
            {/* Dialog */}

            <InfoItem className={classes.infoItem}>{`Name: ${props.user_detail.name}`}</InfoItem>
            {(isShowBtnChange) &&
              <Input
                fullWidth={true}
                // defaultValue={ props.user_detail.data.name }
                value={name}
                onChange={changeInfo}
                placeholder="Edit name: "
                name="name"
              />
            }
            <InfoItem className={classes.infoItem}>{`Email: ${props.user_detail.email} `}</InfoItem>
            <InfoItem className={classes.infoItem}>{`DoB: ${moment(props.user_detail.date_of_birth).format("DD/MM/YYYY")}`}</InfoItem>
            {isShowBtnChange &&
              <Input
                fullWidth={true}
                value={dayOfBirth}
                onChange={changeInfo}
                placeholder="Edit DoB: "
                name="dayofbirth"
              />
            }
            <InfoItem className={classes.infoItem}>{`Team: ${props.user_detail.team}`}</InfoItem>
          </div>
        }
      </div>
    </React.Fragment>
  )
})

const mapStateToProps = (state) => {
  return {
    user_detail: state.user.user_detail,
  }
}

export default connect(mapStateToProps)(Profile);