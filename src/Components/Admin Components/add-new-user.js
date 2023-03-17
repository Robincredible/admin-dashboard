import "./add-new-user.css";
import { useState } from "react";
import AddUserModal from "./add-user-modal";

const AddNewUser = (props) => {
    const [modalView, setModalView] = useState(false);
    
    const buttonClasses = "add-button " + (modalView ? "close-button " : "");
    const containerClasses = "add-button-container " + (modalView ? "close-button " : "");
    
    const clickHandler = () => {{
        setModalView(!modalView);
    }}
    
    return (
        <div>
            <div className={containerClasses}>
                <div className={buttonClasses} onClick={clickHandler}>
                    <p>+</p>
                </div>
            </div>
            {modalView == true && <AddUserModal modalView={setModalView} dataTrigger={props.dataTrigger} />}
        </div>
    )
}

export default AddNewUser;