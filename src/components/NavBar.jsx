import "./navbar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="nav__wrapper">
        <div className="nav__left">
          <div className="nav__logo">
            <i class="fas fa-store-alt"></i>
            <h2 className="nav__title">
              {" "}
              <span>E</span>-Shop
            </h2>
          </div>
        </div>

        <div className="nav__center">
          <ul className="nav__link__container">
            <li className="nav__link">Men</li>
            <li className="nav__link">Women</li>
            <li className="nav__link">Kids</li>
          </ul>
        </div>

        <div className="nav__right">
          <i className="fas fa-search"></i>
          <i className="fas fa-shopping-cart"></i>
          <i className="fas fa-user"></i>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
