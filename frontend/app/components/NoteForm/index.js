/**
 *
 * NoteForm
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import TextInput from 'components/TextInput';
import TagsInput from 'components/TagsInput';
import {Alert, Button, Form, Label, FormGroup, FormFeedback} from 'reactstrap';







/* eslint-disable react/prefer-stateless-function */
class NoteForm extends React.Component {

  state = {
    image: null,
    title: '',
    body: '',
    tags: [],
  };

  handleInputChange = (event) => {
    const target = event.target,
      value = target.type ===
      'checkbox' ? target.checked : target.value,
      name = target.name;
    this.setState({
      [name]: value
    });
  };

  handleFileInputChange = (event) => {
    const image = event.target.files[0] !== undefined?
      event.target.files[0] : null;
    this.setState({
      image: image,
    })
  };

  onSubmit = (e) => {
    if (e !== undefined && e.preventDefault) e.preventDefault();
    const tags = this.state.tags.map(tag => parseInt(tag.id));
    this.props.onSubmit(this.state.title, this.state.body, this.state.image, tags);
    this.setState({
      image: null,
      title: '',
      body: '',
      tags: [],
    });
  };

  handleSelectedTags = (newTags) => {
    this.setState({tags: newTags})
  };

  render() {
    const errors = this.props.errors || {}

    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          {
            errors.non_field_errors ?
              <Alert color="danger">
                {errors.non_field_errors}
              </Alert> : ""
          }
          <TextInput label="Image" type="file" name="image"
                     id="ImageField" error={errors.image} onChange={this.handleFileInputChange} />
          <TextInput label="Title" type="text" name="title"
                     id="TitleField" placeholder="Enter Title" value={this.state.title} error={errors.title} onChange={this.handleInputChange}/>
          <TextInput label="Body" type="textarea" name="body"
                     id="BodyField" placeholder="Enter Body" value={this.state.body} error={errors.body} onChange={this.handleInputChange}/>
          <TagsInput tags={this.state.tags} handleSelectedTags={this.handleSelectedTags} error={errors.tags} />
          <Button color="primary">Add Note</Button>
        </Form>
      </div>
    );
  }
}

NoteForm.propTypes = {};

export default NoteForm;
