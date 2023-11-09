import React from "react";

export function UploadPictureForm({ setActiveStep, formData, onFormDataChange, onSubmit }) {
    return (
     <div>
      <h2>Upload Picture</h2>
      <p>Please upload a picture.</p>
      <button onClick={() => setActiveStep(6)}>Next</button>
      <button onClick={onSubmit}>Submit</button>
     </div>
    );
   }