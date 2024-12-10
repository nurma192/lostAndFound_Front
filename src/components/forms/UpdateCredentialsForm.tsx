import MyButton from "../ui/MyButton";
import {SubmitHandler, useForm} from "react-hook-form";
import {MyInput} from "../ui/MyInput";
import {User} from "../../types/userTypes";
import {UpdateCredentialsBody, useUpdateCredentials} from "../../api/updateCredentialsApi";
import {useChangePhone} from "../../api/changePhoneApi";
import {useChangeTelegram} from "../../api/changeTelegramApi";
import {CircularProgress} from "@nextui-org/react";
import React from "react";

type UpdateCredentialFormBody = {
    name: string;
    surname: string;
    phone: string;
    telegram: string;
}

interface Props {
    userData: User
}

function UpdateCredentialsForm({userData}: Props) {
    const {handleSubmit, control, formState: {errors}} = useForm<UpdateCredentialFormBody>({
        mode: "onChange",
        reValidateMode: "onBlur",
        defaultValues: {
            name: userData.name,
            surname: userData.surname,
            phone: userData.phone,
            telegram: userData.telegram,
        }
    });
    const {mutate: updateCredentials, isLoading: isLoadingCredentials} = useUpdateCredentials()
    const {mutate: updatePhone, isLoading: isLoadingPhone} = useChangePhone()
    const {mutate: updateTelegram, isLoading: isLoadingTelegram} = useChangeTelegram()

    const submitForm: SubmitHandler<UpdateCredentialFormBody> = (data) => {
        console.log(data)
        const credentials: UpdateCredentialsBody = {
            name: data.name,
            surname: data.surname,
        }
        updateCredentials(credentials)
        updatePhone(data.phone)
        updateTelegram(data.telegram)
    }

    return (
        <form className="w-full flex flex-col" onSubmit={handleSubmit(submitForm)}>
            <div className="w-full grid grid-cols-2 gap-7 ">
                <MyInput name={`name`}
                         label={`Name`}
                         control={control}
                         required={"Name is required"}
                />
                <MyInput name={`surname`}
                         label={`Surname`}
                         control={control}
                         required={"Surname is required"}
                />
                <MyInput name={`phone`}
                         label={`Phone number`}
                         control={control}
                />
                <MyInput name={`telegram`}
                         label={`Telegram`}
                         control={control}
                />
            </div>
            <MyButton
                type={`submit`}
                color={`primary`}
                className={`px-5 py-2 mt-4 ml-auto`}
                disabled={isLoadingCredentials || isLoadingPhone || isLoadingTelegram}
            >Change Info</MyButton>
            {(isLoadingCredentials || isLoadingPhone || isLoadingTelegram)
                && <CircularProgress
					color={'primary'}
					size={"lg"}
					label="Updating..."
				/>}
        </form>
    )
}

export default UpdateCredentialsForm;
