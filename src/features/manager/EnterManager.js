import { useForm } from "react-hook-form";
import React from 'react';

const EnterManager = () => {

    let { register, getValues, handleSubmit, formState: { errors, dirtyFields, isDirty, isSubmitted, isValid } } = useForm({
        mode: "onBlur", defaultValues: {}
    });
    const submittion = (data) => { console.log(data) }
    console.log(errors)
    return (<>
        <h1>התחברות מנהל</h1>
        <form onSubmit={handleSubmit(submittion)}>
            <div>
                <label>כתובת אימייל</label>
                <input type="text" {...register("nameOrMail")} />
            </div>

            <div>
                <label>סיסמא</label>
                <input type="password" {...register("password", { pattern: /[0-9]{9}/ })} />
            </div>

            <input type="submit" value="התחבר" disabled={!isValid} />

        </form>
    </>
    );
}

export default EnterManager;
