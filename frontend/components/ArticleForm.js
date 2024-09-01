import React, { useEffect, useState } from 'react'
import PT from 'prop-types'

const initialFormValues = { title: '', text: '', topic: '' }

export default function ArticleForm({ postArticle, updateArticle, setCurrentArticleId, currentArticle }) {
  const [values, setValues] = useState(initialFormValues)

    useEffect(() => {
      setValues(currentArticle ? { title: currentArticle.title, text: currentArticle.text, topic: currentArticle.topic } : initialFormValues);
    }, [currentArticle]);

    const onChange = ({ target: { id, value } }) => {
      setValues({ ...values, [id]: value });
    };

  const onSubmit = evt => {
    evt.preventDefault()
    if (currentArticle) {
      updateArticle({ article_id: currentArticle.article_id, article: values })
    } else {
      postArticle(values)
    }
    setValues(initialFormValues)
    setCurrentArticleId(null)
  }

  const isDisabled = () => {
    return Object.values(values).every(value => !value.trim()) || Object.values(values).some(value => !value.trim())
  }
  
  const reset = () => setValues(initialFormValues);

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>{currentArticle ? 'Edit' : 'Create'} Article</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={values.title}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={values.text}
        placeholder="Enter text"
        id="text"
      />
      <select onChange={onChange} id="topic" value={values.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      <div className="button-group">
        <button disabled={isDisabled()} id="submitArticle">Submit</button>
        {currentArticle && (
          <button type="button" onClick={reset}>Cancel Edit</button>
        )}
      </div>
    </form>
  )
}

// 🔥 No touchy: ArticleForm expects the following props exactly:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({ // can be null or undefined, meaning "create" mode (as opposed to "update")
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })
}
