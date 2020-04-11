import { Component } from "preact";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      notFound: <h3>The page not found!</h3>
    };

  }
  componentDidMount() {
    this.load()
  }
  componentDidUpdate(prevProps) {
    if (this.props.slug !== prevProps.slug) {
      this.load()
    }
  }
  load() {
    let currentComponent = this;
    fetch(this.props.api + "posts/" + this.props.slug + ".json")
      .then(data => data.json())
      .then(data => {
        currentComponent.setState({ post: data });
      })
      .catch(function (error) {
        console.log(error);
        currentComponent.setState({ post: null });
      });
  }
  render() {
    return (
      <div id="main" className="pure-u-1">
        {
          (this.state.post)?
          <div className="email-content">
            <div className="email-content-header pure-g">
              <div className="pure-u">
                <h1 className="email-content-title">{this.state.post.title}</h1>
                <p className="email-content-subtitle">
                  From Ahmed Essam at <span>{new Date(this.state.post.date).toDateString()}</span>
                </p>
              </div>
            </div>
            <div className="email-content-body">
              <div key={this.props.slug} 
              dangerouslySetInnerHTML={{ __html: (this.state.post)? this.state.post.content : this.state.notFound }} />
            </div>
          </div>
          : this.state.notFound
        }
      </div>
    );
  }
}
