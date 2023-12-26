import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import NasaInfo from './NasaInfo';




function App() {
 
   // 1. State for NASA data
   const [nasaData, setNasaData] = useState(null);

    // 2. Effect hook to handle API call after the first render
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Perform the API call to get NASA data (replace 'API_ENDPOINT' with the actual API endpoint)
        const response = await fetch('https://api.nasa.gov/planetary/apod');
        const data = await response.json();

          // Log the response to the console
          console.log('NASA API Response:', data);

        // Update the state with the fetched data
        setNasaData(data);
      } catch (error) {
        console.error('Error fetching NASA data:', error);
        // Handle errors, e.g., set an error state or show a user-friendly message
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

 
  return (
    <div>
    {nasaData ? (
      <>
        <p>Data from NASA: {JSON.stringify(nasaData)}</p>
        {nasaData.media_type === 'image' ? (
          <img src={nasaData.url} alt="NASA APOD" />
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
  )
}

export default App
