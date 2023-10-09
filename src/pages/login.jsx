import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const [message, setmessage] = useState();
    const {
        register, control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        let formData = new FormData();
        formData.append("phone", data.phone);
        formData.append("password", data.password);
        let url = process.env.REACT_APP_MAIN_URL + "/login";
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            timeout: 5000 // 5 seconds
        }
        axios
            .post(url, formData, config)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem('token', response.data.token);
                navigate("/ViewUser", { replace: true });
            })
            .catch((error) => {
                console.log(error);
                setmessage(error.response.data.message)
            });
    }
    return (<main className="d-flex flex-fill">
        <div className="container d-flex flex-fill justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="row w-100 justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">تسجيل الدخول</div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>

                                {message && <p className="text-danger">{message}</p>}
                                <div className="row mb-3">
                                    <label htmlFor="phone" className="col-md-4 col-form-label text-md-end">
                                        رقم الهاتف</label>

                                    <div className="col-md-6">
                                        <input id="phone" type="number"
                                            className="form-control" name="phone" {...register("phone", { required: true })} />

                                        {errors.phone && <p className="text-danger"> phone is required</p>}

                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="password" className="col-md-4 col-form-label text-md-end">كلمة السر</label>

                                    <div className="col-md-6">
                                        <input id="password" type="password"
                                            className="form-control " name="password"{...register("password", { required: true })} />


                                        {errors.password && <p className="text-danger"> password is required</p>}
                                    </div>
                                </div>


                                <div className="row mb-0">
                                    <div className="col-md-8 offset-md-4">
                                        <button type="submit" className="btn btn-primary">
                                            سجل دخولك
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>);
};

export default Login;