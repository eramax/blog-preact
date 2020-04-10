import CategoryItem from "./CategoryItem"

const CategoryList = props => {
  return (
    <div id="nav" className="pure-u">
      <a className="nav-menu-button">Menu</a>
      <div className="nav-inner">
        <div className="pure-menu">
          <ul className="pure-menu-list">
            { (props.categories != null)? props.categories.map(cat => <CategoryItem cat={cat} />) : ""   }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
