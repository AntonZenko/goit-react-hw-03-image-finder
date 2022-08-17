import { Component } from 'react';
// import PropTypes from 'prop-types';
// import getImages from '../FetchService';
import ImageGalleryItem from '../ImageGalleryItem';
import { ImageGalleryList, Container } from './ImageGallery.styled';
import { Triangle } from 'react-loader-spinner';

class ImageGallery extends Component {
  render() {
    const { hits, error, status } = this.props;
    // console.log(hits);
    // console.log(error);
    // console.log(status);

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
      return <Container>{/* <p message={error.message} />; */}</Container>;
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
