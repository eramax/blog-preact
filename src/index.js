import { Component } from "preact";
import axios from "axios";
import CategoryCard from "./components/CategoryCard";
import PostCard from "./components/PostCard";
import Main from "./components/Main";

import "purecss/build/pure-min.css";
import "./css/style.css";

const API = "/assets/index5.json"

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
      posts: null,
      selectedCategory: 0,
      selectedPost: 0
    };
    this.selectCategory = this.selectCategory.bind(this);
    this.selectPost = this.selectPost.bind(this);

  }
  componentDidMount() {
    let currentComponent = this;
    axios
      .get(API, { timeout: 30000 })
      .then(function (data) {
        if ("data" in data && "categories" in data.data && "posts" in data.data) {
          currentComponent.setState({
            categories: data.data.categories,
            posts: data.data.posts
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  selectCategory(catId) {
    this.setState({ selectedCategory: catId , selectedPost: 0});
  }
  selectPost(postId) {
    this.setState({ selectedPost: postId });
  }
  getselectedPosts(catId, postId) {
    let list = []
    if (this.state.categories != null) {
      this.state.categories[catId].posts.forEach((it,k) => {
        if (this.state.posts[it])
          list.push(<PostCard key={it} 
            title={this.state.posts[it].title} 
            date={this.state.posts[it].date}
            onSelect={() => this.selectPost(k)}
            selected={k==postId} />)
      });
    }
    return list;
  }
  getCategories(selectedCat) {
    let list = []
    if (this.state.categories != null) {
      this.state.categories.forEach((it, k) =>
        list.push(<CategoryCard cat={it} 
          onSelect={() => this.selectCategory(k)} 
          selected={k==selectedCat} />)
      );
    }
    return list;
  }

  render() {
    if (this.state.categories == null) return "Loading..."; else
      return (
        <div class="list">
          <div id="layout" className="content pure-g">
            <div id="nav" className="pure-u">
              <a className="nav-menu-button">Menu</a>
              <div className="nav-inner">
                <div className="pure-menu">
                  <ul className="pure-menu-list">
                    {
                      this.getCategories(this.state.selectedCategory)
                    }
                  </ul>
                </div>
              </div>
            </div>
            <div id="list" className="pure-u-1">
              {
                this.getselectedPosts(this.state.selectedCategory, this.state.selectedPost)
              }
            </div>
            <Main />
          </div>
        </div>);
  }
}
