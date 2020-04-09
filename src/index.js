import "preact/debug";

import Layout from "./components/layout/Layout";
import { render, Component } from "preact";
import axios from "axios";
import "purecss/build/pure-min.css";
import "./css/email.css";
//import posts from "./assets/posts.json";

const API="/assets/posts.json"
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null
    };
  }
  componentDidMount() {
    let currentComponent = this;
    axios
      .get(API, {
        timeout: 30000
      })
      .then(function(data) {
        if (
          "data" in data &&
          "data" in data.data &&
          "data" in data.data &&
          "posts" in data.data.data
        ) {
          currentComponent.setState({
            posts: data.data.data.posts
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }  

  render() {
    if (this.state.posts === null) return "Loading...";
    else
      return (
        <div>
          <div class="list">
            <Layout posts={this.state.posts} />
          </div>
        </div>
      );
  }
}

