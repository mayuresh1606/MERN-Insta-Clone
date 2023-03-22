import React, {useState, useEffect} from "react"
import FileBase from "react-file-base64"
import axios from "axios"
import "./styles.css"

export default function Form(){
    const [postData, setPostData] = useState({creator: '', title: '', message:'', tags: '', selectedFile:''});
    const [errorMessage, setErrorMessage] = useState({status: true, element:"message", message: `cannot be blank`})
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(postData);
    }
    return <>
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-input">
                <label for="creator">Creator: </label>
                <input onChange={(e) => setPostData({...postData, creator:e.currentTarget.value})} type="text" name="creator"/>
            </div>
            <div className="form-input">
                <label for="title">Title: </label>
                <input onChange={(e) => setPostData({...postData, title:e.currentTarget.value})} type="text" name="title"/>
            </div>
            <div className="form-input">
                <label for="message">Message: </label>
                <input onChange={(e) => setPostData({...postData, message:e.currentTarget.value})} type="text" name="message"/>
            </div>
            <div className="form-input">
                <label for="tags">Tags: </label>
                <input onChange={(e) => setPostData({...postData, tags:e.currentTarget.value})} type="text" name="tags"/>
            </div>
            <div className="form-input"><label for="FileBase">Image: </label><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({...postData, selectedFile:base64})}></FileBase></div>
            <button className="submit-btn" type="submit">Submit</button>
            {errorMessage.status && <p> <span className="error-field">{errorMessage.element}</span> field cannot be blank</p> }
        </form>
    </>
}