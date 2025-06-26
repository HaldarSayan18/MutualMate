import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../components/API';
import Header2 from '../components/Header2';
import { useParams } from 'react-router-dom';
import { MdOutlineDelete } from "react-icons/md";
import { toast } from 'react-toastify';

const SavedFunds = () => {
    const [savedFunds, setSavedFunds] = useState([]);
    const { userId } = useParams();

    // dlt handler
    const handleDlt = async (fund) => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Unauthorized: Please log in again", {
                autoClose: 2500,
                position: "top-center"
            });
            return;
        }
        try {
            await axios.delete(`${BASE_URL}/delete/${userId}/${fund.schemeCode}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSavedFunds(prev => prev.filter(item => item.schemeCode !== fund.schemeCode));
            toast.error('Item deleted.', {
                autoClose: 2500,
                position: "top-center"
            });
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    const fetchSavedFunds = async () => {
        // const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/save/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setSavedFunds(res.data.savedItems);
    };
    console.log("userID savefund==", userId)
    useEffect(() => {
        fetchSavedFunds();
    }, []);

    return (
        <>
            <Header2 />
            <center>
                <h2 className='center'>Your Saved Mutual Funds</h2>
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
                        {savedFunds.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center' }}>No data available</td>
                            </tr>
                        ) : (
                            savedFunds.map((fund, fundId) => (
                                <tr key={fundId}>
                                    <td>{fund.schemeCode}</td>
                                    <td>{fund.schemeName}</td>
                                    <td>{fund.isinGrowth}</td>
                                    <td>{fund.isinDivReinvestment}</td>
                                    <td><MdOutlineDelete style={{ cursor: 'pointer' }} onClick={() => handleDlt(fund)} /></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </center>
        </>
    );
};

export default SavedFunds;
