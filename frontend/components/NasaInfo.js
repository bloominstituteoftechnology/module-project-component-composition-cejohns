import React from 'react';

function NasaInfo({ nasaData }) {
  return (
    <div>
      {nasaData ? (
        <>
          <h2>{nasaData.title}</h2>
          <p>{nasaData.explanation}</p>
          {nasaData.media_type === 'image' ? (
            <img src={nasaData.url} alt={nasaData.title} />
          ) : nasaData.media_type === 'video' ? (
            // Render video component or handle video display
            <p>Video content: {nasaData.url}</p>
          ) : (
            // Handle other media types or provide a message
            <p>Unsupported media type: {nasaData.media_type}</p>
          )}
        </>
      ) : (
        <p>Loading NASA data...</p>
      )}
    </div>
  );
}

export default NasaInfo;
