import React from "react";

const Popup = (props) => {
  return (
    <div className={`popup`}>
      <div className="popup-inner">
        <span className="close-icon" onClick={props.onClose}>
          &times;
        </span>
        {props.children}
      </div>
    </div>
  );
};

export default Popup;
