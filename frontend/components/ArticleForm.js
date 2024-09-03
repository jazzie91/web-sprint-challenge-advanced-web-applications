import React, { useEffect, useState } from 'react';
import PT from 'prop-types';

const initialFormValues = { title: '', text: '', topic: '' };

export default function ArticleForm({ postArticle, updateArticle, setCurrentArticleId, articles, currentArticleId }) {
  const [values, setValues] = useState(initialFormValues);

  useEffect(() => {
    if (currentArticleId && articles.length > 0) {
      const current = articles.find(article => article.article_id === currentArticleId);
      if (current) {
        setValues(current);
      }
      
    } else {
      setValues(initialFormValues);
    }
  }, [currentArticleId, articles]);
  

  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues({ ...values, [id]: value });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    console.log(evt);
    if (currentArticleId) {
      let articleData = {
        article_id: currentArticleId,
        article: values,
      };
      updateArticle(articleData)
        .then(() => {
          setValues(initialFormValues);
        })
        .catch((error) => {
          console.error("Error updating article:", error);
        });
    } else {
      postArticle(values)
        .then(() => {
          console.log("Article posted successfully");
          setValues(initialFormValues);
        })
        .catch((error) => {
          console.error("Error posting article:", error);
        });
    }
  };
  

  const isDisabled = () => {
    return Object.values(values).some(value => !value.trim());
  };

  const reset = () => {
    setValues(initialFormValues);
    setCurrentArticleId(null);
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create Article</h2>
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
        
          <button type="button" onClick={(e) => reset(e)}>Cancel Edit</button>
        
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
