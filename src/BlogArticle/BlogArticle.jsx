import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatter } from '../Sevices/document-formatter';

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
        {this.props.article ? formatter(this.props.article) : undefined}
      </div>
    );
  }
}

BlogArticle.propTypes = {
  article: PropTypes.string
};
BlogArticle.defaultProps = {};

export default BlogArticle;
