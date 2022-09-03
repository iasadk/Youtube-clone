import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Typography, Stack } from "@mui/material"
import Sidebar from './Sidebar'
import { useQuery } from "@tanstack/react-query"
import { fetchFromApi } from '../Utils/fetchFromApi'
import { LinearProgress } from '@mui/material';
import Videos from './Videos'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from './Loader'
import ApiError from './ApiError'


const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [hasMore, setHasMore] = useState(true)
  const [nextPageToken, setNextPageToken] = useState("");
  const [videos, setVideos] = useState()
  const { data, isLoading, refetch, isError } = useQuery(["feedData"], async () => {
    setHasMore(true);
    return await fetchFromApi(`search?part=snippet&q=${selectedCategory}`)
  })
  useEffect(() => {
    setVideos([])
    refetch();
  }, [selectedCategory])

  const fetchData = async () => {
    const newData = await fetchFromApi(`search?part=snippet&q=${selectedCategory}&regionCode=IN&pageToken=${nextPageToken.length !== 0 ? nextPageToken : data.nextPageToken}`);
    window.scrollTo(0, 1000)

    if (newData) {
      setNextPageToken(newData.nextPageToken)

      setVideos([...data?.items, ...newData?.items]);

    }
    let totalResults = data?.pageInfo?.totalResults > 200 ? 200 : data?.pageInfo?.totalResults;;
    if (videos?.length >= totalResults) {

      setHasMore(false)
    }

  }

  if (isLoading) {
    return <LinearProgress color='secondary' />
  }
  if(isError){
    return <ApiError/>
  }
  return (
    <Stack sx={{
      flexDirection: { sx: "column", md: "row" }
    }}>
      <Box sx={{
        height: { sx: "auto", md: "92vh" },
        border: "1px solid #3d3d3d",
        px: { sx: "0", md: 2 }
      }}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <Typography className="copyright" variant="body2" sx={{
          color: "#fff",
          mt: 1.5,
        }}>
          Copyright &copy; Md.Asad Khan
        </Typography>
      </Box>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
          {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>
        <InfiniteScroll
          dataLength={videos?.length ? videos?.length : data?.length || 50}
          next={fetchData}
          hasMore={hasMore}
          loader={<Loader />}
          endMessage={
            <p style={{ textAlign: "center", color: "white" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Videos videos={videos?.length > 0 ? videos : data?.items} />

        </InfiniteScroll>
      </Box>
    </Stack>
  )
}

export default Feed