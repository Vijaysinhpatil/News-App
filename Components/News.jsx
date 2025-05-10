import React, { useEffect, useState } from "react";
import techImg from "../assets/images/tech.jpg";
import wordlImg from "../assets/images/world.jpg";
import sportsImg from "../assets/images/sports.jpg";
import scienceImg from "../assets/images/science.jpg";
import healthImg from "../assets/images/health.jpg";
import entertainmentImg from "../assets/images/entertainment.jpg";
import nationImg from "../assets/images/nation.jpg";
import noImg from "../Assets/Images/no-img.png";
import "./News.css";
import NewsModel from "./NewsModel";
import axios from "axios";
// import { use } from "react";

// created an array for different type of categeries of news

const categories = [
  "general",
  "world",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health",
  "nation",
];

const News = () => {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);

  // selected category is used to keep track of selected category which is used in news
  const [selectedCategory, SetSelectedCategory] = useState("general");


  // adding show modal pop to diaplay detailed data about perticular news
  const [showModal , SetShowModal] = useState(false)

// below function will set the selected article,state to the clicked article and set showmodal to true to display modal box
  const [selectedArticle , SetSelectedArticle] = useState(null)


  // fetching G-news API using useEffect hook

  useEffect(() => {
    const fetchNews = async () => {
      const url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&apikey=f08667f503bbc20c6b994d3635255557&lang=en`;
      const responce = await axios.get(url);
      const fetchedNews = responce.data.articles;

      // iterating each item in an array to fetch the imahe present that array
      fetchedNews.forEach((article) => {
        if (!article.image) {
          article.image = noImg;
        }
      });

      console.log("Responce is => ", responce);

      // It display 10 sized array
      console.log("FetchedNews are => ", fetchedNews[0]);

      setHeadline(fetchedNews[0]);

      // it returns a new array with from start index to end index
      //  starting from index 0 to n-1
      setNews(fetchedNews.slice(1, 7));
    };
    fetchNews();
  }, [selectedCategory]);

  // In dependancy array named as selectedCategory it update the category when any chages happed
  // in the dependancy

  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    SetSelectedCategory(category);
  };

  const handleArticleClicked = (article) => {
       SetSelectedArticle(article);
       SetShowModal(true)

  }
  return (
    <div className="news-app">
      <div className="news-header">
        <h1 className="logo">News App</h1>
      </div>
      <div className="news-content">
        <nav className="navbar">
          <h1 className="nav-heading">categories</h1>

          <div className="categories">
            {categories.map((category) => (

              <a href="#" 
              className="nav-link"
              key={category}
              onClick={(e) => handleCategoryClick(e , category)}
              >
                {category}
              </a>
            ))}

          </div>
        </nav>

        {/* news section */}

        <div className="news-section">
          {/* this conditional rendering use when we get the error of type reading null type of values */}

          {headline && (
            <div className="headline"
              onClick={() => 
                handleArticleClicked(headline)
              }
            >
              <img src={headline.image || noImg} alt={headline.title} />
              <div className="headline-title">
                <h2>{headline.title}</h2>
              </div>
            </div>
          )}

          <div className="news-grid">
            {news.map((article, index) => (
              <div className="news-grid-item" key={index}
              
              onClick={() => 
                handleArticleClicked(article)
              }

              >
                <img src={article.image || noImg} alt={article.title} />
                <h3>{article.title}</h3>
              </div>
            ))}
          </div>
        </div>
        
        {/* show model used to control the visibility */}
        <NewsModel show = {showModal} 
          article = {selectedArticle}
          onClose = {() => SetShowModal(false)}

        />
      </div>
    



      {/* Footer */}

      <footer>
        <p className="copyright"> </p>
        <span>News App</span>
        <p>&copy; All Rights Reserved</p>
      </footer>
    </div>
  );
};
export default News;
