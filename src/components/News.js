import React, { Component } from 'react';
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
export class News extends Component {

 static defaultProps={
   category: "general",
   pageSize: 8
 }
 static propTypes={
  category: PropTypes.string,
  pageSize: PropTypes.number

 }
 capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }
  constructor(){
    super();
    this.state = {
       articles :[],
       loading: false,
       page: 1,
      totalResults: 0
    };
    this.pageSize = 20;

  }

  async componentDidMount(){
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData= await data.json()
    console.log(parseData);
   this.setState({
      articles: parseData.articles || [],
      totalResults: parseData.totalResults || 0,
      loading: false
    });

  }

 handlePageChange = async (newPage) => {
  this.setState({ loading: true });
  let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apikey}&page=${newPage}&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);
  let parseData = await data.json();
  this.setState({
    page: newPage,
    articles: parseData.articles || [],
    loading: false
  });
}

 handlePrevbtn = () => {
    if (this.state.page > 1) {
      this.handlePageChange(this.state.page - 1);
    }
  };

  handleNextbtn = () => {
    const maxPage = Math.ceil(this.state.totalResults / this.props.pageSize);
    if (this.state.page < maxPage) {
      this.handlePageChange(this.state.page + 1);
    }
  };
  render() {
    const {page, totalResults, loading } = this.state;
    const maxPage = Math.ceil(totalResults / this.props.pageSize);
    return (
      <div className="container my-3">
      
          <h2 className='text-center'>
          NewsFaleti - {this.capitalizeFirstLetter(this.props.category)} Top Headlines
        </h2>
       {loading && <Spinner />}
        <div className='row'>
        {!loading && this.state.articles.map((element)=>{
          return <div className='col-md-3' key={element.url}>
          <NewsItems  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imgUrl={element.urlToImage} newsUrl={element.url}
          author={element.author ? element.author: "unknown"}  date={element.publishedAt ? new Date(element.publishedAt).toGMTString() : "Unknown"} />
        </div>
        })}

        </div>
        <div className='container d-flex justify-content-between'>
          <button  disabled={page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevbtn}>&larr; Previous</button>
          <button disabled={page >= maxPage} type="button" className="btn btn-dark" onClick={this.handleNextbtn}>Next 	&rarr;</button>

        </div>
        </div>
   
    );
  }
}

export default News;