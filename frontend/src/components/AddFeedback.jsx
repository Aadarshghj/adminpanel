import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';

function AddFeedback() {
  const [formData, setFormData] = useState({
    courseName: '',
    courseDuration: '',
    feedbackComments: '',
    feedbackRating: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/feedbacks', formData).then(() => {
      setFormData({ courseName: '', courseDuration: '', feedbackComments: '', feedbackRating: '' });
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Course Name" name="courseName" value={formData.courseName} onChange={handleChange} required />
      <TextField label="Course Duration" name="courseDuration" value={formData.courseDuration} onChange={handleChange} required />
      <TextField label="Feedback Comments" name="feedbackComments" value={formData.feedbackComments} onChange={handleChange} required />
      <TextField label="Feedback Rating" name="feedbackRating" type="number" value={formData.feedbackRating} onChange={handleChange} required />
      <Button variant="contained" type="submit">Submit</Button>
    </Box>
  );
}

export default AddFeedback;
