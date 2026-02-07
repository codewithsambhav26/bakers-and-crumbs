
import axios from 'axios';
import React from 'react';

const useAxiosPublic = () => {
    const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL; // Using environment variable

    const axiosPublic = axios.create({
        baseURL: API_BASE_URL,
    });

    return axiosPublic;
};

export default useAxiosPublic;
