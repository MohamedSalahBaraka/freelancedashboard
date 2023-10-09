import React from 'react';
import { Outlet, Link } from "react-router-dom";
const Layout = () => {
    return (
        <div className='sb-nav-fixed'>
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">

                <Link to="/" className='nav-link text-white' >Logo</Link>

                <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i
                    className="bi bi-list mobile-nav-toggle"></i></button>
            </nav>
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div className="sb-sidenav-menu">
                            <div className="nav">
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                    data-bs-target="#collapseLayoutsbid" aria-expanded="false"
                                    aria-controls="collapseLayoutsbid">
                                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                    الأعمال
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </a>
                                <div className="collapse" id="collapseLayoutsbid" aria-labelledby="headingOne"
                                    data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to="/CreateBid" className='nav-link ' >اضافة عمل جديد</Link>
                                        <Link to="/ViewBid" className='nav-link ' >كل الأعمال</Link>

                                    </nav>

                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                    data-bs-target="#collapseLayoutsContributer" aria-expanded="false"
                                    aria-controls="collapseLayoutsContributer">
                                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                    المدن
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </a>
                                <div className="collapse" id="collapseLayoutsContributer" aria-labelledby="headingOne"
                                    data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to="/CreateCity" className='nav-link ' >اضافة مدينة جديدة</Link>
                                        <Link to="/ViewCity" className='nav-link ' >كل المدن</Link>

                                    </nav>

                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                    data-bs-target="#collapseLayoutsCategory" aria-expanded="false"
                                    aria-controls="collapseLayoutsCategory">
                                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                    المهارات
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </a>
                                <div className="collapse" id="collapseLayoutsCategory" aria-labelledby="headingOne"
                                    data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to="/CreateSkils" className='nav-link ' >اضافة مهارة جديدة</Link>
                                        <Link to="/ViewSkils" className='nav-link ' >كل المهارات</Link>
                                    </nav>

                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                    data-bs-target="#collapseLayoutsUser" aria-expanded="false"
                                    aria-controls="collapseLayoutsUser">
                                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                    المستخدمين
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </a>
                                <div className="collapse" id="collapseLayoutsUser" aria-labelledby="headingOne"
                                    data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to="/CreateUser" className='nav-link ' >اضافة مستخدم جديد</Link>
                                        <Link to="/ViewUser" className='nav-link ' >كل المستخدمين</Link>
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                    data-bs-target="#collapseLayoutsAdmin" aria-expanded="false"
                                    aria-controls="collapseLayoutsAdmin">
                                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                    المشرفين
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </a>
                                <div className="collapse" id="collapseLayoutsAdmin" aria-labelledby="headingOne"
                                    data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to="/CreateAdmin" className='nav-link ' >اضافة مشرف جديد</Link>
                                        <Link to="/ViewAdmin" className='nav-link ' >كل المشرفين</Link>

                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                    data-bs-target="#collapseLayoutsphones" aria-expanded="false"
                                    aria-controls="collapseLayoutsphones">
                                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                    ارقام الهواتف
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </a>
                                <div className="collapse" id="collapseLayoutsphones" aria-labelledby="headingOne"
                                    data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to="/CreatePhones" className='nav-link ' >اضافة رقم جديد</Link>
                                        <Link to="/ViewPhones" className='nav-link ' >كل ارقام الهواتف</Link>

                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                    data-bs-target="#collapseLayoutssubscribtion" aria-expanded="false"
                                    aria-controls="collapseLayoutssubscribtion">
                                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                    الاشتراكات
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </a>
                                <div className="collapse" id="collapseLayoutssubscribtion" aria-labelledby="headingOne"
                                    data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to="/CreateSubscriptions" className='nav-link ' >اضافة اشتراك جديد</Link>
                                        <Link to="/ViewSubscriptions" className='nav-link ' >كل الاشتراكات</Link>

                                    </nav>
                                </div>


                            </div>
                        </div>
                    </nav>
                </div>
                <div id="layoutSidenav_content">
                    <main className="d-flex flex-fill">
                        <Outlet />
                    </main>
                    <footer className="py-4 bg-light mt-auto">
                        <div className="container-fluid px-4">
                            <div className="d-flex align-items-center justify-content-between small">
                                <div className="text-muted">Copyright &copy; dragon tech 2022</div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>


        </div>
    )
};

export default Layout;