import { useState } from "react";

export function NavLink(props) {
  const { icon, title, items } = props;
  const [isNavLinkCollapsed, setIsNavLinkCollapsed] = useState(true);
  const [itemsClass, setItemsClass] = useState("collapse");

  function toggleNavLink() {
    setIsNavLinkCollapsed(!isNavLinkCollapsed);
    setItemsClass(itemsClass.includes("show") ? "collapse" : "collapse show");
  }

  return (
    <>
      <a className={`nav-link ${!isNavLinkCollapsed && "collapsed"}`} onClick={toggleNavLink}>
        {icon && (
          <div className="sb-nav-link-icon">
            <i className={icon}></i>
          </div>
        )}
        {title}
        {items && items.length && (
          <div className="sb-sidenav-collapse-arrow">
            <i className="fas fa-angle-down"></i>
          </div>
        )}
      </a>
      {items && items.length && (
        <div className={itemsClass}>
          <nav className="sb-sidenav-menu-nested nav">
            {/*{items.map((item) =>*/}
            {/*  typeof item === "string" ? (*/}
            {/*    <a className="nav-link">{item}</a>*/}
            {/*  ) : (*/}
            {/*    <NavLink*/}
            {/*      icon={item.icon}*/}
            {/*      title={item.title}*/}
            {/*      items={item.items}*/}
            {/*    />*/}
            {/*  )*/}
            {/*)}*/}
          </nav>
        </div>
      )}
    </>
  );
}
