import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Box } from "@mui/material"
import Navbar from './Components/Navbar';
import Feed from './Components/Feed';
import VideoDetail from './Components/VideoDetail';
import ChannelDetail from './Components/ChannelDetail';
import SearchFeed from './Components/SearchFeed';
import Error from './Components/Error';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <Router>
        <Box sx={{
          backgroundColor: "#181818"
        }}>
          <Navbar />
          <Routes>
            <Route path='/' element={<Feed />}></Route>
            <Route path='/video/:id' element={<VideoDetail />}></Route>
            <Route path='/channel/:id' element={<ChannelDetail />}></Route>
            <Route path='/search/:searchTerm' element={<SearchFeed />}></Route>
            <Route path='*' element={<Error />}></Route>
          </Routes>
        </Box>

      </Router>
    </QueryClientProvider>
  );
}

export default App;
