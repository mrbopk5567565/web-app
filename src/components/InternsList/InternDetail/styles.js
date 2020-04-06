import { makeStyles, createStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { randomColor } from '../../../utils/common';
import { colorLogo } from '../../../utils/color'

const styles = makeStyles(() =>
  createStyles({
    profile: {
      cursor: 'pointer',
      display: 'flex',
      position: "relative",
      alignItems: 'center',
      width: '550px',
      padding: '20px 10px 40px 10px',
      border: `1px solid #00cec9`,
      borderRadius: '5px',
      margin: '5px',
      transition: '0.3s',
      position: 'relative',
    },
    wrapperTimeline: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '100%',
      height: '100%',
    },
    timeline: {
      width: '100%',
      height: '100%',
      position: 'relative',
    },
    timeline_total: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '100%',
      background: '#ecf0f1',
      // zIndex: '-1',
      borderRadius: '5px',
      height: '20px',
    },
    timeline_reach: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      background: '#00bdbd',
      zIndex: '1',
      borderRadius: '5px',
      height: '20px',
    },
    timeline_show: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '100%',
      zIndex: '2',
      borderRadius: '5px',
      height: '20px',
      textAlign: 'center',
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
      borderLeft: `1px solid ${colorLogo}`,
      marginLeft: '20px',
    },
    infoItem: {
      margin: '30px 0 10px 0',
      position: 'relative',
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