import Modal from "../UI/modal";
import { useState } from 'react';
import "./add-user-modal.css";

const AddUserModal = (props) => {
    
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [data, setData] = useState("");
    
    let contentLength = (name + profilePic).length;
    
    const submitHandler = async(e) => {
        e.preventDefault();
        
        try{
            let res = await fetch('https://dashboard-rest-api.onrender.com/api/users/add', {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    profile_picture: profilePic
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': contentLength,
                    'Host' : window.location.hostname,
                }
            });
            
            //let resJson = await res.json();
            if (res.status === 200) {
                setName("");
                setProfilePic("");
                setData("");
                props.dataTrigger(true);
                props.modalView(false);
                console.log('Success!');
            } else {
                console.log('error')
            }
            
        } catch(err){
            console.log(err);
        }
        
    }
    
    return (
        <Modal>
            <div className="add-user-container">
                <form onSubmit={submitHandler} className="add-user-form">
                    <div>
                        <label for="username">Username</label>
                        <input autoComplete="off" maxlength="30" placeholder="Username" name="username" id="username" type="text" onChange={(e) => setName(e.target.value) } />
                    </div>
                    <div>
                        <label for="profile_pic">Profile_Pic</label>
                        <input autoComplete="off" placeholder="Link to Profile Picture" name="profile_picture" id="profile_picture" type="text" onChange={(e) => setProfilePic(e.target.value)} />
                    </div>
                    <div>
                        <input type="Submit" value="SUBMIT" />
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default AddUserModal;