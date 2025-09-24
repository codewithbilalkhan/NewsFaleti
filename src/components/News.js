import React, { useState, useEffect } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const News = ({ category, pageSize, apikey }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  };

  const fetchNews = async (pageNumber = 1) => {
    setLoading(true);
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apikey}&page=${pageNumber}&pageSize=${pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(parseData.articles || []);
    setTotalResults(parseData.totalResults || 0);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews(page);
   
  }, [category, page]); 

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchNews(newPage);
  };

  const handlePrevbtn = () => {
    if (page > 1) {
      handlePageChange(page - 1);
    }
  };

  const handleNextbtn = () => {
    const maxPage = Math.ceil(totalResults / pageSize);
    if (page < maxPage) {
      handlePageChange(page + 1);
    }
  };

  const maxPage = Math.ceil(totalResults / pageSize);

  return (
    <div className="container my-3">
      <h2 className="text-center"  style={{ marginTop: "90px" }}>
        NewsFaleti - {capitalizeFirstLetter(category)} Top Headlines
      </h2>

      {loading && <Spinner />}

      <div className="row">
        {!loading &&
          articles.map((element) => (
            <div className="col-md-3" key={element.url}>
              <NewsItems
                title={element.title ? element.title.slice(0, 45) : ""}
                description={
                  element.description ? element.description.slice(0, 88) : ""
                }
                imgUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author ? element.author : "unknown"}
                date={
                  element.publishedAt
                    ? new Date(element.publishedAt).toGMTString()
                    : "Unknown"
                }
              />
            </div>
          ))}
      </div>

      <div className="container d-flex justify-content-between">
        <button
          disabled={page <= 1}
          type="button"
          className="btn btn-dark"
          onClick={handlePrevbtn}
        >
          &larr; Previous
        </button>
        <button
          disabled={page >= maxPage}
          type="button"
          className="btn btn-dark"
          onClick={handleNextbtn}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

News.defaultProps = {
  category: "general",
  pageSize: 8,
};

News.propTypes = {
  category: PropTypes.string,
  pageSize: PropTypes.number,
  apikey: PropTypes.string.isRequired,
};

export default News;
