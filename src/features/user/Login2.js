import * as React from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneUser, login } from './userSlice';
import "./AddUser.css";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { GoSignIn } from 'react-icons/go';


const Login = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let { register, getValues, handleSubmit, formState: { errors, dirtyFields, isDirty, isSubmitted, isValid } } = useForm({
        mode: "onBlur", defaultValues: {}
    });
    async function enter(data) {
        let res = await dispatch(fetchOneUser(data));
        if (res.type == "login/fulfilled") {
            console.log("resssssssssss")
            console.log(res)
            // dispatch(login(res.payload));
            localStorage.setItem("currentUser", JSON.stringify(res.payload));
            navigate('/products')
        }
        else {
            alert("משתמש זה אינו קיים עליך להרשם כמשתמש חדש");
            navigate('/addUser')
        }
    }

    const submittion = (data) => {
        if (errors.data) {
            console.log(errors.data)
            navigate('/home')
        }
        else {
            enter(data)
            console.log("user exist")
        }
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <GoSignIn onClick={handleClickOpen} />
            {/* <Button variant="outlined" onClick={handleClickOpen}>התחבר</Button> */}
            <Dialog open={open} onClose={handleClose} >
            <form onSubmit={handleSubmit(submittion)}>
                <DialogTitle>התחברות 2</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        הכנס שם משתמש או כתובת מייל וסיסמא
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="שם משתמש או כתובת מייל"
                        type="email"
                        fullWidth
                        variant="filled"
                        {...register("nameOrMail", { required: "חובה להכניס שם משתמש או מייל", minLength: { value: 3, message: "שם משתמש צריל להכיל לפחות 3 תווים" } })}
                        error={Boolean(errors.nameOrMail)}
                        helperText={errors.nameOrMail?.message}
                        // helperText={Boolean(errors.nameOrMail?.type=="required")? "חובה להכניס שם משתמש או מייל":
                        // Boolean(errors.nameOrMail?.type === "minLength")?"שם משתמש צריל להכיל לפחות 3 תווים":""}
                    />
                    <TextField
                        margin="dense"
                        id="password"
                        label="סיסמא"
                        type="password"
                        fullWidth
                        variant="standard"
                        {...register("password", { required: "חובה להזין סיסמא", minLength: { value: 8, message: "סיסמא צריכה להכיל יותר מ- 8 תווים" } })}
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>סגור</Button>
                    <Button type="submit"
                        onSubmit={handleSubmit()}onClick={handleClose} disabled={!isValid}>התחבר</Button>
                </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
export default Login;
