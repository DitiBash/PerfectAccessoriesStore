import * as React from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { postUser } from './userSlice';
import "./AddUser.css";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';


const AddUser = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate()
    let { register, getValues, handleSubmit, formState: { errors, dirtyFields, isDirty, isSubmitted, isValid, required } } = useForm({
        mode: "onBlur", defaultValues: {}
    });
    const submittion = async (data) => {
        console.log(data);
        let res = await dispatch(postUser(data));
        if (res.type == "signIn/fulfilled") {
            console.log(res)
            localStorage.setItem("currentUser", JSON.stringify(res.payload));
            navigate('/products')
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
            <AppRegistrationIcon onClick={handleClickOpen} />
            {/* <Button variant="outlined" onClick={handleClickOpen}>הירשם</Button> */}
            <Dialog open={open} onClose={handleClose} >
                <form onSubmit={handleSubmit(submittion)}>
                    <DialogTitle>הרשמה</DialogTitle>
                    <DialogContent  >
                        <DialogContentText >אם הנך משתמש חדש עליך להכניס את פרטיך </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="שם"
                            type="text"
                            fullWidth
                            variant="standard"
                            {...register("name", {
                                required: "name is required",
                                minLength: { value: 3, message: " שם צריך להיות בעל 3 תווים לפחות" }
                            })}
                            error={Boolean(errors.name)}
                            helperText={errors.name?.message}
                        />
                        <TextField

                            margin="dense"
                            id="mail"
                            label="מייל"
                            type="email"
                            fullWidth
                            variant="standard"
                            // ([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)*|\[((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|IPv6:((((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){6}|::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){5}|[0-9A-Fa-f]{0,4}::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){4}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):)?(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){3}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,2}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){2}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,3}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,4}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,5}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,6}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)|(?!IPv6:)[0-9A-Za-z-]*[0-9A-Za-z]:[!-Z^-~]+)])

                            {...register("mail", {
                                required: "חובה להכניס כתובת מייל תקינה",
                                pattern: { value: '[a-z0-9]+@[a-z]+\.[a-z]{2,3}', message: "מייל חייב להיות בתבנית תקינה" },
                                validate: (value) => value.includes('@'),
                            })}
                            error={Boolean(errors.mail)}
                            helperText={errors.mail?.type === "validate" ? "כתובת מייל חייבת להיות בתבנית תקינה" : errors.mail?.message}
                        />
                        <TextField

                            margin="dense"
                            id="city"
                            label="עיר"
                            type="text"
                            fullWidth
                            variant="standard"
                            {...register("city",)}
                            error={Boolean(errors.city)}
                            helperText={errors.city?.message}
                        />
                        <TextField

                            margin="dense"
                            id="addres"
                            label="כתובת"
                            type="text"
                            fullWidth
                            variant="standard"
                            {...register("addres",)}
                            error={Boolean(errors.addres)}
                            helperText={errors.addres?.message}
                        />
                        <TextField

                            margin="dense"
                            id="tz"
                            label=".ת.ז"
                            type="text"
                            fullWidth
                            variant="standard"
                            {...register("tz", {
                                pattern: { value: /[0-9]{9}/, message: "ת''ז חייבת להכיל 9 ספרות" },
                                validate: (val) => val === getValues("tz")
                            })}
                            error={Boolean(errors.tz)}
                            helperText={errors.tz?.message}
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            label="סיסמא"
                            type="password"
                            fullWidth
                            variant="standard"
                            {...register("password",
                                {
                                    required: "חובה להכניס סיסמא",
                                    minLength: { value: 9, message: " סיסמא צריכה להיות בעלת 9 תווים לפחות" }
                                }
                            )}
                            error={Boolean(errors.password)}
                            helperText={errors.password?.message}
                        />
                        <TextField
                            margin="dense"
                            id="password-confirm"
                            label="אימות סיסמא"
                            type="password"
                            fullWidth
                            variant="standard"
                            {...register("passConfirm", {
                                required: "חובה להכניס אימות סיסמא", minLength: { value: 9, message: " סיסמא צריכה להיות בעלת 9 תווים לפחות" },
                                validate: (val) => val === getValues("password")
                            })}
                            error={Boolean(errors.passConfirm)}
                            helperText={errors.passConfirm?.type === "validate" ? "שגיאה, סיסמא לא זהה" : errors.passConfirm?.message}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>סגור</Button>
                        <Button type="submit"
                            onSubmit={handleSubmit} onClick={handleClose} disabled={!isValid}>הירשם</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
export default AddUser;
