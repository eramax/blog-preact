import Layout from "./components/layout/Layout";
import { Component } from "preact";
import axios from "axios";
import "purecss/build/pure-min.css";
import "./css/email.css";

const API="/assets/index5.json"

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
      posts: null
    };
  }
  componentDidMount() {
    let currentComponent = this;
    axios
      .get(API, { timeout: 30000 })
      .then(function(data) {
        if ("data" in data && "categories" in data.data  && "posts" in data.data)
        {
            currentComponent.setState({
              categories: data.data.categories,
              posts: data.data.posts});
        } 
      })
      .catch(function(error) {
        console.log(error);
      });
  }  

  render() {
    if (this.state.categories == null) return "Loading..."; else
      return (
        <div>
          <div class="list">
            <Layout categories={this.state.categories} posts={this.state.posts} />
          </div>
        </div>
      );
  }
}

