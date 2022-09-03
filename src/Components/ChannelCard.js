import React from 'react'
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom"
import { demoChannelUrl, demoProfilePicture } from '../Utils/Constants';

const ChannelCard = ({ channelData, marginTop }) => {
    // console.log("channel :", channelData)
    // const { id: { channelId }, snippet } = channelData;
    return (
        <Box sx={{
            borderRadius: "none",
            width: {
                xs: "100%",
                sm: "310px"
            },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: marginTop,

        }}>
            <Link to={channelData?.id?.channelId ? `/channel/${channelData?.id?.channelId}` : demoChannelUrl}>
                <CardContent sx={{
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                }}>
                    <CardMedia title={channelData?.snippet?.channelTitle} image={channelData?.snippet?.thumbnails?.high?.url || demoProfilePicture} alt={channelData?.snippet?.title}
                        sx={{ borderRadius: '50%', height: '180px', width: '180px', mb: 2, border: '1px solid #e3e3e3', boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", }} />
                    <Typography fontWeight={"bold"} sx={{
                        color: "#fff",
                    }}>
                        {channelData?.snippet?.channelTitle || channelData?.snippet?.title} <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                    </Typography>
                    {channelData?.statistics?.subscriberCount && (
                        <Typography sx={{ fontSize: '15px', fontWeight: 500, color: 'gray' }}>
                            {parseInt(channelData?.statistics?.subscriberCount).toLocaleString('en-US')} Subscribers
                        </Typography>
                    )}
                </CardContent>
            </Link>
        </Box>
    )
}

export default ChannelCard