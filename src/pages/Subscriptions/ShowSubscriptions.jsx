import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DeleteButton from '../../components/DeleteButton';
const ShowSubscriptions = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [Subscription, setSubscription] = useState([]);
    const fetchData = () => {
        let token = localStorage.getItem('token');
        const config = {
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            timeout: 5000 // 5 seconds
        }
        const url = process.env.REACT_APP_MAIN_URL + "/dashboard/Subscription/" + id;
        axios
            .get(url, config)
            .then((response) => {
                setSubscription(response.data.subscription)
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 401) {
                    navigate("/login", { replace: true });
                }
            });
    }
    const navigateto = () => {
        navigate("/ViewSubscription", { replace: true });
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
                                                    <Link className='dropdown-item text-end' to={`/EditSubscriptions/${Subscription.id}`}>
                                                        <i className="fa fa-pen text-black-50 mx-2"></i>تعديل</Link>
                                                    <DeleteButton fetchData={navigateto} id={Subscription.id} name={Subscription.price} url='Subscription' key={id} />
                                                </div>
                                            </div>السعر
                                        </th>
                                        <td> {Subscription.price}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">الفترة الزمنية</th>
                                        <td>{Subscription.period}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">النوع</th>
                                        <td>{Subscription.type}</td>
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

export default ShowSubscriptions;