import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './index.css';
import TableComponent from "./TableUserComponent";
function ProfileTable()
{
    const navigate = useNavigate();
    const userdetails = useSelector((state) => state.login.user);
    const { username,firstName, lastName, designation,role,lastLoggedIn ,address,phoneNumber,mailId,joinedDate,profilepic} = userdetails || {};
    const profileInfo = {
        username : username,
        firstname: firstName,
        lastname: lastName,
        designation: designation,
        role: role,
        lastLoggedIn: lastLoggedIn,
        address: address,
        phoneNumber: phoneNumber,
        mailId: mailId,
        joinedDate: joinedDate,
        profilepic : profilepic
    };
    
    const handleLogin = () => {
        navigate('/login');
    }

    if (!userdetails)
    {
        return (<div style={{
            textAlign: 'center',
            fontSize: '20px', 
            fontWeight: 'bold',
            color: '#FF0000', 
            marginTop: '20px', 
            padding: '10px', 
            backgroundColor: '#FFF0F0', 
            border: '1px solid #FFD0D0', 
            borderRadius: '10px', 
            maxWidth: '80%', 
            margin: '20px auto', 
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
        }}>
            *** Sorry, Can't display the details since you are not logged in *** 
            <button onClick={handleLogin} style={{
                padding: '10px 20px', 
                fontSize: '16px', 
                cursor: 'pointer', 
                border: 'none',
                borderRadius: '5px', 
                backgroundColor: '#FF0000', 
                color: 'white', 
                fontWeight: 'bold' 
            }}>Login Here</button>
        </div>);    
    }
   
    return (
        <div>
            <h3>Profile Information</h3>
   <TableComponent {...profileInfo}/>
   </div>)
}
    
export default ProfileTable;
