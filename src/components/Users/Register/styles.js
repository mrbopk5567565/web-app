import { makeStyles, createStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import * as colors from '../../../utils/color';

const styles = makeStyles(() =>
  createStyles({
    registerForm: {
      display: 'flex',

    },
    registerAccount: {
      display: 'flex',
      flexDirection: 'column'
    },
    registerGeneral: {
      display: 'flex',
      flexDirection: 'column'
    },
    inputField: {
      // margin: '10px'
    },
  })
);

export const Errors = styled.p`
  color: ${colors.colorLogo};
  margin: 0px 0 10px 10px;
  position: relative;
  padding-left: 15px;

  &:before {
    content: '!';
    color: black;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 20px solid ${colors.colorLogo};
    z-index: 1;
    border-radius: 3px;
  }
`

export default styles;