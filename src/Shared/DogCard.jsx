import { FavoriteButton } from "./FavoriteButton";
import { TrashButton } from "./TrashButton";
import { UnfavoriteButton } from "./UnfavoriteButton";

//if user hit garbage can create a useEffect to do a delete request from the data base
//if a user hits the heart then the dog should be shown when user selects favorited
//on default the dogs should move to the un favorited section
// ! Do Not Make Changes To This File
export const DogCard = ({
  dog: { name, image, description, isFavorite },
  onTrashIconClick,
  onEmptyHeartClick,
  onHeartClick,
  isLoading,
}) => {
  return (
    <div className="dog-card">
      {/* Choose which button to show depending on if dog is a favorite */}
      {isFavorite ? (
        <UnfavoriteButton
          onClick={() => {
            onHeartClick();
          }}
          disabled={isLoading}
        />
      ) : (
        <FavoriteButton
          onClick={() => {
            onEmptyHeartClick();
          }}
          disabled={isLoading}
        />
      )}

      {/* Use this button to delete a puppy :( */}
      <TrashButton
        onClick={() => {
          onTrashIconClick();
        }}
        disabled={isLoading}
      />

      {/* Ignore this */}
      {/*You can temporarily set a favorite overlay after a user favorites a dog*/}
      {/*Try making className "favorite-overlay active"*/}
      <div
        className={`favorite-overlay ${
          isFavorite && isLoading ? "active" : ""
        }`}
      >
        {" "}
        {"<3"}{" "}
      </div>

      {/* Ignore this  */}
      {/* You can temporarily set a favorite overlay after a user favorites a dog */}
      {/* Try making className "favorite-overlay active"*/}
      {isLoading && <div className={`loading-overlay`}></div>}

      {/* Ignore this  */}
      {/* You can temporarily set a unfavorite overlay after a user favorites a dog */}
      {/* Try making className "unfavorite-overlay active"*/}
      <div
        className={`unfavorite-overlay ${
          isLoading && !isFavorite ? "active" : ""
        }  `}
      >
        {"</3"}
      </div>

      {/* A Dogs Name */}
      <p className="dog-name">{name}</p>

      {/* A Dogs Image */}
      <img src={image} alt={name} />

      {/*  A Dogs description*/}
      <p className="dog-description">{description}</p>
    </div>
  );
};
