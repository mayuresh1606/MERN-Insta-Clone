import React, {useState, useEffect} from "react"
import FileBase from "react-file-base64"
import axios from "axios"
import "./styles.css"

export default function Form(){
    const [postData, setPostData] = useState({creator: '', caption: '', location:'', tags: '', selectedFile:''});
    const [errorMessage, setErrorMessage] = useState({status: false, element:"location", color:""})
    const handleTime = () => {
        setTimeout(() => {
            setErrorMessage({status:false, element:"Location"})
        }, 4000)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!postData.creator){
            setErrorMessage({status:true, element:"Creator field cannot be blank", color:"red"})
            handleTime()
        }
        else if (!postData.caption){
            setErrorMessage({status:true, element:"Caption field cannot be blank", color:"red"})
            handleTime()
        }
        else if (!postData.location){
            setErrorMessage({status:true, element:"Location field cannot be blank", color:"red"})
            handleTime()
        }
        else if (!postData.tags){
            setErrorMessage({status:true, element:"Tags field cannot be blank", color:"red"})
            handleTime()
        }
        else if (!postData.selectedFile){
            setErrorMessage({status:true, element:"Image field cannot be blank", color:"red"})
            handleTime()
        }
        else{
            const {data: {post}} = await axios.post("http://localhost:5000/posts", {...postData}, {
                headers:{
                    'Content-Type':'application/json'
                }
            })
            console.log(post, "server response");
            if (post){
                setErrorMessage({status:true, element:"Post created successfully", color:"green"})
                handleTime();
            }
        }
    }
    return <>
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-input">
                <label htmlFor="creator">Creator: </label>
                <input onChange={(e) => setPostData({...postData, creator:e.currentTarget.value})} type="text" name="creator"/>
            </div>
            <div className="form-input">
                <label htmlFor="caption">Caption: </label>
                <input onChange={(e) => setPostData({...postData, caption:e.currentTarget.value})} type="text" name="caption"/>
            </div>
            <div className="form-input">
                <label htmlFor="location">Location: </label>
                <input onChange={(e) => setPostData({...postData, location:e.currentTarget.value})} type="text" name="location"/>
            </div>
            <div className="form-input">
                <label htmlFor="tags">Tags: </label>
                <input onChange={(e) => setPostData({...postData, tags:e.currentTarget.value})} type="text" name="tags"/>
            </div>
            <div className="form-input"><label htmlFor="FileBase">Image: </label><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({...postData, selectedFile:base64})}></FileBase></div>
            <button className="submit-btn" type="submit">Submit</button>
            {errorMessage.status && <p> <span className={`${errorMessage.color}`}>{errorMessage.element}</span> </p> }
        </form>
    </>
}