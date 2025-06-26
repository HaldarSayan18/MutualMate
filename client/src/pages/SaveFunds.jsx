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
        try {
            await axios.delete(`${BASE_URL}/delete/${userId}/${fund.schemeCode}`);
            setSavedFunds(prev => prev.filter(item => item.schemeCode !== fund.schemeCode));
            toast.error('Item deleted.', {
                autoClose: 2500,
                position: "top-center"
            });
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    useEffect(() => {
        const fetchSavedFunds = async () => {
            // const user = JSON.parse(localStorage.getItem('user'));
            const res = await axios.get(`${BASE_URL}/save/${userId}`);
            setSavedFunds(res.data.savedItems);
        };
        fetchSavedFunds();
    });

    return (
        <>
            <Header2 />
            <div>
                <h2>Your Saved Mutual Funds</h2>
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
                            savedFunds.map((fund, index) => (
                                <tr key={index}>
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
            </div>
        </>
    );
};

export default SavedFunds;
