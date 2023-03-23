import ContextMenu from "./context-menu";
import { useState, useEffect } from "react";
import "./stats-edit.css";

const StatsEdit = (props) => {
    const [edit, setEdit] = useState(false);
    const classNames = "stats-edit-button " + props.className;
    
    useEffect(() => {
        if (props.onSelect) {
            setEdit(false);
        }
    }, [])
    
    const clickHandler = (e) => {
        e.preventDefault();
        
        if (edit === false){
            setEdit(!edit);
            props.edit(!edit);
            props.submitOutside(true);   
        } else {
            setEdit(!edit);
            props.edit(!edit);
            props.submitOutside(false);
        }
    }
    
    const editClassnames = "edit-button " + (!edit ? "active" : "");
    const submitClassnames = "submit-button " + (edit ? "active" : "");
    return(
        <ContextMenu key={props.id + "-context-menu"} className={classNames}>
            <button key={props.id + "-edit-stats-button"} onClick={clickHandler} className={editClassnames}>Edit</button>
            <button key={props.id + "-submit-stats-button"} type="submit" onClick={clickHandler} form="stats-form" className={submitClassnames}>Done</button>
        </ContextMenu>
    )
    
}

export default StatsEdit;