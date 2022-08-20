import { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Form, Button, ButtonLabel, Input } from './Searchbar.styled';
import { FiSearch } from 'react-icons/fi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  state = {
    searchValue: '',
  };

  handleNameChange = e => {
    this.setState({ searchValue: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchValue.trim() === '') {
      Notify.warning('Type something in the searchbar');
      return;
    }

    this.props.onSubmit(this.state.searchValue);
    this.setState({ searchValue: '' });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <FiSearch stroke="#3f51b5" size="24px" />
            <ButtonLabel></ButtonLabel>
          </Button>

          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="input"
            value={this.state.searchValue}
            onChange={this.handleNameChange}
          />
        </Form>
      </Header>
    );
  }
}

export default Searchbar;
