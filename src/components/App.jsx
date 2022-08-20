import React from 'react';
import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import getImages from './FetchService';
import Spinner from './Spinner';
import Message from './Message';
import Modal from './Modal';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class App extends Component {
  state = {
    images: [],
    searchValue: '',
    page: 1,
    totalHits: null,
    loader: false,
    modalId: '',
    error: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.setState({ loader: true });
      const images = await getImages(this.state.searchValue, this.state.page);
      this.setState(() => ({
        images: [...this.state.images, ...images.hits],
        loader: false,
      }));
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }, 300);
    }
  }

  onSubmit = async searchValue => {
    const page = 1;
    this.setState({
      searchValue: searchValue,
      loader: true,
      page: page,
    });
    const images = await getImages(searchValue, page);
    if (images.totalHits === 0) {
      this.setState({ images: [], error: true, loader: false });
      Notify.failure('Nothing found. Try another search.');
      return;
    }
    Notify.info(`Found ${images.totalHits} images`);
    this.setState({
      images: images.hits,
      totalHits: images.totalHits,
      loader: false,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = modalId => {
    this.setState({ modalId });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.images.length !== 0 ? (
          <ImageGallery
            images={this.state.images}
            openModal={this.toggleModal}
          />
        ) : (
          <Message
            text={
              this.state.error
                ? 'Something went wrong :( Try again.'
                : 'Type something to search'
            }
          />
        )}

        {this.state.loader ? <Spinner /> : null}
        {this.state.images.length !== 0 &&
          !this.state.loading &&
          this.state.images.length !== this.state.totalHits && (
            <Button onClick={this.loadMore} />
          )}
        {this.state.modalId && (
          <Modal
            images={this.state.images}
            modalId={this.state.modalId}
            closeModal={this.toggleModal}
          />
        )}
      </>
    );
  }
}

export default App;
