import React, { useEffect, useState } from 'react';
import { getUnverifiedProducts, getSourcingGaps, getParticipantComplianceScores } from '../utils/api';

const AdminDashboard = () => {
    const [unverifiedProducts, setUnverifiedProducts] = useState(0);
    const [sourcingGaps, setSourcingGaps] = useState([]);
    const [complianceScores, setComplianceScores] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setUnverifiedProducts(await getUnverifiedProducts());
            setSourcingGaps(await getSourcingGaps());
            setComplianceScores(await getParticipantComplianceScores());
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Unverified Products: {unverifiedProducts}</h2>
            <h3>Sourcing Gaps</h3>
            <ul>
                {sourcingGaps.map((gap, index) => (
                    <li key={index}>{gap}</li>
                ))}
            </ul>
            <h3>Participant Compliance Scores</h3>
            <table>
                <thead>
                    <tr>
                        <th>Participant</th>
                        <th>Compliance Score</th>
                    </tr>
                </thead>
                <tbody>
                    {complianceScores.map((score, index) => (
                        <tr key={index}>
                            <td>{score.participant}</td>
                            <td>{score.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;