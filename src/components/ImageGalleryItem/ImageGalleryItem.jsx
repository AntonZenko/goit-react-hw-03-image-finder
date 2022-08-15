import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
import { Component } from 'react';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  state = {
    isOpen: false,
  };

  // toggle = () => {
  //   this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  // };

  render() {
    // const { isOpen } = this.state;
    // console.log(this.props);
    const { largeImageURL, webformatURL, tags } = this.props;

    return (
      <>
        <GalleryItem onClick={this.toggle}>
          <GalleryImage src={webformatURL} alt={tags} />
        </GalleryItem>
        {/* {isOpen && (
          <Modal toggle={this.toggle} image={largeImageURL} tags={tags} />
        )} */}
      </>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
};
