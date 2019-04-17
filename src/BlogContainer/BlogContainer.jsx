import React, { PureComponent, useState } from "react";
import PropTypes from "prop-types";
import { send } from "../Sevices/common";
import BlogArticle from "../BlogArticle";
import {
  Container,
  NavIcon,
  NavDirectory,
  NavArticle,
  ArticleItem
} from "./BlogContainer.styles";
import { Config } from "./service.config";
import { Link } from "react-router-dom";
import UIKit from "uikit";

function getArticle(article) {
  return send(
    `${Config.BASE_ARTICLE_URL}/${article.key}`,
    "GET",
    undefined,
    undefined,
    "text"
  );
}

class ArticleRoute {
  ARTICLE_SUFFIX = "-article";
  BLOG_PREFIX = "blog";
  constructor(location, history) {
    this.location = location;
    this.history = history;
  }
  withProps(props) {
    this.location = props.location;
    this.history = props.history;
    return this;
  }
  updateArticleRoute(article) {
    const newPath = `/${article.key.replace(".txt", "")}${this.ARTICLE_SUFFIX}`;
    if (this.location.pathname !== newPath) {
      this.history.push({
        pathname: newPath
      });
    }
  }
  isArticle() {
    return this.location.pathname.lastIndexOf(this.ARTICLE_SUFFIX) !== -1;
  }
  getArticleRoute() {
    const pathname = this.routeWithoutEndSlash();
    let pathArticle;
    if (
      pathname !== "/" &&
      pathname !== "" &&
      pathname.search(/-article/) !== -1
    ) {
      pathArticle = {
        key: `${pathname.replace("-article", "").slice(1, pathname.length)}.txt`
      };
    }
    return pathArticle;
  }
  getRootRoute() {
    const { location } = this;
    const pathname = location.pathname;
    let rootRoute;
    if (pathname.lastIndexOf(this.ARTICLE_SUFFIX) !== -1) {
      const routesPart = pathname.split("/");
      rootRoute = routesPart.slice(0, routesPart.length - 1).join("/");
    } else {
      rootRoute = pathname;
    }
    return rootRoute
      .replace(`/${this.BLOG_PREFIX}/`, "")
      .replace(`/${this.BLOG_PREFIX}`, "");
  }
  addEndSlash() {
    if (!this.location.pathname.endsWith("/")) {
      this.history.replace({
        pathname: this.location.pathname + "/"
      });
    }
  }
  routeWithoutEndSlash() {
    const pathname = this.location.pathname;
    return pathname.endsWith("/")
      ? pathname.slice(0, pathname.length - 1)
      : pathname;
  }
}

function ArticleNav({ menu = [], articles = [] }) {
  const [canvasRef] = useState(React.createRef());
  return (
    <NavIcon>
      <div className="uk-link uk-icon" uk-toggle="target: #nav-off-canvas">
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
      </div>
      <div
        ref={canvasRef}
        id="nav-off-canvas"
        uk-offcanvas="mode: push;overlay: true;"
      >
        <div className="uk-offcanvas-bar">
          <ul className="uk-nav" style={{ textTransform: "capitalize" }}>
            {menu.map((item, index) => {
              const friendlyNamePart = item.key.split("/");
              const friendlyName =
                friendlyNamePart[friendlyNamePart.length - 2];
              return (
                <NavDirectory
                  key={index}
                  onClick={_ => UIKit.offcanvas(canvasRef.current).hide()}
                >
                  <Link to={`/${friendlyName}/`}>
                    <span style={{height:'24px'}} className="uk-icon uk-margin-small-right">
                      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="folder"><polygon fill="none" stroke="#000" points="9.5 5.5 8.5 3.5 1.5 3.5 1.5 16.5 18.5 16.5 18.5 5.5"></polygon></svg>
                    </span>
                    <span style={{height:'24px',display:'inline-block',verticalAlign:'bottom'}}>
                      {friendlyName}
                    </span>
                  </Link>
                </NavDirectory>
              );
            })}
            <hr/>
            {articles.map((item, index) => {
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
                <NavArticle
                  key={index}
                  onClick={_ => UIKit.offcanvas(canvasRef.current).hide()}
                >
                  <Link to={articleRoute}>
                    <span style={{height:'24px'}} className="uk-icon uk-margin-small-right">
                      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="file-text"><rect fill="none" stroke="#000" width="13" height="17" x="3.5" y="1.5"></rect><line fill="none" stroke="#000" x1="6" x2="12" y1="12.5" y2="12.5"></line><line fill="none" stroke="#000" x1="6" x2="14" y1="8.5" y2="8.5"></line><line fill="none" stroke="#000" x1="6" x2="14" y1="6.5" y2="6.5"></line><line fill="none" stroke="#000" x1="6" x2="14" y1="10.5" y2="10.5"></line></svg>
                    </span>
                    <span style={{height:'24px',display:'inline-block',verticalAlign:'middle'}}>
                      {friendlyName}
                    </span>
                  </Link>
                </NavArticle>
              );
            })}
          </ul>
        </div>
      </div>
    </NavIcon>
  );
}

function Articles({articles = []}){
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
        <Link to={articleRoute}>
          <span style={{height:'24px',width:'18px',marginRight:'4px'}} className="uk-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="file-text"><rect fill="none" stroke="#000" width="13" height="17" x="3.5" y="1.5"></rect><line fill="none" stroke="#000" x1="6" x2="12" y1="12.5" y2="12.5"></line><line fill="none" stroke="#000" x1="6" x2="14" y1="8.5" y2="8.5"></line><line fill="none" stroke="#000" x1="6" x2="14" y1="6.5" y2="6.5"></line><line fill="none" stroke="#000" x1="6" x2="14" y1="10.5" y2="10.5"></line></svg>
          </span>
          <span style={{textTransform:'capitalize',fontSize:'16px',height:'24px',display:'inline-block',verticalAlign:'middle',fontWeight:'400'}}>
            {friendlyName}
          </span>
          <span style={{marginTop:'-3px',marginLeft:'14px'}}>
            {friendlyNamePart
              .slice(1, friendlyNamePart.length - 1)
              .map(
                (tag, index) => 
                  <span key={index} style={{padding:'6px',marginRight:'5px',textTransform:'capitalize'}} className="uk-badge">{tag}</span>
              )
            }
          </span>
        </Link>
      </ArticleItem>
    );
  })
}

function ArticleList({articles = []}) {
  return (
    <ul uk-accordion="true" className="uk-margin-small-bottom">
      <li>
        <a className="uk-accordion-title">Articles</a>
        <div className="uk-accordion-content" style={{marginTop:'15px'}}>
          <ul className="uk-list uk-list-divider">
            <Articles articles={articles}/>
          </ul>
        </div>
      </li>
    </ul>
  );
}

class BlogContainer extends PureComponent {
  state = {};
  articleRoute = new ArticleRoute();
  componentDidUpdate(prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      if (this.articleRoute.withProps(this.props).isArticle()) {
        this.setArticleFromRoute();
      } else {
        this.loadArticles();
      }
    }
  }
  setArticleFromRoute() {
    const routeArticle = this.articleRoute
      .withProps(this.props)
      .getArticleRoute();
    if (routeArticle) {
      this.setArticle(routeArticle);
    }
  }
  componentDidMount() {
    this.articleRoute.withProps(this.props).addEndSlash();
    this.loadArticles();
  }
  loadArticles() {
    const rootRoute = this.articleRoute.withProps(this.props).getRootRoute();
    this.setState({isLoadingBlog: true})
    send(
      `${Config.LIST_ARTICLES_URL}${
        rootRoute.length !== 0 ? `?path=${encodeURIComponent(rootRoute)}` : ""
      }`,
      "GET",
      Config.ACCESS_TOKEN
    )
    .then(blog => {
      this.setState({
        blog: blog,
        menu: blog.articles.filter(article => article.sub),
        articles: blog.articles.filter(article => !article.sub),
        isLoadingBlog: false
      });
    })
    .then(_ => this.setArticleFromRoute())
    .catch(_ => this.setState({isLoadingBlog: false}));
  }
  setArticle = article => {
    this.setState({isLoadingArticle: true})
    getArticle(article).then(article => {
      this.setState({ article: article, isLoadingArticle: false });
      this.articleRoute.withProps(this.props).updateArticleRoute(article);
    }).catch(_ => this.setState({isLoadingArticle: false}));
  };
  render() {
    const { articles } = this.state;
    return (
      <Container>
        <hr/>
        {this.state.isLoadingBlog ? <div uk-spinner="ratio: 0.5" style={{margin:0,paddingLeft: "20px"}}/> : <ArticleList articles={articles} />}
        <hr/>
        {this.state.isLoadingArticle ? <div uk-spinner="ratio: 0.5" style={{margin:0,paddingLeft: "20px"}}/> : <BlogArticle article={this.state.article} />}
        <br/>
        <br/>
      </Container>
    );
  }
}

BlogContainer.propTypes = {};
BlogContainer.defaultProps = {};

export default BlogContainer;
