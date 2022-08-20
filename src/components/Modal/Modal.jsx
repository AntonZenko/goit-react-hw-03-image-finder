import PropTypes from 'prop-types';
import { Component } from 'react';
import { Overlay, ModalBody, Image } from './Modal.styled';

class Modal extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    modalId: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  closeModal = event => {
    (event.key === 'Escape' || event.target === event.currentTarget) &&
      this.props.closeModal();
  };

  render() {
    const { modalId, images } = this.props;
    return (
      <Overlay onClick={this.closeModal}>
        <ModalBody>
          {images.map(image =>
            modalId === `${image.id}` ? (
              <Image
                src={image.largeImageURL}
                alt={image.tags}
                key={image.id}
              />
            ) : null
          )}
        </ModalBody>
      </Overlay>
    );
  }
}

export default Modal;

Modal.propTypes = {
  images: PropTypes.array.isRequired,
  modalId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
