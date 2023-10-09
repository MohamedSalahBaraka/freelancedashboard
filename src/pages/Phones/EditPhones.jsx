import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Createphone = () => {
    const [seccuss, setseccuss] = useState("")
    const { id } = useParams();

    const navigate = useNavigate();
    const [error, seterror] = useState("");
    const fetchData = () => {
        let token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            timeout: 5000 // 5 seconds
        }
        const url = process.env.REACT_APP_MAIN_URL + "/dashboard/phone/" + id;
        axios
            .get(url, config)
            .then((response) => {
                reset(response.data.phone)
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 401) {
                    navigate("/login", { replace: true });
                }
            });
    }
    useEffect(() => {
        fetchData();
    }, []);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        let formData = new FormData();
        formData.append("id", id);
        formData.append("number", data.number);
        let url = process.env.REACT_APP_MAIN_URL + "/dashboard/phone";
        let token = localStorage.getItem('token');
        const config = {
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            timeout: 5000 // 5 seconds
        }
        axios
            .put(url, formData, config)
            .then((response) => {
                setseccuss("phone Updated successfully!");
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

            <div className="h1">عدل رقم الهاتف</div>
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
                    <label for="floatingInput">رقم الهاتف</label>
                    {errors.name && <p className="text-danger">رقم الهاتف مطلوب</p>}
                </div>
                <div className="mt-4 mb-0">
                    <div className="d-grid"><button className="btn btn-primary btn-block headding" type="submit">احفظ</button>
                    </div>
                </div>
            </form>
        </div>);
};

export default Createphone;