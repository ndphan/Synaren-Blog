import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ArticleItem, ArticleTrigger, ArticleLink, ArticleText } from './ArticleMenu.styles.js';

function Articles({articles = [], onClick = () => {}}){
  return articles.map((item, index) => {
    const friendlyNamePart = item.key.split("/");
    const friendlyName = friendlyNamePart[friendlyNamePart.length - 1]
      .replace(".txt", "")
      .replace(/-/g, " ");
    const articleRoute = '/' 
      + friendlyNamePart
        .slice(0, friendlyNamePart.length - 1)
        .join('/') 
      + '/' + friendlyNamePart[
        friendlyNamePart.length - 1
      ].replace(".txt", "-article");
    return (
      <ArticleItem
        key={index}
      >
        <ArticleLink className="uk-link" to={articleRoute} onClick={onClick}>
          <span style={{marginRight:'4px'}} className="uk-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="file-text"><rect fill="none" stroke="#000" width="13" height="17" x="3.5" y="1.5"></rect><line fill="none" stroke="#000" x1="6" x2="12" y1="12.5" y2="12.5"></line><line fill="none" stroke="#000" x1="6" x2="14" y1="8.5" y2="8.5"></line><line fill="none" stroke="#000" x1="6" x2="14" y1="6.5" y2="6.5"></line><line fill="none" stroke="#000" x1="6" x2="14" y1="10.5" y2="10.5"></line></svg>
          </span>
          <ArticleText>
            {friendlyName}
          </ArticleText>
        </ArticleLink>
      </ArticleItem>
    );
  })
}

function ArticleListOffCanvas({ articles = [], style = {} }) {
  return (
    <ArticleTrigger className="uk-inline" style={{ verticalAlign: 'top', ...style }}>
      <span className="uk-icon uk-link" style={{ textAlign: "right", display: 'inline' }}>
        <span href="#" style={{ fontSize: '18px', width: '45px' }} className="uk-link-heading">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            data-svg="table"
          >
            <rect x="1" y="3" width="18" height="1" />
            <rect x="1" y="7" width="18" height="1" />
            <rect x="1" y="11" width="18" height="1" />
            <rect x="1" y="15" width="18" height="1" />
          </svg>
          <span style={{paddingLeft:'10px',height:'20px',verticalAlign:'middle',fontWeight:'600'}}>
          Articles
          </span>
        </span>
      </span> 
      <div style={{maxHeight:'500px',overflowX:'hidden',overflowY:'auto',marginTop:"4px"}} uk-dropdown="mode: click;pos: bottom-justify; boundary: .boundary; boundary-align: true" className="uk-padding-remove">
        <Articles articles={articles} />
      </div>
    </ArticleTrigger>
  );
}

class ArticleMenu extends PureComponent {
  render() {
    return (
        <ArticleListOffCanvas style={this.props.style} articles={this.props.articles} />
    );
  }
}

ArticleMenu.propTypes = {
  articles: PropTypes.array
};

ArticleMenu.defaultProps = {};

export default ArticleMenu;
