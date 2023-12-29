import React, { useState } from 'react';
import { Box, Button, Avatar } from '@mui/material';

export function ProfilePictureForm({ setActiveStep, onSubmit }) {
  const [selectedFile, setSelectedFile] = useState();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
  setSelectedFile(file);
  await handleFileUpload(file);
  };

  const handleFileUpload = async (file) => {
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/initial-preferences/profile-picture`, {
        method: 'POST',
        body: uploadData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (!res.ok) {
        throw new Error('Error uploading image');
      }

      const data = await res.json();
      console.log(data);
      onSubmit();
    } catch (err) {
      console.error(err);
    }
  };

  // Function to handle form submission
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  return (
    <Box> 
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
  <h1 className="text-base sm:text-xl text-green-900 font-extrabold sm:mx-4 mb-2 sm:py-2">Upload Your Profile Picture</h1>
  <Avatar
    alt="User"
    src={selectedFile ? URL.createObjectURL(selectedFile) : "https://i.ibb.co/Tk3CKq9/profile-Pic-Placeholder.webp"}
    sx={{
      width: 150,
      height: 150,
      bgcolor: 'grey.300'
    }}
  />
  <h2 className="text-base sm:text-lg font-semibold text-gray-700 sm:mx-4 mb-2 sm:py-2"> Please select a profile picture to upload. </h2>

  <input type="file" onChange={handleFileChange} />


</Box>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
  {/* Display the Avatar with the selected image or the placeholder */}
  <Button variant="contained" color="primary" onClick={() => setActiveStep((prevStep) => prevStep - 1)}>Back</Button>
  <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
</div>
</Box>
  );
}