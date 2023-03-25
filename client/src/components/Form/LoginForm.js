import React, { useState } from 'react'

import axios from 'axios';
import "./styles.css"

export const LoginForm = () => {
    const [postData, setPostData] = useState({firstName: "", lastName: "", email: "", password: "", userName: ""});
    const [errorMessage, setErrorMessage] = useState({status: false, element: "", color:""});

    const handleTime = () => {
        setTimeout(() => {
            setErrorMessage({status:false, element:"", color:""})
        }, 4000)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!postData.firstName){
            setErrorMessage({status:true, element:"first name is required..", color:"red"})
            handleTime()
        }
        else if (!postData.lastName){
            setErrorMessage({status:true, element:"last name is required..", color:"red"})
            handleTime()
        }
        else if (!postData.email){
            setErrorMessage({status:true, element:"email is required..", color:"red"})
            handleTime()
        }
        else if (!postData.password){
            setErrorMessage({status:true, element:"password is required..", color:"red"})
            handleTime()
        }
        else if (!postData.userName){
            setErrorMessage({status:true, element:"user name is required..", color:"red"})
            handleTime()
        }
        else{
            console.log(postData, "user")
            try{
                const { data } = await axios.post("http://localhost:5000/users", postData, {
                    headers:{
                        'Content-Type':"application/json"
                    }
                });
                const { user } = data;
                if (user){
                    setErrorMessage({status: true, element:"User created successfully", color:"green"});
                    handleTime()
                }
            }catch(err){
                console.log(err)
                if (err.response.data.err.keyValue.userName !== undefined){
                    setErrorMessage({status: true, element:"Username is already taken choose a different one", color:"red"});
                    handleTime()
                }else if(err.response.data.err.errors.email){
                    setErrorMessage({status: true, element:err.response.data.err.errors.email.message, color:"red"});
                    handleTime()
                }
            }
        }
    }
    return <>
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-input">
                <label htmlFor="firstName">First Name: </label>
                <input onChange={(e) => setPostData({...postData, firstName:e.currentTarget.value})} type="text" name="firstName"/>
            </div>
            <div className="form-input">
                <label htmlFor="lastName">Last Name: </label>
                <input onChange={(e) => setPostData({...postData, lastName:e.currentTarget.value})} type="text" name="lastName"/>
            </div>
            <div className="form-input">
                <label htmlFor="email">E-mail: </label>
                <input onChange={(e) => setPostData({...postData, email:e.currentTarget.value})} type="text" name="email"/>
            </div>
            <div className="form-input">
                <label htmlFor="password">Password: </label>
                <input onChange={(e) => setPostData({...postData, password:e.currentTarget.value})} type="password" name="password"/>
            </div>
            <div className="form-input">
                <label htmlFor="userName">User Name: </label>
                <input onChange={(e) => setPostData({...postData, userName:e.currentTarget.value})} type="text" name="userName"/>
            </div>
            <button className="submit-btn" type="submit">Submit</button>
            {errorMessage.status && <p> <span className={`${errorMessage.color}`}>{errorMessage.element}</span> </p> }
        </form>
    </>
}