import React, { useEffect, useState } from 'react';
import PT from 'prop-types';

const initialFormValues = { title: '', text: '', topic: '' };

export default function ArticleForm(props) {
  const [values, setValues] = useState(initialFormValues);
  const { postArticle, updateArticle, setCurrentArticleId, currentArticle } = props

  useEffect(() => {
    if (currentArticle) {
      setValues({
        title: currentArticle.title,
        text: currentArticle.text,
        topic: currentArticle.topic
    })     
    } else {
      setValues(initialFormValues);
    }
  }, [currentArticle]);
  

  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues({ ...values, [id]: value });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
   
    currentArticle
    ? updateArticle({article_id: currentArticle.article_id, article: values})
    : postArticle(values)
    setCurrentArticleId()
    setValues(initialFormValues)
  }

  const isDisabled = () => {
    return Object.values(values).some(value => !value.trim());
  };

  
  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>{currentArticle ? 'Edit' : 'Create'} Article</h2>
      <input
        maxLength={50}
        onChange={handleChange}
        value={values.title}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={handleChange}
        value={values.text}
        placeholder="Enter text"
        id="text"
      />
      <select value={values.topic} onChange={handleChange} id="topic">
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      <div className="button-group">
        <button type="submit" disabled={isDisabled()} id="submitArticle">Submit</button>
        
          {currentArticle && <button type="button" onClick={() => setCurrentArticleId()}>Cancel Edit</button>}
        
      </div>
    </form>
  );
}

ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({
    article_id: PT.number,
    title: PT.string,
    text: PT.string,
    topic: PT.string,
  })
};
