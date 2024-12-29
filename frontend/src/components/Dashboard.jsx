import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';

function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editId, setEditId] = useState(null); // Track the ID being edited
  const [editData, setEditData] = useState({
    courseName: '',
    courseDuration: '',
    feedbackComments: '',
    feedbackRating: ''
  });

  // Fetch feedbacks on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/feedbacks').then(res => setFeedbacks(res.data));
  }, []);

  // Delete a feedback entry
  const deleteFeedback = (id) => {
    axios.delete(`http://localhost:5000/feedbacks/${id}`).then(() => {
      setFeedbacks(feedbacks.filter(feedback => feedback._id !== id));
    });
  };

  // Start editing a feedback entry
  const startEdit = (feedback) => {
    setEditId(feedback._id);
    setEditData({
      courseName: feedback.courseName,
      courseDuration: feedback.courseDuration,
      feedbackComments: feedback.feedbackComments,
      feedbackRating: feedback.feedbackRating
    });
  };

  // Handle input changes in the edit form
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Save edited feedback
  const updateFeedback = (id) => {
    axios.put(`http://localhost:5000/feedbacks/${id}`, editData).then((res) => {
      setFeedbacks(feedbacks.map(feedback => (feedback._id === id ? res.data : feedback)));
      setEditId(null); // Exit edit mode
      setEditData({ courseName: '', courseDuration: '', feedbackComments: '', feedbackRating: '' });
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditId(null);
    setEditData({ courseName: '', courseDuration: '', feedbackComments: '', feedbackRating: '' });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Course Name</TableCell>
            <TableCell>Course Duration</TableCell>
            <TableCell>Feedback Comments</TableCell>
            <TableCell>Feedback Rating</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {feedbacks.map(feedback => (
            <TableRow key={feedback._id}>
              {editId === feedback._id ? (
                <>
                  {/* Editable Fields */}
                  <TableCell>
                    <TextField
                      name="courseName"
                      value={editData.courseName}
                      onChange={handleEditChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="courseDuration"
                      value={editData.courseDuration}
                      onChange={handleEditChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="feedbackComments"
                      value={editData.feedbackComments}
                      onChange={handleEditChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="feedbackRating"
                      type="number"
                      value={editData.feedbackRating}
                      onChange={handleEditChange}
                    />
                  </TableCell>
                  <TableCell>
                    <Button color="success" onClick={() => updateFeedback(feedback._id)}>Save</Button>
                    <Button color="inherit" onClick={cancelEdit}>Cancel</Button>
                  </TableCell>
                </>
              ) : (
                <>
                  {/* Display Fields */}
                  <TableCell>{feedback.courseName}</TableCell>
                  <TableCell>{feedback.courseDuration}</TableCell>
                  <TableCell>{feedback.feedbackComments}</TableCell>
                  <TableCell>{feedback.feedbackRating}</TableCell>
                  <TableCell>
                    <Button color="primary" onClick={() => startEdit(feedback)}>Edit</Button>
                    <Button color="error" onClick={() => deleteFeedback(feedback._id)}>Delete</Button>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Dashboard;
