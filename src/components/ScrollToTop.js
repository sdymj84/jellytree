import { useEffect } from 'react'
import { withRouter } from "react-router-dom";

const ScrollToTop = ({ children, location: { pathname } }) => {
  console.log(children, pathname)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children || null;
}

export default withRouter(ScrollToTop)
