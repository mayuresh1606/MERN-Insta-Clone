import React, {useState, useEffect} from "react"
import FileBase from "react-file-base64"
import axios from "axios"
import "./styles.css"

export default function Form(){
    const [postData, setPostData] = useState({creator: '', caption: '', location:'', tags: '', selectedFile:''});
    const [errorMessage, setErrorMessage] = useState({status: false, element:"location"})
    const handleTime = () => {
        setTimeout(() => {
            setErrorMessage({status:false, element:"location"})
        }, 4000)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!postData.creator){
            setErrorMessage({status:true, element:"creator"})
            handleTime()
        }
        else if (!postData.caption){
            setErrorMessage({status:true, element:"caption"})
            handleTime()
        }
        else if (!postData.location){
            setErrorMessage({status:true, element:"location"})
            handleTime()
        }
        else if (!postData.tags){
            setErrorMessage({status:true, element:"tags"})
            handleTime()
        }
        else if (!postData.selectedFile){
            setErrorMessage({status:true, element:"Image"})
            handleTime()
        }
        // else{
        //     await axios.post(postData)
        // }
    }
    return <>
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-input">
                <label for="creator">Creator: </label>
                <input onChange={(e) => setPostData({...postData, creator:e.currentTarget.value})} type="text" name="creator"/>
            </div>
            <div className="form-input">
                <label for="caption">Caption: </label>
                <input onChange={(e) => setPostData({...postData, caption:e.currentTarget.value})} type="text" name="caption"/>
            </div>
            <div className="form-input">
                <label for="location">Location: </label>
                <input onChange={(e) => setPostData({...postData, location:e.currentTarget.value})} type="text" name="location"/>
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