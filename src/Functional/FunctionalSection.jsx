import { Link } from "react-router-dom";

// navigation component
export const FunctionalSection = ({
  navBarStatus,
  navBarStatusSetters,
  totalFavAndUnFav,
  children,
}) => {
  // use static  function control to determine user selection
  //use the useeffect to fetch dongs from database
  const [
    favoriteDogStatus,
    unfavoriteDogStatus,
    createDogStatus,
    defaultDogStatus,
  ] = navBarStatus;
  const [setFavoriteDog, setUnfavoriteDog, SetCreateDog, setDefaultDog] =
    navBarStatusSetters;

  const onClickChangeActive = (currentIndex) => {
    return (e) => {
      e.preventDefault();
      const indexes = [0, 1, 2, 3];
      const statusList = [
        favoriteDogStatus,
        unfavoriteDogStatus,
        createDogStatus,
        defaultDogStatus,
      ];
      const statusSetters = [
        setFavoriteDog,
        setUnfavoriteDog,
        SetCreateDog,
        setDefaultDog,
      ];

      ////////////////////
      const targetId = statusList[e.target.id];
      const selected = indexes[currentIndex];
      const currentValue = statusList[selected];
      const currentSetter = statusSetters[selected];

      if (defaultDogStatus && !targetId) {
        setDefaultDog(false);
        currentSetter(true);
        return;
      }

      const previousIndex = statusList
        .map((bool, index) => (bool === true ? index : null))
        .filter((item) => {
          return item !== null;
        });
      // console.log(previousIndex);

      const previousValue = statusList[previousIndex[0]];
      const previousSetter = statusSetters[previousIndex[0]];

      if (currentValue === previousValue) {
        previousSetter(false);
        currentSetter(false);
        setDefaultDog(true);
      } else {
        previousSetter(currentValue);
        currentSetter(previousValue);
        setDefaultDog(false);
      }
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
              className={`selector ${favoriteDogStatus ? "active" : ""}`}
              onClick={onClickChangeActive(0)}
              id="0"
            >
              favorited ( {totalFavAndUnFav.favorite})
            </div>
            {/* This should display the unfavorited count */}
            <div
              className={`selector ${unfavoriteDogStatus ? "active" : ""}`}
              onClick={onClickChangeActive(1)}
              id=" 1"
            >
              unfavorited ( {totalFavAndUnFav.unFavorite})
            </div>
            <div
              className={`selector ${createDogStatus ? "active" : ""}`}
              onClick={onClickChangeActive(2)}
              id="2"
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
