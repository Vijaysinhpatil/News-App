import React from "react";
import demoImg from "../Assets/Images/demo.jpg";
import "./NewsModal.css";

const NewsModel = ({ show, article, onClose }) => {
  if (!show) {
    // used to control the redering of the model component
    return null;
  }
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>

        {article && (
          <>
            <img src={article.image} alt={article.title} className="modal-image" />
            <h2 className="modal-title">
                {article.title}
            </h2>
            <p className="modal-source">Source : 
            
                {article.source.name}

            </p>
            <p className="modal-date">{
                new Date(article.publishedAt).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                 month: "short",
                day: "2-digit",
                 year: "numeric",
                 hour: "2-digit",
                 minute: "2-digit",
              
             })

                }</p>
            <p className="modal-content-text">
             {
                article.content
             }
            </p>
            <a href={article.url} 
            target="_blank"
            rel="noopener noreferrer"
            className="read-more-link">
              Read More
            </a>
          </>
        )}
      </div>
    </div>
  );
};
export default NewsModel;
