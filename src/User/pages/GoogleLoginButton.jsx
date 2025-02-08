import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginSuccess } from '../Reducer/authSlice';
import { useDispatch } from 'react-redux';



const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
    
 

  const handleLoginSuccess = async (response) => {
    console.log('Login success:', response);

    const res = jwtDecode(response?.credential)
    
    console.log('data', res)


    const userData = {
      fullname: res.name,
      username: res.email
    };

    try {
      const res = await axios({url:`${process.env.REACT_APP_API_URL}/User/loginWithGoogle`,method:"POST",data:userData,
        headers: {
            'Content-Type': 'application/json',
          }
        })
      

    
      
      if(res.data.code == 200)
      {
        dispatch(loginSuccess(res.data.Token))
        toast.success("Login success")
        navigate("/")

      }
      
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error(res.data.message)
    }

  };

  const handleLoginFailure = (error) => {
    console.error('Login failed:', error);
  };

  return (
    <div className="container">
      <div className="row mt-1">
       
        <div className="col-md-12 mt-3">
          <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
            <div className="GoogleLoginButton">
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}

                className="google"
                style={{
                  width: '170px',
                  height: '45px',
                  fontSize: '14px',
                }}
              />
            </div>
          </GoogleOAuthProvider>

          
          
         


         
        </div>
     


       
        
      
      </div>
    </div>
  );
};

export default GoogleLoginButton;
