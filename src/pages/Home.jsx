import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/login", { replace: true });
    }, [])
    return <h1>Home</h1>;
};

export default Home;