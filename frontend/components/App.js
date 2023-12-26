import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from './Header/Header';
import NasaInfo from './NasaInfo';


const AppContainer = styled.div`
  font-family: 'Arial', sans-serif;
  text-align: center;
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 20px;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  margin-top: 20px;
`;

const Video = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;


function App() {
 
   // 1. State for NASA data
   const [nasaData, setNasaData] = useState(null);

    // 2. Effect hook to handle API call after the first render
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Perform the API call to get NASA data (replace 'API_ENDPOINT' with the actual API endpoint)
        const response = await fetch('http://localhost:9009/api/apod?api_key=DEMO_KEY');
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
    <AppContainer>
      <Header />
      <ContentContainer>
        {nasaData ? (
          <>
            <p>Data from NASA: {JSON.stringify(nasaData)}</p>
            {nasaData.media_type === 'image' ? (
              <Image src={nasaData.url} alt="NASA APOD" />
            ) : nasaData.media_type === 'video' ? (
              <VideoContainer>
                {/* Assuming the URL is a YouTube URL */}
                <Video src={nasaData.url} title="NASA APOD Video" frameborder="0" allowfullscreen />
              </VideoContainer>
            ) : (
              <p>Unsupported media type: {nasaData.media_type}</p>
            )}
          </>
        ) : (
          <p>Loading NASA data...</p>
        )}
      </ContentContainer>
    </AppContainer>
  )
}

export default App
