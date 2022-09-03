import React from 'react'
import { useState} from 'react'
import { Box, Typography, Stack } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { fetchFromApi } from '../Utils/fetchFromApi'
import { LinearProgress } from '@mui/material';
import Videos from './Videos'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from './Loader';
import { useParams } from 'react-router-dom'
import ApiError from './ApiError'


const SearchFeed = () => {
  const { searchTerm } = useParams();
  const [hasMore, setHasMore] = useState(true)
  const [nextPageToken, setNextPageToken] = useState("");
  const [videos, setVideos] = useState()
  const { data, isLoading,isError } = useQuery(["searchData"], async () => {
    setHasMore(true);
    return await fetchFromApi(`search?part=snippet&q=${searchTerm}`)
  })


  const fetchData = async () => {
    console.log(nextPageToken)
    const newData = await fetchFromApi(`search?part=snippet&q=${searchTerm.length > 20 ? searchTerm.slice(0, 21) : searchTerm}&regionCode=IN&pageToken=${nextPageToken.length !== 0 ? nextPageToken : data.nextPageToken}`);
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
      flexDirection: { sx: "column", md: "row" },
      pl: {
        md: "100px"
      }
    }}>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
          Search results for:  <span style={{ color: "#FC1503" }}>{searchTerm.length > 20 ? searchTerm.slice(0, 21) + "..." + searchTerm.slice(searchTerm.length-4, searchTerm.length) : searchTerm} </span>videos
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

export default SearchFeed