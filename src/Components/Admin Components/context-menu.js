import Card from "../UI/card";
import "./context-menu.css";

const ContextMenu = (props) => {
    const classNames = "context-menu " + (props.className || "");
    return(
        <Card className={classNames}>
            <p>{props.items}</p>
        </Card>
    );
}

export default ContextMenu;