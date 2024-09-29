import React, { useState } from 'react';
import './Form.css';
import { toast } from 'react-toastify';
import axios from "axios";

const Form = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');


  const validation=()=>{
    return !title.trim() || !author.trim() || !publishYear.trim();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(validation()){
        return toast.error("All input fields are require")
    }

    const data = {
        title:title,
        author:author,
        publishYear:publishYear
    }
    axios.post("http://localhost:5000/books", data).then(res=>{
        toast.success("Data has been submitted")
        setTitle("")
        setAuthor("")
        setPublishYear("")
        return 
    }).catch(error=>{
        console.error("There is an error while posting data")
    })
    
    
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Add a New Book</h1>
      <form className="book-form" >
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            // required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            // required
          />
        </div>
        <div className="form-group">
          <label htmlFor="publishYear">Publish Year:</label>
          <input
            type="number"
            id="publishYear"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            // required
          />
        </div>
        <button type="submit" className="submit-btn" onClick={handleSubmit}>Add Book</button>
      </form>
    </div>
  );
};

export default Form;
