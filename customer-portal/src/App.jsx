import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import LeftSideBar from './Component/Leftsidebar/leftsidebar';
import CreateSurvey from './Component/Survey/CreateSurvey';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Box className="body-back">
      <Grid container>
        <Grid lg={2}>
          <LeftSideBar />
        </Grid>
        <Grid lg={10}>
          <Box className="p-20">
            <Routes>
              <Route exact path='/' element={<CreateSurvey />}></Route>
            </Routes>
          </Box>

        </Grid>
      </Grid>
    </Box>
  )
}

export default App
