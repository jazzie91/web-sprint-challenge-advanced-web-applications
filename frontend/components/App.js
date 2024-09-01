import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import axios from 'axios'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  const navigate = useNavigate()
  const redirectToLogin = () => {
    navigate('/');
  }
  const redirectToArticles = () => {
    navigate('/articles');
  }

  const logout = () => {
    try {
    localStorage.removeItem('token');
    setMessage('Goodbye!');
    redirectToLogin();
  } catch (error) {
    console.error(error);
  }
}


const login = ({ username, password }) => {
  setMessage('');
  setSpinnerOn(true);

  axios.post(loginUrl, { username, password })
    .then(response => {
      localStorage.setItem('token', response.data.token);
      setMessage(response.data.message);
      redirectToArticles();
    })
    .catch(error => {
      setMessage('Login failed. ' + error.message);
    })
    .finally(() => setSpinnerOn(false));
};

  const getArticles = () => {                                                                                                                                                       546 ,
    setSpinnerOn(true)
    setMessage('')
    axios.get(articlesUrl, { headers: { Authorization: localStorage.getItem('token') } })
      .then(res => {
        setMessage(res.data.message)
        setArticles(res.data.articles)
      })
      .catch(err => {
        setMessage(err?.response?.data?.message || 'Something bad happened')
        if (err.response.status == 401) {
          redirectToLogin()
        }
      })
      .finally(() => {
        setSpinnerOn(false)
      })
  }
  const postArticle = article => {
    setSpinnerOn(true)
    setMessage('')
    axios.post(articlesUrl, article, { headers: { Authorization: localStorage.getItem('token') }})
      .then(res => {
        setMessage(res.data.message)
        setArticles([...articles, res.data.article])
      })
      .catch(err => {
        setMessage(err?.response?.data?.message || 'Something bad happened')
        if (err.response.status == 401) {
          redirectToLogin()
        }
      })
      .finally(() => {
        setSpinnerOn(false)
      })
  }

  const updateArticle = ({ article_id, article }) => {
    setSpinnerOn(true)
    setMessage('')
    axios.put(`${articlesUrl}/${article_id}`, article, { headers: { Authorization: localStorage.getItem('token') } })
      .then(res => {
        setMessage(res.data.message)
        setArticles(articles.map(art => (art.id === article_id ? res.data.article : art)))
      })
      .catch(err => {
        setMessage(err?.response?.data?.message || 'Something bad happened')
        if (err.response.status === 401) {
          redirectToLogin()
        }
      })
      .finally(() => {
        setSpinnerOn(false)
      })
  }

  const deleteArticle = article_id => {
    setSpinnerOn(true)
    setMessage('')
    try {
      axios.delete(`${articlesUrl}/${article_id}`, { headers: { Authorization: localStorage.getItem('token') } })
        .then(res => {
          setMessage(res.data.message)
          setArticles(articles.filter(art => art.id !== article_id))
        })
        .catch(err => {
          setMessage(err?.response?.data?.message || 'Something bad happened')
          if (err.response.status == 401) {
            redirectToLogin()
          }
        })
    } catch (error) {
      console.error(error)
    } finally {
      setSpinnerOn(false)
    }
  }

  return (
    <>
       <Spinner on ={true} />
      <Message message={message} />
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login} />} />
          <Route path="articles" element={
            <>
              <ArticleForm 
                postArticle={postArticle} 
                updateArticle={updateArticle} 
                setCurrentArticleId={setCurrentArticleId}
                currentArticle={articles.find(art => art.id === currentArticleId)}
                
              />
              <Articles 
                articles={articles} 
                getArticles={getArticles} 
                deleteArticle={deleteArticle} 
                setCurrentArticleId={setCurrentArticleId}
              />
            </>
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2024</footer>
      </div>
    </>
  )
}
