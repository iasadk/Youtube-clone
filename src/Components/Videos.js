import React from 'react'
import { Stack, Box } from "@mui/material"
import VideoCard from './VideoCard'
import ChannelCard from './ChannelCard'
const Videos = ({ videos, justifyContent, direction }) => {

    return (
        <Stack flexWrap="wrap" gap={2} sx={{
            flexDirection: {
                xs: "column" ,
                sm: "row",
                md: direction
            },
            justifyContent: {
                xs: justifyContent || "start",
                sm: "start"
            },


        }}>
            {videos?.map((video, idx) => {
                return (
                    <Box key={idx}>
                        {video.id.videoId && <VideoCard cardData={video} />}
                        {video.id.channelId && <ChannelCard
                            channelData={video} marginTop={0} />}
                    </Box>

                )
            })}


        </Stack>
    )
}

export default Videos

