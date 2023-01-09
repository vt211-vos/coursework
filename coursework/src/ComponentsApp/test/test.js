import {useForm} from "react-hook-form";

const Test = props =>{
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        mode: "onChange"
    })
    const onSubmit = data => {
        console.log(data)
    }
    return<>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('name', {
            required: "Name is require field!"
            })} type={"text"}
            placeholder="Name"/>
            {errors?.name && (
                <div style={{color: 'red'}}>{errors.name.message}</div>
            )}
            <br/>
            <input {...register('email', {
                required: "Email is require field!",
                pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Please enter valid email",
                }

            })}
            placeholder="Email"
            />
            {errors?.email && (
                <div style={{color: 'red'}}>{errors.email.message}</div>
            )}

            <div>
                <button>Send</button>
            </div>
        </form>
    </>
}

export default Test