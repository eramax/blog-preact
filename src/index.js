import { Component } from "preact";
import Post from "./components/Post";
import { Link, Route } from "wouter";

import "purecss/build/pure-min.css";
import "./css/style.css";

import defaultImage from "./assets/icons/Blog-Post-Icon-Navy-Blue.png"
const API = "/assets/"

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
      posts: null,
      selectedCategory: null,
      selectedPost: null,
      root: false
    };
    this.selectCategory = this.selectCategory.bind(this);
    this.selectPost = this.selectPost.bind(this);
    this.root = this.root.bind(this);
  }
  componentDidMount() {
    let currentComponent = this;
    fetch(API + "index.json")
      .then(data => data.json())
      .then(data => {
        if ("categories" in data && "posts" in data) {
          currentComponent.setState({
            categories: data.categories,
            posts: data.posts
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  selectCategory(cat) {
    if (cat != null && cat != undefined) {
      if (cat.includes(this.state.selectedCategory)) this.setState({ root: false });
      else this.setState({ selectedCategory: cat[0], root: false });
    }
  }
  selectPost(post) {
    this.setState({ selectedPost: post, root: false });
  }
  root() {
    this.setState({ root: true })
  }
  getPosts() {
    let list = []
    if (this.state.categories != null && this.state.selectedCategory != null) {
      this.state.categories[this.state.selectedCategory]['posts'].forEach((it, k) => {
        const post = this.state.posts[it]
        if (post)
          list.push(<Link key={it} activeClassName="blog-item-selected"
            href={"/" + it} className="blog-item pure-g">
            <div className="pure-u">
              <img
                width="64"
                height="64"
                alt={post.title}
                className="blog-avatar"
                src={defaultImage}
              />
            </div>

            <div className="pure-u-3-4">
              <h5 className="blog-name">{new Date(post.date).toDateString()}</h5>
              <h4 className="blog-subject">{post.title}</h4>
            </div>
          </Link>)
      });
    }
    return list;
  }
  getCategories() {
    let list = []
    if (this.state.categories != null) {
      let catId = this.state.selectedCategory;
      if (this.state.root) {
        catId = Object.keys(this.state.categories)[0]
        this.selectCategory([...[catId]])
      }
      Object.keys(this.state.categories).forEach(it => {
        list.push(
          <li className={(it == catId) ? "pure-menu-item cat-item-selected" : "pure-menu-item"}>
            <a className="pure-menu-link" onClick={() => this.selectCategory([...[it]])}>
              {it} <span className="blog-count">({this.state.categories[it].posts.length})</span>
            </a>
          </li>)
      }
      );
    }
    return list;
  }
  handleRoute = e => {
    this.currentUrl = e.url;
  };
  render() {
    return (
      <div class="list">
        <div id="layout" className="content pure-g">
          <div id="nav" className="pure-u">
            <div className="nav-inner">
              <div className="pure-menu">
                <div className="pure-u brand-cont">
                  <img
                    width="150"
                    height="150"
                    className="brand"
                    alt="Ahmed Essam"
                    src="./assets/icons/me0.webp"
                  />
                  <h2 className="brandme">AHMED ESSAM</h2>
                </div>
                <ul className="pure-menu-list">
                  {
                    this.getCategories()
                  }
                </ul>
              </div>
            </div>
          </div>
          <div id="list" className="pure-u-1">
            {
              this.getPosts()
            }
          </div>
        
          <Route path="/">
            <Post path="/" api={API} root={this.root} />
          </Route>
          <Route path="/:slug">
            {params => <Post slug={params.slug} api={API}
              selectCategory={this.selectCategory}
              selectPost={this.selectPost} /> }
          </Route>
        </div>
      </div>);
  }
}
