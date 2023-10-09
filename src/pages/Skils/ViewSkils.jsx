import React, { useEffect, useState } from 'react';
import DeleteButton from '../../components/DeleteButton';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const ViewSkils = () => {

    const [skils, setskils] = useState([]);

    const navigate = useNavigate();

    const fetchData = () => {
        let token = localStorage.getItem('token');
        const config = {
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            timeout: 5000 // 5 seconds
        }
        const url = process.env.REACT_APP_MAIN_URL + "/dashboard/skils";
        axios
            .get(url, config)
            .then((response) => {
                setskils(response.data)
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
        return (
            <tr key={index}>
                <th>{index + 1}</th>
                <th>
                    <div className="dropdown">
                        <a id="navbarDropdown" className="dropdown-toggle" href="#" role="button"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-gear text-black-50"></i>
                        </a>

                        <div className="dropdown-menu dropdown-menu-start"
                            aria-labelledby="navbarDropdown">
                            <Link className='dropdown-item text-end' to={`/ShowSkils/${skil.id}`}>
                                <i className="fa fa-eye text-black-50 mx-2"></i>عرض</Link>
                            <Link className='dropdown-item text-end' to={`/EditSkils/${skil.id}`}>
                                <i className="fa fa-pen text-black-50 mx-2"></i>تعديل</Link>
                            <DeleteButton fetchData={fetchData} id={skil.id} name={skil.name} url='skils' key={index} />
                        </div>
                    </div>
                </th>
                <th scope="row" >{skil.name}</th>

            </tr>
        )
    });
    return (
        <div className="container d-flex flex-column flex-grow-1 flex-wrap justify-content-center align-items-center">
            <div className="container pt-3">
                <div className="row justify-content-center">
                    <label htmlFor="floatingInput " className="h1">جميع المهارات</label>

                    <div className="col-12">
                        <div className="table-responsive-md bg-white" data-mdb-perfect-scrollbar="true"
                            style={{ position: 'relative', height: '100%' }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col" width="30px">#</th>
                                        <th scope="col" width="30px"></th>
                                        <th scope="col">الاسم</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderskils}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewSkils;