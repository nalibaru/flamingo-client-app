import React, { useState } from "react";
import { useSelector } from 'react-redux';
import Button from '../../../components/Button';
import UploadProfilePic from "./UploadProfilePic";
import './index.css';
import ProfileTable from "./ProfileTable";
import { useTheme } from "../../../ThemeContext";
import ChangePassword from "./ChangePassword";
import ModalComponent from "../../../components/ModalComponent";

function Profile() {
    const theme = useTheme();
    const [title, setTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [type, setType] = useState("");
    const userdetails = useSelector((state) => state.login.user);
    const { username } = userdetails || {};
    const [responseData, setResponseData] = useState("");
    const [notificationClass, setNotificationClass] = useState("");
    const handleModal = (data) => {
        if(data)
        {
          setNotificationClass("notificationsuccess");
          setResponseData(data);
        }
        handleCloseModal();
      } 
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      }
    
    const changePassword = () => {
        setTitle("Change Password");
        setType("changepassword");
        setIsModalOpen(true);
    }
    
    const classNameMain = `main-${theme}`;
    return (
        <div className={classNameMain}>
            <h2>User Module</h2>  <Button theme={theme} onClick={changePassword} type="button">Change Password</Button>
            <hr></hr>
            <UploadProfilePic />
            <hr></hr>
            <div>
                <ProfileTable />
            </div>
            <ModalComponent
            title={title}
            theme={theme}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            showFooter={false}
        >
            {type === "changepassword" && <ChangePassword username={username} onCloseModal={handleModal} />}
        </ModalComponent>
        </div>
    );
}

export default Profile;