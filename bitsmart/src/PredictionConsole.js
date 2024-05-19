import React, { useState } from 'react';
import axios from 'axios';
import './PredictionConsole.css';

const PredictionConsole = () => {
    const [date, setDate] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [trade, setTrade] = useState(null);

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handlePredict = async () => {
        try {
            const predictResponse = await axios.get(`http://127.0.0.1:5000/predict?start_date=${date}`);
            const tradeResponse = await axios.get(`http://127.0.0.1:5000/trade?start_date=${date}`);
            setPrediction(predictResponse.data);
            setTrade(tradeResponse.data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    return (
        <div className="prediction-console">
            <h1 className="title">BitSmart Prediction Console</h1>
            <div className="input-container">
                <label className="date-label">
                    Assume today's date is:
                    <input type="date" value={date} onChange={handleDateChange} className="date-input"/>
                </label>
                <button onClick={handlePredict} className="predict-button">Predict</button>
            </div>
            {prediction && (
                <div className="prediction-results">
                    <p className="selected-date">You have selected today as {date}. BitSmart has made the following predictions.</p>
                    <h2 className="section-title">Predicted prices (in USD) for the next seven days are:</h2>
                    <table className="results-table">
                        <tbody>
                            <tr>
                                <td>Highest Price</td>
                                <td>{prediction.highest_price}</td>
                            </tr>
                            <tr>
                                <td>Lowest Price</td>
                                <td>{prediction.lowest_price}</td>
                            </tr>
                            <tr>
                                <td>Average Closing Price</td>
                                <td>{prediction.avg_closing_price}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            {trade && (
                <div className="trade-strategy">
                    <h2 className="section-title">Recommended swing trading strategy:</h2>
                    <table className="results-table">
                        <tbody>
                            <tr>
                                <td>Sell All</td>
                                <td>{trade.sell_date}</td>
                            </tr>
                            <tr>
                                <td>All In</td>
                                <td>{trade.load_date}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PredictionConsole;
