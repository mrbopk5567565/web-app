import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import * as mentorConstants from '../../redux/constants/mentorConstants';
import InternItem from './InternItem';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LoadingPage from '../LoadingPage'

const InternsList = (props) => {
  const [id, setId] = useState(0);
  const [page, setPage] = useState(1);
  const [totalpage, setTotalpage] = useState([]);
  useEffect(() => {
    props.dispatch({ type: mentorConstants.LOAD_INTERNS_REQUEST, page })

    if (id !== 0){
      props.history.push(`/mentor-home/interns-list/intern-detail/${page}/${id}`)
    }
  }, [page, id])

  // xử lý id, so sanh vs id ben detail ( call action de get data again)
  // xử lý page, theo localStore

  useMemo(() => {
    if (props.page !== undefined) {
      const flag = [];
      for(let i = 1; i <= props.page.total_pages; i++){
        flag.push(i);
      }
      setTotalpage(flag)
    }
  }, [props])

  const SwapPagination = (page) => {
    setPage(page)
    window.scrollTo(0,0)
  }

  console.log('123', props.loading_page)

  return(
    <React.Fragment>
      <Wrapper>
        <p>Profile Intern</p>
        { props.loading === true &&
          <LoadingPage/>
        }
        <ListInterns>
          { props.list_intern && props.list_intern.map((item, idx) =>
            <InternItem
              key={idx}
              data={item}
              goPageDetail={ () => setId(item.id) /*, () => goPageDetail(item.id)*/ }
            />
          )}
        </ListInterns>
        <Pagination>
            { (props.page && props.page.total_pages && totalpage.length != 0) && totalpage.map((page, idx) =>
              <button key={idx} onClick={ () => SwapPagination(page) }>{ page }</button>
            )}
        </Pagination>
        { props.loading === true &&
          <LoadingPage/>
        }
      </Wrapper>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return ({
    list_intern: state.mentor.list_interns.data,
    page: state.mentor.list_interns.metadata,
    loading: state.mentor.loading_page,
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
  text-align: center;
  margin: 30px auto;
  button {
    font-size: 18px;
    margin: 0 2px; 
    cursor: pointer;
    padding 10px 15px;
    border: 1px solid #8e44ad;
    border-radius: 5px;
  }
`;
