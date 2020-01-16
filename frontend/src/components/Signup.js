import React from 'react';
import {useForm} from "react-hook-form";
import {MAXLENGTH, REQUIRED} from "../validation";

const Signup = () => {

    const {register, errors, handleSubmit, formState} = useForm();

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                名前:
                <input type="text" name="userId" ref={register({required: true, maxLength: 20})}/>
                {errors.userId && errors.userId.type === REQUIRED && 'User ID is required'}
                {errors.userId && errors.userId.type === MAXLENGTH && 'Your input exceed maxLength'}
            </div>
            <div>
                メールアドレス
                <input type="text" name="email" ref={register({required: true})}/>
                {errors.email && errors.email.type === REQUIRED && 'Mail is required'}
            </div>
            <div>
                パスワード
                <input type="text" name="password" ref={register({required: true})}/>
                {errors.password && errors.password.type === REQUIRED && 'Password is required'}
            </div>
            <div>
                パスワード（確認用）
                <input type="text" name="confirmPassword" ref={register({required: true})}/>
                {errors.password && errors.password.type === REQUIRED && 'Password is required'}
            </div>
            <button disabled={!formState.dirty || formState.isSubmitting}>Submit</button>
        </form>
    );
};

export default Signup;