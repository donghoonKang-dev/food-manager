import React from "react";
import {
    List,
    ListItem,
    ListItemText,
    Divider,
    Collapse,
    IconButton,
    makeStyles
} from "@material-ui/core";
import { ExpandLess, ExpandMore, Close, Edit } from "@material-ui/icons";
import LikedListItem from "./LikedListItem";

const useStyles = makeStyles({
    root: {
        width: "100%",
        backgroundColor: "#414141"
    },
    border: {
        backgroundColor: "#606060"
    },
    title: {
        textAlign: "left",
        color: "#00d6af"
    },
    content: {
        textAlign: "right"
    },
    editIcon: {
        fontSize: "15px",
        color: "white"
    },
    deleteIcon: {
        fontSize: "20px",
        color: "white"
    }
});

export default function SimpleList() {
    const classes = useStyles();
    const [likedOpen, setLikedOpen] = React.useState(false);
    const [logOpen, setLogOpen] = React.useState(false);

    const likedHandleClick = () => {
        setLikedOpen(!likedOpen);
    };
    const logHandleClick = () => {
        setLogOpen(!logOpen);
    };

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="total user info">
                <ListItem>
                    <ListItemText className={classes.title} primary="My body info" />
                    <ListItemText className={classes.content} primary="190cm / 90kg" />
                    <IconButton>
                        <Edit className={classes.editIcon} />
                    </IconButton>
                </ListItem>
                <Divider className={classes.border} />
                <ListItem>
                    <ListItemText className={classes.title} primary="Exp date notify" />
                    <ListItemText className={classes.content} primary="Once a day / 12:00PM" />
                    <IconButton>
                        <Edit className={classes.editIcon} />
                    </IconButton>
                </ListItem>
                <Divider className={classes.border} />
                <ListItem button onClick={logHandleClick}>
                    <ListItemText className={classes.title} primary="Diet records" />
                    {logOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={logOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem>
                            <ListItemText primary="2021.3.20" />
                            <ListItemText primary="대패삼겹살을 넣은 두부김치" />
                            <IconButton>
                                <Close className={classes.deleteIcon} />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="2021.3.18" />
                            <ListItemText primary="콘꼬노미야키 만들기" />
                            <IconButton>
                                <Close className={classes.deleteIcon} />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="2021.3.11" />
                            <ListItemText primary="밥도둑 반찬 고추장 달걀조림" />
                            <IconButton>
                                <Close className={classes.deleteIcon} />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="2021.3.10" />
                            <ListItemText primary="얼큰한 순두부찌개" />
                            <IconButton>
                                <Close className={classes.deleteIcon} />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="2021.3.8" />
                            <ListItemText primary="리코타치즈 샐러드" />
                            <IconButton>
                                <Close className={classes.deleteIcon} />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="2021.3.7" />
                            <ListItemText primary="야식으로 먹기 좋은 불막창" />
                            <IconButton>
                                <Close className={classes.deleteIcon} />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="2021.3.5" />
                            <ListItemText primary="간단하게 만드는 규동" />
                            <IconButton>
                                <Close className={classes.deleteIcon} />
                            </IconButton>
                        </ListItem>
                    </List>
                </Collapse>
                <Divider className={classes.border} />
                <ListItem button onClick={likedHandleClick}>
                    <ListItemText className={classes.title} primary="Liked recipe" />
                    {likedOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={likedOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <LikedListItem name="대패삼겹살을 넣은 두부김치" />
                        <LikedListItem name="콘꼬노미야키 만들기" />
                        <LikedListItem name="밥도둑 반찬 고추장 달걀조림" />
                        <LikedListItem name="얼큰한 순두부찌개" />
                        <LikedListItem name="리코타치즈 샐러드" />
                        <LikedListItem name="야식으로 먹기 좋은 불막창" />
                        <LikedListItem name="간단하게 만드는 규동" />
                    </List>
                </Collapse>
            </List>
        </div>
    );
}
