import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
const CreateUser = () => {
    const [dropArea, setdropArea] = useState();
    const [photo, setphoto] = useState();
    const navigate = useNavigate();
    const [dragText, setdragText] = useState();
    const [City, setCity] = useState();
    const [cities, setcities] = useState();
    const [dropAreaInput, setdropAreaInput] = useState();
    const [seccuss, setseccuss] = useState("");
    const [skils, setskils] = useState("");
    const [error, seterror] = useState("");
    useEffect(() => {
        const dd = document.querySelector('.drag-area');
        setdropArea(dd);
        setdragText(dd.querySelector("header"));
        setdropAreaInput(document.querySelector(".drag-area-input"));
    }, [])
    const uploadBtnclick = e => {
        e.preventDefault();
        dropAreaInput.click();
    }
    const dropAreaInputChanged = () => {
        setphoto(dropAreaInput.files[0])
        showfile(dropAreaInput.files[0]);
    }
    const showfile = (file) => {
        let fileType = file.type;
        let validExetentions = ['image/jpeg', 'image/jpg', 'image/png'];
        if (validExetentions.includes(fileType)) {
            let fileReader = new FileReader();
            fileReader.onload = () => {
                let fileUrl = fileReader.result;
                let imgTag = `<img src="${fileUrl}"/>`
                dropArea.innerHTML = imgTag;
            };
            fileReader.readAsDataURL(file);
        } else {
            alert('this not an image!');
            dropArea.classList.remove('active');
        }
    }
    const dropAreaDragOver = e => {
        e.preventDefault();
        dropArea.classList.add('active');
        dragText.textContent = "relase to upload";
    }
    const dropAreaOnDragLeave = e => {
        dropArea.classList.remove('active');
        dragText.textContent = "drag & drop to upload a file";
    }
    const dropAreaDrop = e => {
        e.preventDefault();
        dropArea.classList.remove('active');
        // getting user selected files
        setphoto(e.dataTransfer.files[0]);

        dropAreaInput.files = e.dataTransfer.files;
        // console.log(dropAreaInput.files)
        showfile(e.dataTransfer.files[0]);
    }
    const {
        register,
        handleSubmit, control,
        watch,
        formState: { errors },
    } = useForm();
    const watchPassword = watch("password");
    const onSubmit = (data) => {
        let formData = new FormData();
        formData.append("name", data.name);
        formData.append("phone", data.phone);
        formData.append("password", data.password);
        formData.append("photo", photo);
        formData.append("type", "user");
        formData.append("neighbourhood", data.neighbourhood);
        formData.append("city_id", City);
        let selectedskils = [];
        skils
            .filter((cb) => cb.checked === true)
            .map((cate) => {
                selectedskils.push(cate.id);
            });
        formData.append("skils", selectedskils);
        let url = process.env.REACT_APP_MAIN_URL + "/dashboard/users";
        console.log("url", url)
        console.log('data', formData);
        let token = localStorage.getItem('token');
        const config = {
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "multipart/form-data",
            },
            timeout: 5000 // 5 seconds
        }
        axios
            .post(url, formData, config)
            .then((response) => {
                setseccuss("users created successfully!");
                seterror(false);
            })
            .catch((error) => {
                setseccuss(false);
                console.log(error);
                seterror("Something went wrong!");
                if (error && error.response && error.response.data === "SQLITE_CONSTRAINT: UNIQUE constraint failed: users.phone")
                    seterror("رقم الهاتف محوز من قبل شخص آخر");
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
        const url = process.env.REACT_APP_MAIN_URL + "/dashboard/users/createData";
        axios
            .get(url, config)
            .then((response) => {
                setskils(response.data.skils)
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
                    <input type="text" className="form-control" id="name" name="name" {...register("name", { required: true })} />
                    <label htmlFor="floatingInput">الاسم</label>
                    {errors.name && <p className="text-danger">Name is required</p>}
                </div>
                <div className="form-floating mb-3">
                    <input type="phone" className="form-control" id="phone" name="phone" {...register("phone", { required: true })} />
                    <label htmlFor="floatingInput">رقم الهاتف</label>
                    {errors.phone && <p className="text-danger"> phone is required</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">كلمة السر</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        {...register("password", { required: true })}
                    />
                    {errors.password && <p className="text-danger">Password is required</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">أكد كلمة السر</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="form-control"
                        {...register("confirmPassword", {
                            required: true,
                            validate: (value) => value === watchPassword,
                        })}
                    />
                    {errors.confirmPassword && (
                        <p className="text-danger">Passwords do not match</p>
                    )}
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
                        defaultValue=""
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
                <div className="form-floating mb-3">
                    <div className="drag-area" onDragOver={dropAreaDragOver} onDragLeave={dropAreaOnDragLeave} onDrop={dropAreaDrop}>
                        <div className="icon"><i className="fas fa-cloud-upload-alt"></i></div>
                        <header>drag & drop to upload a photo</header>
                        <span>OR</span>
                        <button onClick={uploadBtnclick}>browser a photo</button>
                    </div>
                    <input onChange={dropAreaInputChanged} className="drag-area-input" type="file" name="photo" hidden />
                </div>
                <div className="mt-4 mb-0">
                    <div className="d-grid"><button className="btn btn-primary btn-block headding" type="submit">احفظ</button></div>
                </div>
            </form>
        </div>);
};
export default CreateUser;