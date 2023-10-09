import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePhones = () => {
    const [seccuss, setseccuss] = useState("");
    const [error, seterror] = useState("");

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    console.log('we here');
    const onSubmit = (data) => {
        let formData = new FormData();
        formData.append("number", data.number);
        let url = process.env.REACT_APP_MAIN_URL + "/dashboard/phone";
        console.log("url", url)
        console.log('data', formData);
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
                setseccuss("phone created successfully!");
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

            <div className="h1">أضف رقم هاتف</div>
            {seccuss && <div className="alert alert-success">
                {seccuss}
            </div>}
            {error && <div className="alert alert-danger">
                {error}
            </div>}

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" name="number"
                        id="number"
                        {...register("number", { required: true })} />
                    <label htmlFor="floatingInput">رقم هاتف</label>
                    {errors.name && <p className="text-danger">الرقم مطلوب</p>}
                </div>
                <div className="mt-4 mb-0">
                    <div className="d-grid"><button className="btn btn-primary btn-block headding" type="submit">احفظ</button>
                    </div>
                </div>
            </form>
        </div>);
};

export default CreatePhones;