import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DeleteButton from '../../components/DeleteButton';
const ShowBid = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bid, setbid] = useState([]);
    const fetchData = () => {
        let token = localStorage.getItem('token');
        const config = {
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            timeout: 5000 // 5 seconds
        }
        const url = process.env.REACT_APP_MAIN_URL + "/dashboard/bids/" + id;
        axios
            .get(url, config)
            .then((response) => {
                console.log(process.env.REACT_APP_MAIN_URL + response.data.bid.photo);
                setbid(response.data.bid)
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 401) {
                    navigate("/login", { replace: true });
                }
            });
    }
    const navigateto = () => {
        navigate("/ViewBid", { replace: true });
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
                                                    <Link className='dropdown-item text-end' to={`/EditBid/${bid.id}`}>
                                                        <i className="fa fa-pen text-black-50 mx-2"></i>تعديل</Link>
                                                    <DeleteButton fetchData={navigateto} id={bid.id} name={bid.name} url='bids' key={id} />
                                                </div>
                                            </div>العنوان
                                        </th>
                                        <td> {bid.title}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">التفاصيل</th>
                                        <td>{bid.details}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">السعر</th>
                                        <td>{bid.price}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">الفترة الزمنية</th>
                                        <td>{bid.pierod}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">الحي</th>
                                        <td>{bid.neighbourhood}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">المدينة</th>
                                        <td>{bid.cityname}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">تاريخ الانشاء</th>
                                        <td>{bid.created_at}</td>
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

export default ShowBid;