import { Component } from "preact";
import { Router } from 'preact-router';
import CategoryCard from "./components/CategoryCard";
import PostCard from "./components/PostCard";
import Post from "./components/Post";

import "purecss/build/pure-min.css";
import "./css/style.css";

import defaultImage from "./assets/Blog-Post-Icon-Navy-Blue.png" 

const API = "/assets/"

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
      posts: null,
      selectedCategory: 0,
      selectedPost: 0,
    };
    this.selectCategory = this.selectCategory.bind(this);
    this.selectPost = this.selectPost.bind(this);

  }
  componentDidMount() {
    let currentComponent = this;
    fetch(API+"index.json")
      .then((data) =>  data.json())
      .then((data) =>  {
       if ( "categories" in data && "posts" in data) {
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
        const post = this.state.posts[it]
        if (post)
          list.push(<PostCard key={it} 
            title={post.title} 
            date={new Date(post.date).toDateString()}
            onSelect={() => this.selectPost(k)}
            img={(post.featuredImage)? post.featuredImage : defaultImage}
            url={it}
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
	handleRoute = e => {
		this.currentUrl = e.url;
	};

  render() {
      return (
        <div class="list">
          <div id="layout" className="content pure-g">
            <div id="nav" className="pure-u">
              <a className="nav-menu-button">...</a>
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
            <Router onChange={this.handleRoute}>
					    <Post path="/"  api={API} />
					    <Post path="/:slug" api={API} />
				    </Router>
          </div>
        </div>);
  }
}
