// src/pages/FundDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header2 from '../components/Header2';
import { MF_API } from '../components/API';

const FundDetails = () => {
    const { schemeCode } = useParams();
    const [latestData, setLatestData] = useState(null);
    const [historicalData, setHistoricalData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingHistory, setLoadingHistory] = useState(false);

    useEffect(() => {
        const fetchLatest = async () => {
            try {
                const res = await axios.get(`${MF_API}/${schemeCode}/latest`);
                setLatestData(res.data);
            } catch (err) {
                console.error("Error fetching latest data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLatest();
    }, [schemeCode]);

    const fetchHistoricalData = async () => {
        setLoadingHistory(true);
        try {
            const res = await axios.get(`${MF_API}/${schemeCode}`);
            setHistoricalData(res.data);
        } catch (err) {
            console.error("Error fetching historical data", err);
        } finally {
            setLoadingHistory(false);
        }
    };

    return (
        <>
            <Header2 />
            <div className="fund-details-page" style={{ padding: '2rem' }}>
                {loading ? (
                    <p>Loading latest data...</p>
                ) : latestData ? (
                    <div>
                        <center><h2><u>{latestData.meta.scheme_name}</u></h2></center>
                        <table className="table table-bordered" style={{ width: '100%', marginTop: '1rem' }}>
                            <tbody>
                                <tr>
                                    <th>Fund House</th>
                                    <td>{latestData.meta.fund_house}</td>
                                </tr>
                                <tr>
                                    <th>Scheme Code</th>
                                    <td>{latestData.meta.scheme_code}</td>
                                </tr>
                                <tr>
                                    <th>Scheme Type</th>
                                    <td>{latestData.meta.scheme_type}</td>
                                </tr>
                                <tr>
                                    <th>Scheme Category</th>
                                    <td>{latestData.meta.scheme_category}</td>
                                </tr>
                                <tr>
                                    <th>Latest NAV</th>
                                    <td>₹{latestData.data[0]?.nav}</td>
                                </tr>
                                <tr>
                                    <th>Growth</th>
                                    <td>{latestData.meta.isin_growth}</td>
                                </tr>
                                <tr>
                                    <th>Reinvestment</th>
                                    <td>{latestData.meta.isin_div_reinvestment}</td>
                                </tr>
                                <tr>
                                    <th>Date</th>
                                    <td>{latestData.data[0]?.date}</td>
                                </tr>
                            </tbody>
                        </table>

                        {!historicalData && (
                            <button type='button' className='btn btn-warning' onClick={fetchHistoricalData} style={{ marginTop: '1rem' }}>
                                View More Details
                            </button>
                        )}
                    </div>
                ) : (
                    <p>No latest data found.</p>
                )}

                {loadingHistory && <p>Loading full history...</p>}
                {historicalData && (
                    <div style={{ marginTop: '2rem' }}>
                        <h3>Full History</h3>
                        <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>NAV</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historicalData.data.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.date}</td>
                                            <td>₹{item.nav}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default FundDetails;
