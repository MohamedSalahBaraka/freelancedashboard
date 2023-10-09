import React, { useEffect, useState } from 'react';
import DeleteButton from '../../components/DeleteButton';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
const ViewProposals = () => {

    const [proposals, setproposals] = useState([]);
    const { id } = useParams();

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
        const url = process.env.REACT_APP_MAIN_URL + "/dashboard/proposals?id=" + id;
        axios
            .get(url, config)
            .then((response) => {
                setproposals(response.data)
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
    const renderproposals = proposals && proposals.map((proposal, index) => {
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
                            <Link className='dropdown-item text-end' to={`/ShowProposals/${proposal.id}`}>
                                <i className="fa fa-eye text-black-50 mx-2"></i>عرض</Link>
                            <DeleteButton fetchData={fetchData} id={proposal.id} name={proposal.username} url='proposals' key={index} />
                        </div>
                    </div>
                </th>
                <th scope="row" >{proposal.username}</th>
                <th scope="row" >{proposal.price}</th>

            </tr>
        )
    });
    return (
        <div className="container d-flex flex-column flex-grow-1 flex-wrap justify-content-center align-items-center">
            <div className="container pt-3">
                <div className="row justify-content-center">
                    <label htmlFor="floatingInput " className="h1">جميع العروض</label>

                    <div className="col-12">
                        <div className="table-responsive-md bg-white" data-mdb-perfect-scrollbar="true"
                            style={{ position: 'relative', height: '100%' }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col" width="30px">#</th>
                                        <th scope="col" width="30px"></th>
                                        <th scope="col">اسم</th>
                                        <th scope="col">السعر</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderproposals}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProposals;