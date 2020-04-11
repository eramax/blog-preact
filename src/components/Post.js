import { Component } from "preact";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
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
        currentComponent.setState({ content: data.content });
      })
      .catch(function (error) {
        console.log(error);
        currentComponent.setState({ content: "<h3>The page not found!</h3>" });
      });
  }
  render() {
    return (
      <div id="main" className="pure-u-1">
        <div className="email-content">
          <div className="email-content-header pure-g">
            <div className="pure-u-1-2">
              <h1 className="email-content-title">{this.props.slug}</h1>
              <p className="email-content-subtitle">
                From Tilo Mitra at <span>3:56pm, April 3, 2012</span>
              </p>
            </div>

            <div className="email-content-controls pure-u-1-2">
              <button className="secondary-button pure-button">Reply</button>
              <button className="secondary-button pure-button">Forward</button>
              <button className="secondary-button pure-button">Move to</button>
            </div>
          </div>

          <div className="email-content-body">
            <div key={this.props.slug} dangerouslySetInnerHTML={{ __html: this.state.content }} />
          </div>
        </div>
      </div>
    );
  }
}
