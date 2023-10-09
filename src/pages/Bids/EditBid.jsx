import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
const EditBid = () => {
    const [City, setCity] = useState();
    const navigate = useNavigate();
    const [cities, setcities] = useState();
    const { id } = useParams();
    const [seccuss, setseccuss] = useState("");
    const [skils, setskils] = useState("");
    const [error, seterror] = useState("");

    const {
        register, control,
        handleSubmit, reset,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        let formData = new FormData();
        formData.append("title", data.title);
        formData.append("details", data.details);
        formData.append("pierod", data.pierod);
        formData.append("price", data.price);
        formData.append("id", id);
        formData.append("neighbourhood", data.neighbourhood);
        formData.append("city_id", City);
        let selectedskils = [];
        skils
            .filter((cb) => cb.checked === true)
            .forEach((cate) => {
                selectedskils.push(cate.id);
            });
        formData.append("skils", selectedskils);
        let url = process.env.REACT_APP_MAIN_URL + "/dashboard/bids";
        console.log("url", url)
        console.log('data', formData);
        let token = localStorage.getItem('token');
        const config = {
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            timeout: 5000 // 5 seconds
        }
        axios
            .put(url, formData, config)
            .then((response) => {
                setseccuss("bid created successfully!");
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



    const fetchData = () => {
        let token = localStorage.getItem('token');
        const config = {
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            timeout: 5000 // 5 seconds
        }
        const url = process.env.REACT_APP_MAIN_URL + "/dashboard/bids/edit/" + id;
        axios
            .get(url, config)
            .then((response) => {
                let s = response.data.skils;
                s.filter((cb) => response.data.bid.skils.includes(cb.id))
                    .map((cate) => {
                        cate.checked = true
                    });
                setskils(s);
                setCity(response.data.bid.city_id);
                reset(response.data.bid);
                setcities(response.data.citis)
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 401) {
                    navigate("/login", { replace: true });
                }
            });
    }

    useEffect(() => {
        console.log("Dishes");
        fetchData();
    }, []);

    const renderskils = skils && skils.map((skil, index) => {
        const toggle = () => {
            const checkboxData = [...skils];
            checkboxData[index].checked = !checkboxData[index].checked;
            setskils(checkboxData);
        }
        if (skil.checked) {
            return (
                <Button key={index} variant="info" onClick={toggle}>
                    <FontAwesomeIcon icon={faCheck} />
                    {skil.name}
                </Button>
            )
        }
        else {
            return (
                <Button key={index} variant="light" onClick={toggle}>
                    <FontAwesomeIcon icon={faXmark} />
                    {skil.name}
                </Button>
            )
        }
    });
    return (
        <div className="d-flex flex-column w-100 align-items-center justify-content-center mt-4">

            {seccuss && <div className="alert alert-success">
                {seccuss}
            </div>}
            {error && <div className="alert alert-danger">
                {error}
            </div>}


            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="title" name="title" {...register("title", { required: true })} />
                    <label htmlFor="floatingInput">العنوان</label>
                    {errors.title && <p className="text-danger"> title is required</p>}
                </div>
                <div className="form-floating mb-3">
                    <input type="number" className="form-control" id="price" name="price" {...register("price", { required: true })} />
                    <label htmlFor="floatingInput">السعر</label>
                    {errors.price && <p className="text-danger"> price is required</p>}
                </div>
                <div className="form-floating mb-3">
                    <input type="number" className="form-control" id="pierod" name="pierod" {...register("pierod", { required: true })} />
                    <label htmlFor="floatingInput">المدة الزمنية</label>
                    {errors.pierod && <p className="text-danger" > pierod is required</p>}
                </div>
                <div className="form-floating mb-3">
                    <textarea name="details" className="form-control" id="details" rows="10"{...register("details", { required: true })} ></textarea>
                    <label htmlFor="floatingInput">التفاصيل</label>
                    {errors.details && <p className="text-danger" > details is required</p>}
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="neighbourhood" name="neighbourhood" {...register("neighbourhood", { required: true })} />
                    <label htmlFor="floatingInput">الحي</label>
                    {errors.neighbourhood && <p className="text-danger" > neighbourhood is required</p>}
                </div>
                <div className="form-group m-5">
                    <label htmlFor="confirmPassword">أضف المهارات</label>
                    {renderskils}
                </div>
                <div className="form-group m-5">
                    <label htmlFor="floatingInput">المدينة</label>
                    <Controller
                        control={control}
                        name="option"
                        defaultValue=''
                        rules={{ required: true }}
                        render={({ field }) => (
                            <select
                                className="form-control"
                                onChange={(e) => {
                                    field.onChange(e);
                                    setCity(e.target.value);
                                }}
                                value={field.value}
                                ref={field.ref}
                            >
                                {cities && cities.map((option, index) => (
                                    <option key={index} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                </div>

                <div className="mt-4 mb-0">
                    <div className="d-grid"><button className="btn btn-primary btn-block headding" type="submit">احفظ</button></div>
                </div>
            </form >
        </div >);
};
export default EditBid;