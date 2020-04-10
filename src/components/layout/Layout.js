import CategoryList from "../category/CategoryList";
import Main from "./Main";
import PostList from "../post/PostList";
import { Component } from "preact";

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory : 0
    };
  }
  render() {
    return (
      <div id="layout" className="content pure-g">
        <CategoryList categories={this.props.categories}  />
        <PostList posts={this.props.posts} />
        <Main />
      </div>
    );
  };
}