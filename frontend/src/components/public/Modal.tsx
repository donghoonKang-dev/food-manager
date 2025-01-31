import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Modal, Backdrop, Fade, IconButton } from "@material-ui/core";
import { red, grey } from "@material-ui/core/colors";
import { InputField } from "../index";
import { Delete, Close, Create } from "@material-ui/icons";
import axios from "axios";
import { useMenuListContext, useMenuListDispatchContext } from "../Model";

interface modalProps {
    open: boolean;
    handleClose: () => void;
    regDate: string; // 등록일
    expDate?: string; // 만료일
    id: number; // 재료 번호
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        paper: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            backgroundColor: "gray",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3)
        }
    })
);

const TransitionsModal = ({
    open,
    handleClose,
    regDate,
    expDate = "2021-12-31",
    id
}: modalProps) => {
    const classes = useStyles();
    const [_regDate, setRegDate] = useState<string>(regDate);
    const [_expDate, setExpDate] = useState<string>(expDate);
    const [menuList, setMenuList] = [useMenuListContext(), useMenuListDispatchContext()];
    // 삭제 api 요청
    const handleDelete = async () => {
        await axios
            .delete("/food-manager/api/user_fridge", {
                data: { id }
            })
            .then(() => {
                setMenuList(menuList.filter((menu) => menu.id !== id));
                handleClose();
            })
            .catch((e) => {
                console.log(e);
                alert("삭제하는동안 오류가 발생했습니다.");
            });
    };
    // 날짜 수정 api 요청
    const handleDate = async () => {
        await axios
            .put("/food-manager/api/user_fridge", {
                id,
                putDate: new Date(_regDate).getTime() / 1000,
                expireDate: new Date(_expDate).getTime() / 1000
            })
            .then(async () => {
                setMenuList((await axios.get("/food-manager/api/user_fridge")).data);
                handleClose();
            })
            .catch((e) => {
                console.log(e);
                alert("수정하는동안 오류가 발생했습니다.");
            });
    };
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    <InputField
                        font_size="1rem"
                        text="Reg Date"
                        type="date"
                        hint="Set Date"
                        setValue={(e: string) => {
                            setRegDate(e);
                        }}
                        defaultValue={regDate}
                        fullWidth={true}
                    />
                    <InputField
                        font_size="1rem"
                        text="Exp Date"
                        type="date"
                        hint="Expiration Date"
                        defaultValue={expDate}
                        fullWidth={true}
                        setValue={(e: string) => {
                            setExpDate(e);
                        }}
                    />
                    <div>
                        <IconButton onClick={handleDelete}>
                            <Delete style={{ color: red[600] }} />
                        </IconButton>
                        <IconButton onClick={handleDate}>
                            <Create style={{ color: grey[50] }} />
                        </IconButton>
                        <IconButton onClick={handleClose}>
                            <Close style={{ color: grey[50] }} />
                        </IconButton>
                    </div>
                </div>
            </Fade>
        </Modal>
    );
};

export default TransitionsModal;
