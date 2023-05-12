import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { postUser } from './userSlice';
import "./AddUser.css";
import { useNavigate } from "react-router-dom";

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
    // async function enter(data) {
    //     let res = await dispatch(fetchOneUser(data));
    //     if (res.type == "login/fulfilled") {
    //         console.log("resssssssssss")
    //         console.log(res)
    //         // dispatch(login(res.payload));
    //         localStorage.setItem("currentUser", JSON.stringify(res.payload));
    //         navigate('/products')
    //     }
    // console.log(errors)
    return (<>
        <h1>הרשמה</h1>
        <form onSubmit={handleSubmit(submittion)}>
            <div>
                <label>שם</label>
                <input defaultValue=""  {...register("name", { required: "name is required", minLength: { value: 3, message: " שם צריך להיות בעל 3 תווים לפחות" } })} />
                {errors.name && <p className="error-message">{errors.name.message}</p>}
            </div>
            <div>
                <label>עיר</label>
                <input defaultValue=""  {...register("city",)} />
                {errors.city && <p className="error-message">{errors.city.message}</p>}
            </div>
            <div>
                <label>כתובת</label>
                <input defaultValue=""  {...register("addres",)} />
                {errors.addres && <p className="error-message">{errors.addres.message}</p>}
            </div>
            <div>
                <label>מס' דירה</label>
                <input defaultValue=""  {...register("numHome",)} />
                {errors.numHome && <p className="error-message">{errors.numHome.message}</p>}
            </div>
            <div>
                <label>מייל</label>
                <input type="mail" {...register("mail", { required: "mail is required" })} />
                {errors.mail && <p className="error-message">{errors.mail.message}</p>}
            </div>

            <div>
                <label>ת"ז</label>
                <input {...register("tz", {
                    pattern: { value: /[0-9]{9}/, message: "ת''ז חייבת להכיל 9 ספרות" },
                    validate: (val) => val === getValues("tz")
                })} />
                {errors.tz && <p className="error-message">{errors.tz.message}</p>}
                {errors.tz?.type === "validate" && <p className="error-message">שגיאה בת''ז</p>}
            </div>
            <div>
                <label>סיסמא</label>
                <input type="password" {...register("password", { required: "password is required", minLength: { value: 9, message: " סיסמא צריכה להיות בעלת 9 תווים לפחות" } })} />
                {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>
            <div>
                <label>אימות סיסמא</label>
                <input type="password" {...register("passConfirm", {
                    required: "password confirm is required", minLength: { value: 9, message: " סיסמא צריכה להיות בעלת 9 תווים לפחות" },
                    validate: (val) => val === getValues("password")
                })} />
                {errors.passConfirm?.type === "validate" ? <p className="error-message">שגיאה סיסמא לא זהה</p> : errors.passConfirm && <p className="error-message">{errors.passConfirm.message}</p>}
            </div>
            <input type="submit" value="הירשם" disabled={!isValid} />

        </form>
    </>
    );
}

export default AddUser;