import React from 'react'
import ReactPlayer from 'react-player'
import ApiError from './ApiError'
import { useQuery } from '@tanstack/react-query'
import { Stack, Box, Typography } from "@mui/material"
import CheckCircle from '@mui/icons-material/CheckCircle'
import { useParams, Link } from 'react-router-dom'
import { LinearProgress } from '@mui/material'
import { fetchFromApi } from '../Utils/fetchFromApi'
import Videos from './Videos'
import { useEffect } from 'react'

const VideoDetail = () => {
  const { id } = useParams();
  const { data: videoDetail, refetch: videoRefetch, isError: videoDetailError, isLoading: videoDetailLoading } = useQuery(["videoDetail"], () => {
    return fetchFromApi(`videos?part=contentDetails%2Csnippet%2Cstatistics&id=${id}`)
  })
  const { data: realtedVideoData, refetch: relatedVideoRefetch, isError: relatedVideoError, isLoading: realtedVideoLoading } = useQuery(["realtedVideos"], () => {
    return fetchFromApi(`search?relatedToVideoId=${id}&part=id%2Csnippet&type=video`)
  })

  useEffect(() => {

    videoRefetch();
    relatedVideoRefetch();

  }, [id])
  if(videoDetailError || relatedVideoError){
    return <ApiError/>
  }
  if (videoDetailLoading || realtedVideoLoading) {
    return <LinearProgress color="secondary" />
  }
  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail.items[0];
  return (
    <Box minHeight="95vh">
      <Stack direction={{
        xs: "column",
        md: "row"
      }}>
        <Box flex={1}>
          <Box sx={{
            width: "100%",
            position: "sticky",
            top: "86px",
          }}>
            <ReactPlayer url={`https:/www.youtube.com/watch?v=${id}`} controls className="react-player" />
            <Typography color="#fff" variant="h5" fontWeight="semiBold" p={1}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} mb={2} px={1}>
              <Link to={`/channel/${channelId}`}>
                <Typography variant="span" fontFamily="sans-serif" color="#fff">
                  {channelTitle}<CheckCircle sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px">
                <Typography variant="span" sx={{ opacity: 0.7 }} fontFamily="sans-serif">
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="span" sx={{ opacity: 0.7 }} fontFamily="sans-serif">
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>

            </Stack>

          </Box>
        </Box>
        <Box p={2}>
          <Videos videos={realtedVideoData.items} direction="column"/>
        </Box>
      </Stack>
    </Box>
  )
}

export default VideoDetail