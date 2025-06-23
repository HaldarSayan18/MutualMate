import React from 'react'
import Header2 from '../components/Header2'

const Home = () => {
    return (
        <>
            <Header2 />
            {/* main-heading */}
            <div className='home-container'>
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
                    <input type='search' placeholder='search mutual funds by scheme name or code..' className='search-input' />
                    <button className="search-btn">search</button>
                </div>
                {/* table */}
                <div className="table-container">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Scheme Code</th>
                                <th scope="col">Scheme Name</th>
                                <th scope="col">Growth</th>
                                <th scope="col">DivReinvestment</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>John</td>
                                <td>Doe</td>
                                <td>@social</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Home