import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

const ImageGallery = ({ images, openModal }) => {
  console.log(images);
  return (
    <ImageGalleryList>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          url={image.webformatURL}
          tags={image.tags}
          openModal={() => openModal(`${image.id}`)}
        />
      ))}
    </ImageGalleryList>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  openModal: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};
