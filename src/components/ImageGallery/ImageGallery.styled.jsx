import styled from 'styled-components';

export const ImageGalleryList = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 16px 0 16px;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40vh;
  font-weight: 500;
`;
