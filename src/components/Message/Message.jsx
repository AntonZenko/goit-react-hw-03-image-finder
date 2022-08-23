import { Message, MessageWrapper } from './Message.styled';
import PropTypes from 'prop-types';
const Title = ({ text }) => {
  return (
    <MessageWrapper>
      <Message>{text}</Message>
    </MessageWrapper>
  );
};
export default Title;

Title.propTypes = {
  text: PropTypes.string.isRequired,
};
