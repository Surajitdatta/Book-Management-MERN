import React, { useState, useEffect } from 'react';
import './Show.css'; 
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Search from './Search';

const Show = () => {
  const [showModal, setShowModal] = useState(false);
  const [book, setBook] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [id, setId] = useState('');

  const navigate = useNavigate();
  
  const dataFetch = () => {
    axios
      .get('http://localhost:5000/')
      .then((res) => setBook(res.data))
      .catch((error) => {
        console.error('There was an error fetching data!');
      });
  };

  useEffect(() => {
    dataFetch();
  }, []);

  const openModal = (book) => {
    setSelectedBook(book);
    setShowModal(true);
    setTitle(book.title);
    setAuthor(book.author);
    setYear(book.publishYear);
    setId(book._id); 
  };

  const closeModal = () => {
    setSelectedBook(null);
    setShowModal(false);
  };

  const handleUpdate = () => {
    const data = {
      title: title,
      author: author,
      publishYear: year,
    };

    axios
      .put(`http://localhost:5000/books/${id}`, data)
      .then((res) => {
        if (!res.data.data.title.trim() || !res.data.data.author.trim() || !res.data.data.publishYear) {
          return toast.error("All fields are required");
        }

        const updatedBooks = book.map((b) => (b._id === id ? { ...b, ...data } : b));
        setBook(updatedBooks);
        toast.success("Data Has Been Updated");
        closeModal(); 
      })
      .catch((error) => {
        console.error('There was an error updating the book data!', error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/books/${id}`)
      .then((res) => {
        dataFetch();
        toast.success("Data deleted successfully");
      })
      .catch((err) => {
        toast.error("Issue to delete data");
      });
  };

  const view = (book) => {
    navigate("/view", { state: { book } });
  };

  // Filtered books based on the search term
  const filteredBooks = book.filter((b) => {
    return (
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.publishYear.toString().includes(searchTerm)
    );
  });

  return (
    <div className="show-container">
      <h1 className="show-title">Book List</h1>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <table className="book-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publish Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publishYear}</td>
              <td>
                <button className="edit-btn" onClick={() => openModal(book)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(book._id)}>Delete</button>
                <button className="edit-btn" style={{ background: "green" }} onClick={() => view(book)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for editing */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Book</h2>
            <form>
              <div className="form-group">
                <label htmlFor="modal-title">Title</label>
                <input
                  type="text"
                  id="modal-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="modal-author">Author</label>
                <input
                  type="text"
                  id="modal-author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="modal-publishYear">Publish Year</label>
                <input
                  type="number"
                  id="modal-publishYear"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              <button className="close-btn" type="button" onClick={handleUpdate}>
                Update
              </button><br/><br/>
              <button className="close-btn" type="button" onClick={closeModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Show;
