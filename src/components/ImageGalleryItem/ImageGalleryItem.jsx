import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ url, tags, openModal }) => {
  return (
    <>
      <GalleryItem onClick={openModal}>
        <GalleryImage src={url} alt={tags} />
      </GalleryItem>
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
