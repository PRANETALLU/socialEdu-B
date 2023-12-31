import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button, Stack} from '@mui/material';
import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { UserContext } from "../components/UserContext";
import Chip from '@mui/material/Chip';
import FollowingChip from "../components/FollowingChip";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const GroupView = (props) => {
    return (
        <div>
            <Box style={{border: "2px solid #000"}}>
                <Stack direction="row" sx={{justifyContent: "space-between"}}>
                    <Stack direction="column">
                        <h2>{props.groupName}</h2>
                        <h2>Members: {props.groupMembers}</h2>
                    </Stack>
                    <Button variant="contained" href={`/viewGroup/${props.groupID}`}>View</Button>
                </Stack>
            </Box>
        </div>
    );
};

export default GroupView; 