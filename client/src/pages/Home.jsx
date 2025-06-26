import React, { useCallback, useEffect, useState } from 'react'
import Header2 from '../components/Header2';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { LuSaveAll } from "react-icons/lu";
import { BASE_URL } from '../components/API';
import { useNavigate } from 'react-router-dom';
import Header1 from '../components/Header1';

const Home = () => {
    const navigate = useNavigate();
    const [apiData, setApiData] = useState([]);
    // fetch user from localstorage
    const user = JSON.parse(localStorage.getItem('user'));
    // search filter
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const handleSearch = () => {
        const term = searchTerm.toLowerCase().trim();
        if (term === '') {
            setFilteredData(apiData);
            return;
        }
        const result = apiData.filter(item =>
            item.schemeName?.toLowerCase().includes(term) ||
            item.schemeCode?.toString().includes(term)
        );
        setCurrentPage(1);
        setFilteredData(result);
    };

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 50;
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredData.slice(startIndex, endIndex);

    // fetching data from api / url
    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('https://api.mfapi.in/mf');
            // console.log('response.data===>', response.data);
            setApiData(response.data);
            setFilteredData(response.data);
        } catch (error) {
            toast.error("Error in fetching data");
            console.log("Error in fetching data===> ", error);
        }
    }, []);
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // save-fund handler
    const handleSave = async (item) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem("token");
        if (!user) {
            toast.error("Please login first", {
                position: "top-center",
                onClose: () => navigate('/login')
            });
            return;
        }

        try {
            await axios.post(`${BASE_URL}/save`, {
                userId: user._id,
                fund: item
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Saved!", {
                autoClose: 2500,
                position: "top-center"
            });
        } catch (err) {
            toast.error("Error in saving fund", {
                autoClose: 2500,
                position: "top-center"
            });
            console.error(err);
        }
    };


    return (
        <>
            {user ? <Header2 /> : <Header1 />}
            <ToastContainer />
            {/* main-heading */}
            <div className='home-container'>
                {/* main-heading */}
                <div className='home-heading-container'>
                    <p className='home-heading'>Invest Easy. Grow Steady. <br /> Choose MutualMate</p>
                </div>
                {/* sub-heading */}
                <div className='home-sub-heading-container'>
                    <p>Discover, analyze, and track the best mutual funds for your investment journey.</p>
                    <p>Make informed decisions with real-time data and insights.</p>
                </div>
                {/* search */}
                <div className="search-container">
                    <input type='search' placeholder='search mutual funds by scheme name or code..' className='search-input' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <button className="search-btn" onClick={handleSearch}>search</button>
                </div>
                {/* table */}
                <div className="table-container">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Scheme Code</th>
                                <th scope="col">Scheme Name</th>
                                <th scope="col">Growth</th>
                                <th scope="col">DivReinvestment</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center' }}>No data available</td>
                                </tr>
                            ) : (
                                currentItems.map((id, index) => (
                                    <tr key={index}>
                                        <td>{id.schemeCode}</td>
                                        <td>{id.schemeName}</td>
                                        <td>{id.isinGrowth}</td>
                                        <td>{id.isinDivReinvestment}</td>
                                        <td><LuSaveAll style={{ cursor: 'pointer' }} onClick={() => handleSave(id)} /></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* pagination */}
                <div className="pagination-container flex justify-center gap-2 my-4">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-sm font-medium px-4">Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>

            </div>
        </>
    )
}

export default Home