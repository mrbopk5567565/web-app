import React from 'react';
import styles from './styles';
import './LoadingPage.css'

const LoadingPage = () => {
  const classes = styles();
  return(
    <div className={ classes.body }>
      <span className={ `${classes.loader} loader` }>
        <span className={ `${classes.loaderInner} loaderInner` }>asd</span>
      </span>
    </div>
    // <div className="wrapper">
    //   <span className="loader">
    //     <span className="loader-inner"></span>
    //   </span>
    // </div>
  )
}

export default LoadingPage;