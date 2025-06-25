import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../components/API';
import Header2 from '../components/Header2';

const SavedFunds = () => {
    const [savedFunds, setSavedFunds] = useState([]);

    useEffect(() => {
        const fetchSavedFunds = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            const res = await axios.get(`${BASE_URL}/save/${user._id}`);
            setSavedFunds(res.data.savedItems);
        };
        fetchSavedFunds();
    }, []);

    return (
        <>
        <Header2/>
        <div>
            <h2>Your Saved Mutual Funds</h2>
            <ul>
                {savedFunds.map((fund, index) => (
                    <li key={index}>{fund.schemeName} - {fund.schemeCode}</li>
                ))}
            </ul>
        </div>
        </>
    );
};

export default SavedFunds;
