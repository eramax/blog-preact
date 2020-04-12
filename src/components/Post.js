import { Component, createRef } from "preact";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      notFound: <h3> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Please select a post.</h3>
    };
  }
  ref= createRef()
  componentDidMount() {
    if(this.props.slug !== undefined)
      this.load(); 
    else this.props.root();
  }
  componentDidUpdate(prevProps) {
    if (this.props.slug !== prevProps.slug) this.load();
  }
  load() {
    let currentComponent = this;
    let url = encodeURI(this.props.api + "posts/" + this.props.slug + ".json")
    fetch(url)
      .then(data => data.json())
      .then(data => {
        if(currentComponent.ref.current) currentComponent.ref.current.scrollIntoView(true);
        currentComponent.setState({ post: data });
        currentComponent.props.selectCategory(data['categories']);
        currentComponent.props.selectPost(data['slug']);
      })
      .catch(function (error) {
        console.log(error);
        currentComponent.setState({ post: null });
      });
  }
  render() {
    return (
      <div id="main" ref={this.ref} className="pure-u-1">
        {
          (this.state.post)?
          <div className="blog-content" >
            <div className="blog-content-header pure-g">
              <div className="pure-u">
                <h1 className="blog-content-title">{this.state.post.title}</h1>
                <p className="blog-content-subtitle">
                  From Ahmed Essam at <span>{new Date(this.state.post.date).toDateString()}</span>
                </p>
              </div>
            </div>
            <div className="blog-content-body" >
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
