import { useEffect, useState } from "react";

import axios from "axios";
import { v4 as uuid } from "uuid";

const ArticleList = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getAllArticles();
  }, [articles]);

  // GET ALL
  const getAllArticles = async () => {
    const response = await axios.get("http://localhost:4000/articles");
    setArticles(response.data);
  };
  //DELETE
  const deleteArticle = async (id) => {
    const response = await axios.delete(`http://localhost:4000/articles/${id}`);
    // setArticles(response.data);
  };

  //ADD
  const titleInput = (e) => {
    setTitle(e.target.value);
  };
  const descriptionInput = (e) => {
    setDescription(e.target.value);
  };

  const submitArticle = async (e) => {
    e.preventDefault();
    let myProduct = {
      id: uuid(),
      title,
      description,
    };
    setTitle("");
    setDescription("");
    const response = await axios.post(`http://localhost:4000/articles`,myProduct);
  
  };

  return (
    <div>
      <h1>Add Articles</h1>

      <form onSubmit={submitArticle}>
        <div className="form-group my-2">
          <label htmlFor="" className="form-label"></label>
          <input onChange={titleInput} type="text" className="form-control" value={title}/>
        </div>
        <div className="form-group my-2">
          <label htmlFor="" className="form-label"></label>
          <input
            onChange={descriptionInput}
            type="text"
            className="form-control"
            value={description}
          />
        </div>
        <button className="btn btn-success my-2 mb-2">Save</button>
      </form>

      <h1>List of articles</h1>
      <button onClick={getAllArticles} className="btn btn-success">
        Get All
      </button>

      {articles.map((article) => (
        <div key={article.id}>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <button
            onClick={() => deleteArticle(article.id)}
            className="btn btn-danger"
          >
            Delete product
          </button>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
