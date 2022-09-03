import React from 'react'
import { Card, CardMedia, CardContent, Typography } from "@mui/material"
import { demoThumbnailUrl, demoChannelTitle, demoChannelUrl, demoVideoTitle, demoVideoUrl } from '../Utils/Constants'
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const VideoCard = ({ cardData }) => {
    let { id: { videoId }, snippet } = cardData;
    videoId = videoId === "i-1c87XZ89M" ? "GDa8kZLNhJ4" : videoId
    return (
        <Card sx={{
            borderRadius: "none",
            width: {
                xs: '100%',
                md: "310px"
            }
        }}>
            <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
                <CardMedia title={snippet?.title} image={snippet?.thumbnails?.high?.url || demoThumbnailUrl} sx={{ width: "100%", height: '180px' }} />
            </Link>
            <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
                <CardContent title={snippet?.title || demoVideoTitle} sx={{
                    backgroundColor: "#1E1E1E", height: '106px', width: {
                        xs: '100%',
                        sm: "310px"
                    }
                }}>
                    <Typography variant="subtitle1" fontWeight="semiBold" sx={{
                        color: "#fff",
                        pr: "20px",
                    }}>
                        {(snippet?.title !== undefined && snippet?.title.slice(0, 60) + "...") || demoVideoTitle}
                    </Typography>
                    <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
                        <Typography variant="subtitle2" sx={{
                            color: "gray"
                        }}>
                            {snippet?.channelTitle || demoChannelTitle}
                            <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px", mt: "5px" }} />
                        </Typography>
                    </Link>
                    <Typography variant="subtitle2" sx={{
                        color: "gray",
                        padding: ".2rem 0"
                    }}>
                        {snippet?.publishTime.split("T")[0]}
                    </Typography>
                </CardContent>
            </Link>
        </Card>
    )
}

export default VideoCard