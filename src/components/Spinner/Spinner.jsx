import { LoaderWrapper } from './Spinner.styled';
import { Triangle } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <LoaderWrapper>
      <Triangle
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    </LoaderWrapper>
  );
};
export default Spinner;
