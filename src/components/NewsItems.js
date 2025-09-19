import React, { Component } from "react";

export class NewsItems extends Component {
  render() {
    let { title, description, imgUrl, newsUrl, author, date } = this.props;

    return (
      <div className="my-5">
        <div className="card">
          <img src={!imgUrl?"https://image.cnbcfm.com/api/v1/image/108184894-17550206822025-08-12t173750z_397057516_rc26lz9i31dr_rtrmadp_0_usa-texas-eli-lilly.jpeg?v=1758034387&w=1920&h=1080":imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author} on {date}</small></p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">
             Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItems;
