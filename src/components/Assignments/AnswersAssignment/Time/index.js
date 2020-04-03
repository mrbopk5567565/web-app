import React from 'react';
import moment from 'moment';
import styled from 'styled-components'

const Time = (props) => {
  const { time_update } = props
  return (
    <Wrapper>
      {/* {moment(time_update.toString(), "YYYYMMDD").fromNow()}
      <br />
      {moment(time_update.toString(), "h:mm:ss").fromNow()}
      <br /> */}
      {moment(time_update).startOf('second').fromNow()}
    </Wrapper>
  )
}

export default Time;

const Wrapper = styled.div`
  font-size: 12px;
  position: absolute;
  bottom: -20px;
  left: 10px;
  color: #2c3e50;
`;
