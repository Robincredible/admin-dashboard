import ContextMenu from "./context-menu";
import { useState, useEffect } from "react";
import "./stats-edit.css";

const StatsEdit = (props) => {
    const [edit, setEdit] = useState(props.active);
    const classNames = "stats-edit-button " + props.className;
    
    const clickHandler = () => {
        setEdit(!edit);
        props.edit(!edit);
    }
    
    return(
        <ContextMenu className={classNames}>
            <button type="Submit" onClick={clickHandler} form="stats-form" className="button">{!edit && "Edit"} {edit && "Done"}</button>
        </ContextMenu>
    )
    
}

export default StatsEdit;