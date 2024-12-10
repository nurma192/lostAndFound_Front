import MyButton from "../../components/ui/MyButton";
import React from "react";
import {ChangePasswordBody, useChangePassword} from "../../api/changePasswordApi";
import {SubmitHandler, useForm} from "react-hook-form";
import {MyInput} from "../../components/ui/MyInput";

type ChangePasswordFormBody = {
    currentPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
}

function ChangePasswordForm() {
    const {mutate: changePassword, isLoading} = useChangePassword()
    const {handleSubmit, control, watch, reset} = useForm<ChangePasswordFormBody>({
        mode: "onChange",
        reValidateMode: "onBlur",
    })
    const submitForm: SubmitHandler<ChangePasswordFormBody> = (data) => {
        console.log(data)
        const passwordRequestBody: ChangePasswordBody = {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
        }
        changePassword(passwordRequestBody)
        reset({
            currentPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
        })
    }
    return (

        <form onSubmit={handleSubmit(submitForm)} className={`flex flex-col gap-2`}>
            <MyInput name={`currentPassword`}
                     label={`Current Password`}
                     control={control}
                     type={'password'}
            />
            <MyInput
                name={`newPassword`}
                label={`New Password`}
                control={control}
                type={'password'}
            />
            <MyInput
                name={`newPasswordConfirm`}
                label={`Confirm New password`}
                control={control}
                type={'password'}
                validate={(value) =>
                    value === watch('newPassword') || 'Passwords do not match'
                }
            />
            <MyButton color={`primary`}
                      type={`submit`}
                      className={`py-1 px-5`}
                      disabled={isLoading}
            >Change</MyButton>
        </form>
    )
}

export default ChangePasswordForm;
