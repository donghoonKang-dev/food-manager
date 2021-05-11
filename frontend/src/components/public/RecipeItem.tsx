import React, { useState } from "react";
import { Divider, Avatar, makeStyles, createStyles, Theme, IconButton } from "@material-ui/core";
import ItemBox from "@material-ui/core/ListItem";
import { grey } from "@material-ui/core/colors";
import { ThumbUpAltOutlined, ThumbUp, ThumbDown, ThumbDownAltOutlined } from "@material-ui/icons";
import axios from "axios";

interface recipeProps {
    id: number;
    name: string;
    source: string | null;
    kcal: string | null;
    protein: string | null;
    carbo: string | null;
    fat: string | null;
    salt: string | null;
    score?: number;
    url: string;
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        large: {
            width: theme.spacing(20),
            height: theme.spacing(20),
            marginLeft: "auto",
            borderRadius: "40px"
        }
    })
);

const RecipeItem = ({
    id,
    name,
    source,
    kcal,
    protein,
    carbo,
    fat,
    salt,
    score = 0,
    url
}: recipeProps) => {
    console.log(score);

    const classes = useStyles();
    const [like, setLike] = useState<number>(score);
    const handleLike = async (type: boolean) => {
        // true = click like, false= click unlike
        if (type) {
            like === 1 ? (score = 0) : (score = 1);
        } else {
            like === -1 ? (score = 0) : (score = -1);
        }
        console.log("score", score);

        await axios.post("/food-manager/api/favorite", { recipeId: id, score }).catch((e) => {
            console.log(e);
            alert("서버에 오류가 발생했습니다.");
        });
        setLike(score);
    };

    return (
        <>
            <ItemBox>
                <div className="listitem-container">
                    <Avatar variant="square" alt="food" src={url} className={classes.large} />
                    <div className="recipeitem-info">
                        <p className="recipe-title">{name}</p>
                        <p className="recipe-ingredients">방울토마토, 양파</p>
                        <div style={{ marginLeft: "auto" }}>
                            <IconButton onClick={() => handleLike(true)}>
                                {like === 1 ? (
                                    <ThumbUp style={{ color: grey[50], fontSize: "2rem" }} />
                                ) : (
                                    <ThumbUpAltOutlined
                                        style={{ color: grey[50], fontSize: "2rem" }}
                                    />
                                )}
                            </IconButton>
                            <IconButton onClick={() => handleLike(false)}>
                                {like === -1 ? (
                                    <ThumbDown style={{ color: grey[50], fontSize: "2rem" }} />
                                ) : (
                                    <ThumbDownAltOutlined
                                        style={{ color: grey[50], fontSize: "2rem" }}
                                    />
                                )}
                            </IconButton>
                        </div>
                    </div>
                </div>
            </ItemBox>
            <Divider style={{ backgroundColor: grey[600] }} />
        </>
    );
};

export default RecipeItem;
