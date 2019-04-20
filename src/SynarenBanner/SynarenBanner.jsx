import React from 'react';
import { Banner } from './SynarenBanner.styles';
import { Link } from 'react-router-dom'
const SynarenBanner = _ => (
  <Banner className="banner primary-color">
    <div style={{margin:"auto",maxWidth:"800px"}}>
      <Link to="/blog/" className="uk-link-heading uk-link-reset">
        Synaren Blog
      </Link>
    </div>
  </Banner>
)
SynarenBanner.propTypes = {};
SynarenBanner.defaultProps = {};

export default SynarenBanner;
