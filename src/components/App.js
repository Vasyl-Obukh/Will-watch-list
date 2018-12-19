import React, { Component } from 'react';
import { moviesData } from "../moviesData";

function MovieWillWatch(props) {
  return (
    <div style={{ position: "fixed" }}>
      <h4>Will Watch: {props.number} movies</h4>
      <ul className="list-group">
        {props.list.map((elem, index) => {
          return (
            <li key={index} className="list-group-item">
              <div className="d-flex justify-content-between">
                <div>{elem.title}</div>
                <div>{elem.vote_average}</div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

class MovieItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      willWatch : false
    }
  }

  handleClick = (event) => {
    this.props.onClick(event);
    this.setState({
      willWatch: !this.state.willWatch
    });
  }

  render() {
    const { item: { title, backdrop_path: path, vote_average } } = this.props;
    return <div className="col-4 mb-4">
        <div className="card" style={{ width: "100%" }}>
          <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500${path}`} alt="" />
          <div className="card-body">
            <h6 className="card-title">{title}</h6>
            <div className="d-flex justify-content-between align-items-center">
              <p className="mb-0">Rating: {vote_average}</p>
              <button type="button" className={`btn ${this.state.willWatch ? "btn-success" : "btn-secondary"}`} title={title} value={vote_average} onClick={this.handleClick}>
                Will Watch
              </button>
            </div>
          </div>
        </div>
      </div>;
  }
}

function MovieList (props) {
  return props.moviesData.map((elem, id) => <MovieItem key={id} item={elem} onClick={props.onClick}/>);
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      moviesData: moviesData,
      moviesWillWatch: []
    }
  }

  handleChange = (event) => {
    let count = 0;
    const len = this.state.moviesWillWatch.length;
    let arr = this.state.moviesWillWatch.slice();
    for (let i = 0; i < len; i++) {
      if (this.state.moviesWillWatch[i].title === event.target.title) {
        count = 1;
        arr.splice(i, 1);
        break;
      }
    }
    this.setState({
      moviesWillWatch: count ? arr : this.state.moviesWillWatch.concat({ title: event.target.title, vote_average: event.target.value })
    });
  }

  render() {
    return <div className="container">
        <div className="row mt-4">
          <div className="col-9">
            <div className="row">
              <MovieList moviesData={moviesData} onClick={this.handleChange} />
            </div>
          </div>
          <div className="col-3">
            <MovieWillWatch number={this.state.moviesWillWatch.length} list={this.state.moviesWillWatch} />
          </div>
        </div>
      </div>;
  }
}

export default App;
