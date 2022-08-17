import React from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import { Component } from 'react';
// import PropTypes from 'prop-types';
import getImages from './FetchService';
// import { Triangle } from 'react-loader-spinner';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    hits: [],
    searchValue: '',
    page: 0,
    totalPages: null,
    status: Status.IDLE,
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.setState({ status: Status.PENDING });
      const images = await getImages(this.state.searchValue, this.state.page);
      this.setState({
        hits: [...prevState.hits, ...images.hits],
        status: Status.RESOLVED,
      });
    }
    setTimeout(
      () =>
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          left: 0,
          behavior: 'smooth',
        }),
      350
    );
  }
  handleFormSubmit = async e => {
    e.preventDefault();
    const searchValue = e.currentTarget.input.value.trim();
    console.log(searchValue);
    const page = 1;

    if (searchValue === '') {
      Notify.warning('Type something in the searchbar');
      return;
    }

    this.setState({ status: Status.PENDING });
    const images = await getImages(searchValue, page);
    this.setState({ status: Status.REJECTED });

    if (images.hits.length === 0) {
      Notify.failure(
        `There were no results found for "${this.state.searchValue}"`,
        {
          timeout: 3000,
        }
      );
      return;
    }

    const totalPages = Math.floor(images.totalHits / 12);

    this.setState({
      hits: images.hits,
      searchValue: searchValue,
      page: page,
      totalPages: totalPages,
    });
  };

  changePage = () => {
    this.setState(() => ({ page: this.state.page + 1 }));
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery status={this.state.status} hits={this.state.hits} />
        {this.state.hits.length === 0 || this.state.status === 'pending' || (
          <Button onClick={this.changePage} />
        )}
      </>
    );
  }
}

export default App;

// if (prevState.searchValue !== this.state.searchValue) {
//   this.setState({ status: Status.PENDING });
//   const images = await getImages(this.state.searchValue, this.state.page);
//   const totalPages = Math.floor(images.totalHits / 12);
//   this.setState({
//     hits: images.hits,
//     totalPages: totalPages,
//     status: Status.RESOLVED,
//   });
//   // console.log(totalPages);
//   if (images.totalHits === 0) {
//     Notify.failure(
//       `There were no results found for "${this.state.searchValue}"`,
//       {
//         timeout: 3000,
//       }
//     );
//   }
//   if (images.totalHits > 0) {
//     Notify.info(`Аound ${images.totalHits} pictures`, {
//       timeout: 3000,
//     });
//   }
//   console.log(this.state.page, this.state.totalPages);
// }
