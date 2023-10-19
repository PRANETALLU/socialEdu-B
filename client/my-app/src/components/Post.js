import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button, IconButton } from '@mui/material';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { UserContext } from "../components/UserContext";
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Logo from "../images/WISRR_Logo_Square.jpeg"
import Paper from '@mui/material/Paper';
import RestoreIcon from '@mui/icons-material/Restore';
import ArchiveIcon from '@mui/icons-material/Archive';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import EmojiObjectsRoundedIcon from '@mui/icons-material/EmojiObjectsRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from "@mui/material/Stack";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


const Post = (props) => {
    const { userInfo } = useContext(UserContext);
    const [user, setUser] = useState({
        _id: "",
        name: "",
        username: "",
        password: "",
        following: [],
        liked: [],
    });

    const [likedPost, setLike] = useState(false);
    const [showComments, setComments] = useState(false);
    const [commentDes, setCommentDes] = useState([]);


    const authorID = props.authorID;
    const postID = props.postID;

    const getAllComments = async () => {
        const response = await fetch(`http://localhost:3001/commentsByPost/${postID}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        const data = await response.json();
        setCommentDes(data.commentsWithDescription);
    }

    useEffect(() => {
        getAllComments();
    }, [])


    const popComments = () => {
        if (showComments) {
            setComments(false);
        }
        else {
            setComments(true);
        }
    }


    const getAllLikedPosts = async () => {
        const response = await fetch(`http://localhost:3001/userLikedPosts/${userInfo.id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        const data = await response.json();
        console.log(data.likedP)

        if (data.likedP.includes(postID)) {
            setLike(true);
        }
        else {
            setLike(false);
        }
    };

    useEffect(() => {
        getAllLikedPosts();
    }, [])

    const likeButtonClick = async () => {
        const response = await fetch(`http://localhost:3001/like/${postID}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        const data = await response.json();

        //window.location.reload();

    }

    const getAuthorDetailsOfPost = async () => {
        const response = await fetch(`http://localhost:3001/user/${authorID}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        const data = await response.json();
        setUser(data.userSpecific);
    }

    useEffect(() => {
        getAuthorDetailsOfPost();
    }, [])

    //console.log(user?.name);
    //console.log(user.username);

    return (
        <div>

            <Card sx={{ width: "100%", height: "100%", borderBottom: "1px solid #d3d3d3" }}>
                <CardContent>
                    <Stack direction="row" sx={{ marginLeft: 2 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>{user.name}</Typography>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", marginLeft: 1 }}>@{user.username}</Typography>
                    </Stack>
                    <Stack direction="row">
                        <Typography variant="body1" gutterBottom>{props.text}</Typography>
                    </Stack>
                    <CardActions sx={{ justifyContent: "space-evenly" }}>
                        <IconButton><ForumOutlinedIcon /></IconButton>
                        {likedPost ? (
                            <IconButton onClick={likeButtonClick}>
                                <FavoriteIcon sx={{ color: "red" }} />
                            </IconButton>
                        ) : (
                            <IconButton onClick={likeButtonClick}>
                                <FavoriteBorderIcon />
                            </IconButton>
                        )}
                        {showComments ? (<IconButton onClick={popComments}>
                            <ExpandLessIcon />
                        </IconButton>) : (<IconButton onClick={popComments}>
                            <ExpandMoreIcon />
                        </IconButton>)}
                    </CardActions>
                </CardContent>
            </Card>
            {showComments && (
                commentDes.map((com) => (
                    <p>{com.text}</p>
                ))
            )}
        </div>
    )
}

// <p>{commentDes.text}</p>

export default Post; 