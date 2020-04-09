const CategoryList = props => {
  //console.log(props);

  return (
    <div id="nav" className="pure-u">
      <a className="nav-menu-button">Menu</a>

      <div className="nav-inner">
        <div className="pure-menu">
          <ul className="pure-menu-list">
            <li className="pure-menu-item">
              <a className="pure-menu-link">
                Inbox <span className="email-count">(2)</span>
              </a>
            </li>
            <li className="pure-menu-item">
              <a className="pure-menu-link">Important</a>
            </li>
            <li className="pure-menu-item">
              <a className="pure-menu-link">Sent</a>
            </li>
            <li className="pure-menu-item">
              <a className="pure-menu-link">Drafts</a>
            </li>
            <li className="pure-menu-item">
              <a className="pure-menu-link">Trash</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
