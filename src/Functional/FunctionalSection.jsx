import { Link } from "react-router-dom";

// navigation component
export const FunctionalSection = ({
  navBar,
  navBarSetters,
  totalFavAndUnFav,
  children,
}) => {
  // use static  function control to determine user selection
  //use the useeffect to fetch dongs from database
  const [favorite, unfavorite, createDog] = navBar;
  const [setFavorite, setUnfavorited, setCreateDog] = navBarSetters;

  const onClickChangeActive = (currentIndex) => {
    return (e) => {
      e.preventDefault();
      const allIndex = [0, 1, 2];
      const navSelect = [favorite, unfavorite, createDog];
      const navSetter = [setFavorite, setUnfavorited, setCreateDog];
      const selectedIndex = allIndex[currentIndex];
      const currentValue = navSelect[selectedIndex];
      const currentSetter = navSetter[selectedIndex];
      const previousIndex = navSelect
        .map((bool, index) => (bool === true ? index : null))
        .filter((item) => {
          return item !== null;
        });
      const previousValue = navSelect[previousIndex[0]];
      const previousSetter = navSetter[previousIndex[0]];
      previousSetter(currentValue);
      currentSetter(previousValue);
    };
  };

  return (
    <>
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>
          <Link to={"/class"} className="btn">
            Change to Class
          </Link>
          <div className="selectors">
            {/* This should display the favorited count */}
            <div
              className={`selector ${favorite ? "active" : ""}`}
              onClick={onClickChangeActive(0)}
            >
              favorited ( {totalFavAndUnFav.favorite})
            </div>
            {/* This should display the unfavorited count */}
            <div
              className={`selector ${unfavorite ? "active" : ""}`}
              onClick={onClickChangeActive(1)}
            >
              unfavorited ( {totalFavAndUnFav.unFavorite})
            </div>
            <div
              className={`selector ${createDog ? "active" : ""}`}
              onClick={onClickChangeActive(2)}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{children}</div>
      </section>
    </>
  );
};
