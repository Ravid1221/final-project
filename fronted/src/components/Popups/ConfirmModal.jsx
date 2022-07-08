import Popup from "./Popup";
import { isMobileWidth } from "../../helpers/screenHelper";
import MainButton from "../mainButton/MainButton";

const ConfirmModal = (props) => {
  const modalStyle = {
    width: isMobileWidth() ? "100vw" : 400,
    height: isMobileWidth() ? "100vh" : 200,
    boxShadow: "none",
    transition: "all 0.5s ease",
  };

  return (
    <div className="deleteEdit">
      <Popup
        isOpen={props.isOpen}
        className="AddRecipe"
        borderRadius="16px"
        style={modalStyle}
      >
        <h3 className="deleteHeader">Are you sure?</h3>
        <div className="areYouSure">
          <MainButton
            key={"cancel"}
            isDisabled={false}
            content={"cancel"}
            buttonClass={"spe cancel"}
            containerClass={"form-action"}
            callback={() => {
              props.submit(false);
            }}
          />
          <div>
            <MainButton
              key={"delete"}
              isDisabled={false}
              content={"delete"}
              buttonClass={"delete spacial-button"}
              containerClass={"form-action"}
              callback={() => {
                props.submit(true);
              }}
            />
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default ConfirmModal;
