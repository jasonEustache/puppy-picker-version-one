import { Component } from "react";
import { Link } from "react-router-dom";

export class ClassSection extends Component {
  render() {
    const favLength = this.props.dogLength.favLength;
    const unFaveLength = this.props.dogLength.unFavLength;
    const allTabs = this.props.currentSelection;
    const [favorited, unfavorited, createDog] = allTabs;
    const allSetters = this.props.stateSetterTab;

    const onClickEventTabs = (currentIndex) => {
      const previousValue = allTabs.map((bool, index) => {
        return bool === true ? index : "";
      });

      const previous = previousValue.filter((location) => {
        return location !== "" ? location : "";
      });
      const previousIndex = previous.length === 0 ? 0 : previous[0];

      const previousTabValue = allTabs[previousIndex];
      const currentTabValue = allTabs[currentIndex];
      const currentSetter = allSetters[currentIndex];
      const previousSetter = allSetters[previousIndex];

      return (e) => {
        e.preventDefault();
        previousSetter(currentTabValue);
        currentSetter(previousTabValue);
      };
    };

    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>
          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className={`selectors`}>
            {/* This should display the favorited count */}
            <div
              className={`selector ${favorited ? "active" : ""}`}
              onClick={onClickEventTabs(0)}
            >
              favorited ( {favLength} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={`selector ${unfavorited ? "active" : ""}`}
              onClick={onClickEventTabs(1)}
            >
              unfavorited ( {unFaveLength} )
            </div>

            <div
              className={`selector ${createDog ? "active" : ""}`}
              onClick={onClickEventTabs(2)}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{this.props.children}</div>
      </section>
    );
  }
}
