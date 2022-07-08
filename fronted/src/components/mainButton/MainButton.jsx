import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCheck,
  faStopwatch,
  faEnvelope,
  faComment,
  faTrashCan,
  faPenToSquare,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";

function MainButton(props) {
  const iconsMap = {
    plus: faPlus,
    check: faCheck,
    stopwatch: faStopwatch,
    mail: faEnvelope,
    sms: faComment,
    edit: faPenToSquare,
    delete: faTrashCan,
    share: faShareNodes,
  };

  return (
    <div
      className={
        "button-container" +
        (props.containerClass ? " " + props.containerClass : "")
      }
    >
      <button
        disabled={props.isDisabled}
        className={`submit-button ${props.buttonClass}`}
        onClick={props.isLoading ? () => {} : props.callback}
      >
        {props.icon && (
          <FontAwesomeIcon
            className="button-icon"
            icon={iconsMap[`${props.icon}`]}
            size={props.size ? props.size : "lg"}
          />
        )}
        {props.isLoading ? "Loading..." : props.content}
      </button>
    </div>
  );
}

export default MainButton;
