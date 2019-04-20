import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatter } from '../Services/document-formatter';

class BlogArticle extends Component {
  componentDidMount(){
    window.Prism.highlightAll();
  }
  componentDidUpdate(prevProps){
    if(prevProps.article !== this.props.article){
      window.Prism.highlightAll();
    }
  }
  render() {
    return (
      <div>
        {this.props.article ? formatter(this.props.article, this.props.metaData) : undefined}
      </div>
    );
  }
}

BlogArticle.propTypes = {
  article: PropTypes.string,
  collapsible: PropTypes.bool,
  metaData: PropTypes.object
};
BlogArticle.defaultProps = {
  collapsible: true
};

export default BlogArticle;
