const CategoryItem = props => {
    return (
        <li className="pure-menu-item">
        <a className="pure-menu-link" onClick={props.onSelect}>
        {props.cat.name} <span className="email-count">({props.cat.count})</span>
        </a>
      </li>
    );
  };
  
  export default CategoryItem;
  