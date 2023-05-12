import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { addProductBymanager, editProductBymanager, selectForEdit } from "./managerSlice";
import PermMediaRoundedIcon from '@mui/icons-material/PermMediaRounded';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FaRegEdit } from 'react-icons/fa';

export default function AddProduct() {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "onBlur", defaultValues: {} });

    // console.log(errors);
    let navigate = useNavigate()
    let dispatch = useDispatch();
    let arr = useSelector(state => state.manager.productsArr)
    let edit = useSelector(st => st.manager.forEdit);
    let item = JSON.parse(localStorage.getItem("currentUpdateProduct"));

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const submittionFuncAdd = async (data) => {
        if (!isValid) {
            await dispatch(selectForEdit(false))
            return;
        }
        await dispatch(addProductBymanager(data));
        navigate("/products");
    }

    const submittionFuncUpdate = async (data) => {
        if (!isValid) {
            await dispatch(selectForEdit(false))
            return;
        }
        console.log("***********data");
        console.log(data)
        data = { ...data, id: item.id }
        let res = await dispatch(editProductBymanager(data));
        console.log("***********res");
        console.log(res)
        navigate("/products");
    }

    return (<>
        {edit ? <div>
            <FaRegEdit variant="outlined" onClick={handleClickOpen}/>עריכת מוצר
            {/* <Button variant="outlined" onClick={handleClickOpen}>עריכת מוצר</Button> */}
            <Dialog open={open} onClose={handleClose} >
                <form onSubmit={handleSubmit(submittionFuncUpdate)}>
                    <DialogTitle>2עריכת מוצר</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            הכנס פרטים רק בשדות שאותן תרצה לשנות
                        </DialogContentText>
                        <TextField
                            margin="dense"
                            id="outlined-read-only-input"
                            label="קוד מוצר"
                            fullWidth
                            variant="filled"
                            defaultValue={item.id}
                            InputProps={{
                                readOnly: true,
                            }}
                            {...register("id")}
                        />
                        <TextField
                            {...register("name", { required: "לא הוכנס שם,זהו שדה חובה", maxLength: 60 })}
                            autoFocus
                            margin="dense"
                            placeholder="שם המוצר"
                            id="outlined-required"
                            label="שם המוצר"
                            fullWidth
                            variant="filled"
                            defaultValue={item.name}
                            error={Boolean(errors.name)}
                            helperText={errors.name?.message}
                        />
                        <TextField
                            {...register("description", { required: "לא הוכנס תאור,זהו שדה חובה", maxLength: 1000 })}
                            margin="dense"
                            id="outlined-basic"
                            label="תאור המוצר"
                            fullWidth
                            variant="filled"
                            defaultValue={item.description}
                            error={Boolean(errors.description)}
                            helperText={errors.description?.message}
                        />
                        <TextField
                            {...register("imgUrl", { required: "לא הוכנס קישור לתמונה זהו שדה חובה", })}
                            margin="dense"
                            id="outlined-basic"
                            label="הכנס קישור לתמונה"
                            fullWidth
                            variant="filled"
                            defaultValue={item.imgUrl}
                            error={Boolean(errors.imgUrl)}
                            helperText={errors.imgUrl?.message}
                        />
                        <TextField
                            {...register("price", { required: "לא הוכנס מחיר,זהו שדה חובה", min: 0, max: 5000 })}
                            margin="dense"
                            id="outlined-number"
                            label="מחיר"
                            fullWidth
                            variant="filled"
                            type="number"
                            defaultValue={item.price}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={Boolean(errors.price)}
                            helperText={errors.price?.message}
                        />
                        <TextField
                            {...register("category", { required: "לא הוכנס קטגוריה,זהו שדה חובה", min: 0, max: 2000 })}
                            margin="dense"
                            id="outlined-basic"
                            label="קטגוריה"
                            fullWidth
                            variant="filled"
                            defaultValue={item.category}
                            error={Boolean(errors.category)}
                            helperText={errors.category?.message}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>סגור</Button>
                        <Button type="submit"
                            onSubmit={handleSubmit} onClick={handleClose} disabled={!isValid}>עדכן מוצר</Button>
                        <PermMediaRoundedIcon />
                    </DialogActions>
                </form>
            </Dialog>
        </div> : <div>
        <FaRegEdit color="primary" variant="outlined" onClick={handleClickOpen}/>
            {/* <Button variant="outlined" onClick={handleClickOpen}>הוספת מוצר</Button> */}
            <Dialog open={open} onClose={handleClose} >
                <form onSubmit={handleSubmit(submittionFuncAdd)}>
                    <DialogTitle>הוספת מוצר</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            הכנס את פרטי המוצר בשדות המתאימים
                        </DialogContentText>
                        <TextField
                            {...register("name", { required: "לא הוכנס שם,זהו שדה חובה", maxLength: 60 })}
                            autoFocus
                            placeholder="שם המוצר"
                            margin="dense"
                            id="outlined-required"
                            label="שם המוצר"
                            fullWidth
                            variant="filled"
                            error={Boolean(errors.name)}
                            helperText={errors.name?.message}
                        />
                        <TextField
                            {...register("description", { required: "לא הוכנס תאור,זהו שדה חובה", maxLength: 1000 })}
                            id="outlined-basic"
                            margin="dense"
                            label="תאור המוצר"
                            fullWidth
                            variant="filled"
                            error={Boolean(errors.description)}
                            helperText={errors.description?.message}
                        />
                        <TextField
                            {...register("imgUrl", { required: "לא הוכנס קישור לתמונה זהו שדה חובה", })}
                            id="outlined-basic"
                            margin="dense"
                            label="הכנס קישור לתמונה"
                            fullWidth
                            variant="filled"
                            error={Boolean(errors.imgUrl)}
                            helperText={errors.imgUrl?.message}
                        />
                        <TextField
                            {...register("price", { required: "לא הוכנס מחיר,זהו שדה חובה", min: 0, max: 5000 })}
                            id="outlined-basic"
                            margin="dense"
                            label="מחיר"
                            fullWidth
                            variant="filled"
                            type="number"
                            error={Boolean(errors.price)}
                            helperText={errors.price?.message}
                        />
                        <TextField
                            {...register("category", { required: "לא הוכנס קטגוריה,זהו שדה חובה", min: 0, max: 2000 })}
                            id="outlined-basic"
                            margin="dense"
                            label="קטגוריה"
                            fullWidth
                            variant="filled"
                            error={Boolean(errors.category)}
                            helperText={errors.category?.message}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>סגור</Button>
                        <Button type="submit"
                            onSubmit={handleSubmit} onClick={handleClose} disabled={!isValid}>הוסף מוצר</Button>
                        <PermMediaRoundedIcon />
                    </DialogActions>
                </form>
            </Dialog>
        </div>
        }
    </>);
}