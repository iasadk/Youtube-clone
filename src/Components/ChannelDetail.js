import React from 'react'
import { Box, LinearProgress } from "@mui/material"
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchFromApi } from '../Utils/fetchFromApi'
import ChannelCard from './ChannelCard'
import Videos from './Videos'
import ApiError from './ApiError'

const ChannelDetail = () => {
  const { id } = useParams();
  const { data: channelData, isLoading,isError:channelDetailError } = useQuery(["channelDetailQuery"], () => {
    return fetchFromApi(`channels?part=snippet&id=${id}`)
  })

  const { data: channelVideosData, isLoading: videosLoading, isError:channelVideosError } = useQuery(["channelVideosQuery"], () => {
    return fetchFromApi(`search?channelId=${id}&part=snippet&order=date&maxResults=50`)
  })

  if (isLoading || videosLoading) {
    return <LinearProgress />


  }
  if(channelDetailError || channelVideosError){
    return <ApiError/>
  }
  return (
    <Box minHeight="95vh">
      {
        channelData?.items[0]?.brandingSettings?.image?.bannerExternalUrl && <div
          style={{
            height: "300px",
            backgroundImage: `url(${channelData?.items[0]?.brandingSettings?.image?.bannerExternalUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            zIndex: 10,
          }}
        />
      }
      {
        !channelData?.items[0]?.brandingSettings?.image?.bannerExternalUrl && <div
          style={{
            height: '300px',
            background: 'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)',
            zIndex: 10,
          }}
        />
      }
      <Box display="flex" alignItems="center" justifyContent="center">
        <ChannelCard channelData={channelData?.items[0]} marginTop="-93px" />

      </Box>
      <Box p="2" display="flex" justifyContent="center" sx={{

      }}>
        <Box display="flex" sx={{

          ml: {
            sm:"20px",
            md: "80px"
          },
          mr: {
            md: "50px"
          }
        }}>
          <Videos videos={channelVideosData.items} justifyContent="center"/>
        </Box>
      </Box>
    </Box>
  )
}

export default ChannelDetail