
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
const EditUser = () => {
    const [dropArea, setdropArea] = useState();
    const { id } = useParams();
    const [photo, setphoto] = useState();

    const navigate = useNavigate();
    const [oldPhoto, setoldPhoto] = useState();
    const [dragText, setdragText] = useState();
    const [dropAreaInput, setdropAreaInput] = useState();
    const [seccuss, setseccuss] = useState("");
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
        handleSubmit,
        reset, control,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        let formData = new FormData();
        formData.append("name", data.name);
        formData.append("phone", data.phone);
        formData.append("photo", photo);
        formData.append("id", id);
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
            .put(url, formData, config)
            .then((response) => {
                setseccuss("user Updated successfully!");
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
        const url = process.env.REACT_APP_MAIN_URL + "/dashboard/users/edit/" + id;
        axios
            .get(url, config)
            .then((response) => {
                console.log(response.data);
                setoldPhoto(response.data.user.photo)
                reset(response.data.user);
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
                <img src={process.env.REACT_APP_MAIN_URL + '/' + oldPhoto} alt=""
                    className="img-fluid" style={{ maxHeight: 100 }} />
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
export default EditUser;