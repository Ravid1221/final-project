import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { getCurrentUser } from "../../services/userService";
import { changeLikeStatus } from "../../services/cardService";

const LikesIndicator = ({ likes, id, color, onChange }) => {
  const user = getCurrentUser();
  const [totalLikes, setTotalLikes] = useState(likes?.length);
  const [isMyFavorite, setIsMyFavorite] = useState(likes?.includes(user?._id));

  const toggleFavorite = () => {
    changeLikeStatus(id)
      .then(() => {
        if (isMyFavorite) {
          setTotalLikes((prev) => prev - 1);
        } else {
          setTotalLikes((prev) => prev + 1);
        }
        setIsMyFavorite((prev) => !prev);
        onChange();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLikeColor = () => {
    if (!user) {
      return "gray";
    }
    if (isMyFavorite) {
      return "pink";
    }

    return "blue";
  };

  return (
    <div
      className={`likes ${user ? "" : "likeDisabled"}`}
      onClick={toggleFavorite}
    >
      <FontAwesomeIcon color={getLikeColor()} icon={faHeart} />
      <span style={{ color: color ?? "black" }}>{totalLikes}</span>
    </div>
  );
};

export default LikesIndicator;
