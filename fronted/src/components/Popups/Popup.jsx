import React from "react";

const Popup = (props) => {
  if (props.isOpen === false) return null;

  const close = (e) => {
    e.preventDefault();
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <span>
      <div
        key="modal-animation"
        className={`popup ${props.className}`}
        style={props.style}
      >
        <div className="container" style={{ borderRadius: props.borderRadius }}>
          {props.children}
        </div>
      </div>
      {!props.noBackdrop && (
        <div
          key="modal-animation-no-backdrop"
          className={"backdrop"}
          style={props.backdropStyle}
          onClick={(e) => !props.noCloseOnOutSide && close(e)}
        />
      )}
    </span>
  );
};

export default Popup;
