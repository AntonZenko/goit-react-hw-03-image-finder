import { Component } from 'react';
import PropTypes from 'prop-types';
import getImages from '../FetchService';
import ImageGalleryItem from '../ImageGalleryItem';
import { ImageGalleryList, Container } from './ImageGallery.styled';
import { Triangle } from 'react-loader-spinner';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends Component {
  static propTypes = {
    searchValue: PropTypes.string.isRequired,
  };
  state = {
    hits: [],
    error: null,
    status: Status.IDLE,
    // page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevValue = prevProps.searchValue;
    const nextValue = this.props.searchValue;

    const ifRequestOk = data => {
      if (data.totalHits === 0 && Notify.failure('Ничего не найдено')) {
        return;
      }
      this.setState(
        this.state.page === 1
          ? {
              hits: [...data.hits],
              // totalHits: data.totalHits,
            }
          : { hits: [...prevState.hits, ...data.hits] }
      );
    };

    if (prevValue !== nextValue) {
      this.setState({ hits: [], status: Status.PENDING });
      setTimeout(() => {
        getImages(nextValue, this.props.page)
          .then(res => {
            ifRequestOk(res);
            this.setState({ status: Status.RESOLVED });
          })
          .catch(err => this.setState({ error: err }));
      }, 1000);
    }
  }
  render() {
    const { hits, error, status } = this.state;

    if (status === 'idle') {
      return <Container>Look for images right now!</Container>;
    }

    if (status === 'pending') {
      return (
        <Container>
          <Triangle color="#3f51b5" />
        </Container>
      );
    }

    if (status === 'rejected') {
      return (
        <Container>
          <p message={error.message} />;
        </Container>
      );
    }

    if (status === 'resolved') {
      return (
        <ImageGalleryList>
          {hits.map(image => (
            <ImageGalleryItem key={image.id} {...image} />
          ))}
        </ImageGalleryList>
      );
    }
  }
}

export default ImageGallery;
