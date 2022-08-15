import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { Triangle } from 'react-loader-spinner';

class App extends Component {
  state = {
    searchValue: '',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {}

  handleFormSubmit = searchValue => {
    this.setState({ searchValue });
  };

  changePage = () => {
    this.setState(() => ({ page: this.state.page + 1 }));
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchValue={this.state.searchValue} />
        <Button onClick={this.changePage} />
      </>
    );
  }
}

export default App;
