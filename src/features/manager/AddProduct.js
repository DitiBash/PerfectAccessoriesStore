import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { addProductBymanager, editProductBymanager, selectForEdit } from "./managerSlice";
import TextField from '@mui/material/TextField';
import PermMediaRoundedIcon from '@mui/icons-material/PermMediaRounded';


export default function AddProduct1() {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "onBlur", defaultValues: {} });

  // console.log(errors);
  let navigate = useNavigate()
  let dispatch = useDispatch();
  let arr = useSelector(state => state.manager.productsArr)
  let edit = useSelector(st => st.manager.forEdit);
  let item = JSON.parse(localStorage.getItem("currentUpdateProduct"));

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
    {edit ? <form onSubmit={handleSubmit(submittionFuncUpdate)}>
      <h1>עריכת מוצר</h1>
      <div>
        <TextField
          {...register("id")}
          id="outlined-read-only-input"
          label="קוד מוצר"
          defaultValue={item.id}
          InputProps={{
            readOnly: true,
          }}
        />
        {/* <input type="number" placeholder="קוד מוצר" value={item.id} {...register("id")} /> */}
      </div>
      <div>
        {!errors.name ? <TextField
          {...register("name", { required: "לא הוכנס שם,זהו שדה חובה", maxLength: 60 })}
          // required
          placeholder="שם המוצר"
          id="outlined-required"
          label="שם המוצר"
          defaultValue={item.name}
        /> : <TextField
          error
          id="outlined-error-helper-text"
          label="שגיאה"
          helperText={errors?.name.message}
        />}
        {/* <input type="text" placeholder="שם המוצר" defaultValue={item.name} {...register("name", { required: "לא הוכנס שם,זהו שדה חובה", maxLength: 60 })} />
        {errors.name && <p className='error-message'>{errors.name.message}</p>} */}
      </div>

      <div>
        {!errors.description ? <TextField {...register("description", { required: "לא הוכנס תאור,זהו שדה חובה", maxLength: 1000 })}
          id="outlined-basic" label="תאור המוצר" variant="outlined" defaultValue={item.description} />
          : <TextField
            error
            id="outlined-error-helper-text"
            label="שגיאה"
            defaultValue={item.description}
            helperText={errors?.description.message}
          />}
        {/* <input type="text" placeholder="תאור המוצר" defaultValue={item.description} {...register("description", { required: "לא הוכנס תאור,זהו שדה חובה", maxLength: 1000 })} />
        {errors.description && <p className='error-message'>{errors.description.message}</p>} */}
      </div>
      <div>
        {!errors.imgUrl ? <TextField {...register("imgUrl", { required: "לא הוכנס קישור לתמונה זהו שדה חובה", })}
          id="outlined-basic" label="הכנס קישור לתמונה" variant="outlined" defaultValue={item.imgUrl} />
          : <TextField
            error
            id="outlined-error-helper-text"
            label="שגיאה"
            defaultValue={item.imgUrl}
            helperText={errors?.imgUrl.message}
          />}
        {/* <input type="text" placeholder="הכנס קישור לתמונה" defaultValue={item.imgUrl}{...register("imgUrl", { required: "לא הוכנס קישור לתמונה זהו שדה חובה", })} />
        {errors.imgUrl && <p className='error-message'>{errors.imgUrl.message}</p>} */}
      </div>
      {/* <TextField
        label="כתובת מייל"
        variant="standard"
        type="email"
        {...register("eMailAddress",
          {
            required: true,
            validate: (value) => value.includes('@')
          })}
        error={Boolean(errors.eMailAddress)}
        helperText={Boolean(errors.eMailAddress) && (Boolean(errors.eMailAddress.type === "required")
          ? "*שדה חובה" : Boolean(errors.eMailAddress.type === "validate")
            ? "כתובת המייל אינה תקינה" : "")}
      /> */}

      <div>
        {!errors.price ? <TextField
          {...register("price", { required: "לא הוכנס מחיר,זהו שדה חובה", min: 0, max: 5000 })}
          id="outlined-number"
          label="מחיר"
          type="number"
          defaultValue={item.price}
          InputLabelProps={{
            shrink: true,
          }}
        /> : <TextField
          error
          id="outlined-error-helper-text"
          label="שגיאה"
          defaultValue={item.price}
          helperText={errors?.price.message}
        />}
        {/* <input type="number" placeholder="מחיר" defaultValue={item.price} {...register("price", { required: "לא הוכנס מחיר,זהו שדה חובה", min: 0, max: 5000 })} />
        {errors.price && <p className='error-message'>{errors.price.message}</p>} */}
      </div>

      <div>
        {!errors.category ? <TextField {...register("category", { ...register("category", { required: "לא הוכנס קטגוריה,זהו שדה חובה", min: 0, max: 2000 }) })}
          id="outlined-basic" label="קטגוריה" variant="outlined" defaultValue={item.category} />
          : <TextField
            error
            id="outlined-error-helper-text"
            label="שגיאה"
            defaultValue={item.category}
            helperText={errors?.category.message}
          />}
        {/* <input type="type" placeholder="קטגוריה" defaultValue={item.category}{...register("category", { required: "לא הוכנס קטגוריה,זהו שדה חובה", min: 0, max: 2000 })} />
        {errors.category && <p className='error-message'>{errors.category.message}</p>} */}
      </div>

      <input type="submit" value="עדכן מוצר" disabled={!isValid} />

    </form> : <form onSubmit={handleSubmit(submittionFuncAdd)}>
      <h1>הוספת מוצר</h1>
      <div>
        <input type="text" placeholder="שם המוצר" {...register("name", { required: "לא הוכנס שם,זהו שדה חובה", maxLength: 30 })} />
        {errors.name && <p className='error-message'>{errors.name.message}</p>}
      </div>
      <div>
        <input type="text" placeholder="תאור המוצר" {...register("description", { required: "לא הוכנס תאור,זהו שדה חובה", maxLength: 150 })} />
        {errors.description && <p className='error-message'>{errors.description.message}</p>}
      </div>
      <div>
        <input type="text" placeholder="הכנס קישור לתמונה" {...register("imgUrl", { required: "לא הוכנס קישור לתמונה זהו שדה חובה", })} />
        {errors.imgUrl && <p className='error-message'>{errors.imgUrl.message}</p>}
      </div>
      <div>
        <input type="number" placeholder="מחיר" {...register("price", { required: "לא הוכנס מחיר,זהו שדה חובה", min: 0, max: 5000 })} />
        {errors.price && <p className='error-message'>{errors.price.message}</p>}
      </div>

      <div>
        <input type="type" placeholder="קטגוריה" {...register("category", { required: "לא הוכנס קטגוריה,זהו שדה חובה", min: 0, max: 2000 })} />
        {errors.category && <p className='error-message'>{errors.category.message}</p>}
      </div>
      
      <PermMediaRoundedIcon/>

      <input type="submit" value="הוסף מוצר" disabled={!isValid} />
    </form>}
  </>
  );
}