import Card from "./card";
import "./modal.css";

const Modal = (props) => {
  const classNames = "modal " + (props.className || "");
  return <Card className={classNames}>{props.children}</Card>;
};

export default Modal;
