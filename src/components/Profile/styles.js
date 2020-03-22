import { makeStyles, createStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { randomColor } from '../../utils/common';
import { colorLogo } from '../../utils/color'

const styles = makeStyles(() => 
  createStyles({
    profile: {
      display: 'flex',
      position: "relative",
    },
    editImage: {
      position: "absolute",
      top: '75%',
      '& input': {
        fontSize: '12px',
        display: 'none',
      }
    },
    image: {
      width: '150px',
      height: '150px',
      border: '1px solid red',
      borderRadius: '50%',
      '& img': {
        maxWidth: '100%',
        height: '100%',
        borderRadius: '50%'
      }
    },
    info: {
      padding: '0 0 0 50px',
      borderLeft: '1px solid black',
      marginLeft: '60px',
    },
    infoItem: {
      margin: '30px 0 10px 0',
      position: 'relative',

      // '&::before': {
      //   content: '',
      //   position: 'absolute',
      //   top: '0',
      //   left: '0',
      //   width: '10px',
      //   height: '10px',
      //   borderRadius: '50%',
      //   background: 'red',
      // },
    },
    buttonChange: {
      color: `${colorLogo}`,
      marginRight: '20px',
    },
  })
)

export const InfoItem = styled.div`
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    width: 30px;
    height: 30px;
    left: -65px;
    border-radius: 50%;
    background: ${randomColor};
    transform: translate(0, -50%);
    z-index: 1;
  }
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 50px;
    height: 1px;
    left: -50px;
    border-radius: 50%;
    background: ${randomColor};
    transform: translate(-10%, -50%);
    z-index: -1;
  }
`;

export default styles;