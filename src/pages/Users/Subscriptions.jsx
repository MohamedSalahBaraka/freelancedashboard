import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CreateSubscriptions = () => {
    const [seccuss, setseccuss] = useState("");
    const [error, seterror] = useState("");
    const { id } = useParams();
    const [ust, setust] = useState();

    const navigate = useNavigate();
    const {
        register,
        handleSubmit, control,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        let formData = new FormData();
        formData.append("ust", ust);
        formData.append("number", data.period);
        formData.append("id", id);
        let url = process.env.REACT_APP_MAIN_URL + "/dashboard/users/subscripe";
        let token = localStorage.getItem('token');
        const config = {
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            timeout: 5000 // 5 seconds
        }
        axios
            .post(url, formData, config)
            .then((response) => {
                setseccuss("Subscription created successfully!");
                seterror(false);
            })
            .catch((error) => {
                setseccuss(false);
                console.log(error);
                seterror("Something went wrong!");
                if (error.response.status === 401) {
                    navigate("/login", { replace: true });
                }
            });
    };
    return (
        <div className="d-flex w-100 flex-column align-items-center justify-content-center mt-4">

            <div className="h1">أضف اشتراك</div>
            {seccuss && <div className="alert alert-success">
                {seccuss}
            </div>}
            {error && <div className="alert alert-danger">
                {error}
            </div>}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" name="period"
                        id="period"
                        {...register("period", { required: true })} />
                    <label htmlFor="floatingInput">الفترة</label>
                    {errors.period && <p className="text-danger"> period is required</p>}
                </div>

                <div className="form-group m-5">
                    <label htmlFor="floatingInput">نوع الاشتراك</label>
                    <Controller
                        control={control}
                        name="option"
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                            <select
                                className="form-control"
                                onChange={(e) => {
                                    field.onChange(e);
                                    setust(e.target.value);
                                }}
                                value={field.value}
                                ref={field.ref}
                            >
                                <option value="">
                                    اختر
                                </option>
                                <option value="fullWorker">
                                    كامل
                                </option>
                                <option value="small">
                                    اشتراك عرض الاسم فقط
                                </option>
                            </select>
                        )}
                    />
                </div>
                <div className="mt-4 mb-0">
                    <div className="d-grid"><button className="btn btn-primary btn-block headding" type="submit">احفظ</button>
                    </div>
                </div>
            </form>
        </div>);
};

export default CreateSubscriptions;