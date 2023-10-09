import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DeleteButton from '../../components/DeleteButton';
const ShowUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setuser] = useState([]);
    const fetchData = () => {
        let token = localStorage.getItem('token');
        const config = {
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            timeout: 5000 // 5 seconds
        }
        const url = process.env.REACT_APP_MAIN_URL + "/dashboard/users/" + id;
        axios
            .get(url, config)
            .then((response) => {
                console.log(process.env.REACT_APP_MAIN_URL + response.data.user.photo);
                setuser(response.data.user)
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    navigate("/login", { replace: true });
                }
                console.log(error);
            });
    }
    const navigateto = () => {
        navigate("/ViewUser", { replace: true });
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="container d-flex flex-column flex-grow-1 flex-wrap justify-content-center align-items-center">
            <div className="container pt-3">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="table-responsive-md bg-white" data-mdb-perfect-scrollbar="true"
                            style={{ position: 'relative', height: '100%' }}>
                            <table className="table">
                                <thead>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">
                                            <div className="dropdown">
                                                <a id="navbarDropdown" className="dropdown-toggle" href="#" role="button"
                                                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="fa fa-gear text-black-50"></i>
                                                </a>

                                                <div className="dropdown-menu dropdown-menu-start" aria-labelledby="navbarDropdown">
                                                    <Link className='dropdown-item text-end' to={`/EditUser/${user.id}`}>
                                                        <i className="fa fa-pen text-black-50 mx-2"></i>تعديل</Link>
                                                    <Link className='dropdown-item text-end' to={`/Subscriptions/${user.id}`}>
                                                        <i className="fa fa-pen text-black-50 mx-2"></i>الاشتراك</Link>
                                                    <DeleteButton fetchData={navigateto} id={user.id} name={user.name} url='users' key={id} />
                                                </div>
                                            </div>الاسم
                                        </th>
                                        <td> {user.name}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">رقم الهاتف</th>
                                        <td>{user.phone}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">تاريخ الانشاء</th>
                                        <td>{user.created_at}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">تاريخ نهاية الاشتراك</th>
                                        <td>{user.finshdate}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">نوع الاشتراك</th>
                                        <td>{user.ust == "fullWorker" ? 'كامل' : 'اشتراك عرض الاسم فقط'}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">الحي</th>
                                        <td>{user.neighbourhood}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">المدينة</th>
                                        <td>{user.cityname}</td>
                                    </tr>
                                    <tr>
                                        <th>الصورة</th>
                                        <td><img src={process.env.REACT_APP_MAIN_URL + '/' + user.photo} alt=""
                                            className="img-fluid" style={{ maxHeight: 100 }} /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowUser;