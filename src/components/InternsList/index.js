import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import * as mentorConstants from '../../redux/constants/mentorConstants';
import InternItem from './InternItem';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const InternsList = (props) => {
  const [page, setPage] = useState(1);
  const [totalpage, setTotalpage] = useState([]);
  // const []
  useEffect(() => {
    props.dispatch({ type: mentorConstants.LOAD_INTERNS_REQUEST, page })
  }, [page])

  const goPageDetail = () => {
    props.history.push('/mentor-home/interns-list/intern-detail/:id')
    // xử lý id, so sanh vs id ben detail ( call action de get data again)
  }

  useMemo(() => {
    if (props.page !== undefined) {
      const flag = [];
      for(let i = 1; i <= props.page.total_pages; i++){
        flag.push(i);
      }
      setTotalpage(flag)
    }
  }, [props])

  const SwapPagination = (item) => {
    setPage(item)
  }

  return(
    <React.Fragment>
      <Wrapper>
        <p>Profile Intern</p>
        <ListInterns>
          { props.list_intern && props.list_intern.map((item, idx) =>
            <InternItem
              key={idx}
              data={item}
              goPageDetail={ goPageDetail }
            />
          )}
        </ListInterns>
        <Pagination>
            { (props.page && props.page.total_pages && totalpage.length != 0) && totalpage.map((item, idx) =>
              <span key={idx} onClick={ () => SwapPagination(item) }>{ item }</span>
            )}
        </Pagination>
      </Wrapper>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return ({
    list_intern: state.mentor.list_interns.data,
    page: state.mentor.list_interns.metadata,
  })
}

export default connect(mapStateToProps)(InternsList);

const Wrapper = styled.div`
  p {
    text-transform: uppercase;
    color: red;
    letter-spacing: 1px;
    font-size: large;
    font-weight: 700;
  }
`;
const ListInterns = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Pagination = styled.div`
  span {
    padding: 5px;
    border: 1px solid black;
  }
`;
