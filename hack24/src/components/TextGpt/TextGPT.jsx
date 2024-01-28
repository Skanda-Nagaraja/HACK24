import React, { useState, useEffect } from 'react';

const CompanyProfile = ({ selectedStock }) => {
    const [companyDescription, setCompanyDescription] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCompanyDescription = async () => {
            if (!selectedStock) {
                setCompanyDescription('');
                setError('');
                return;
            }

            try {
                const response = await fetch(`/company_description?ticker=${selectedStock}`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error(`Network response was not ok, status: ${response.status}`);
                }

                const responseData = await response.json();
                if (responseData.description) {
                    setCompanyDescription(responseData.description);
                } else {
                    setCompanyDescription('No description available.');
                }
            } catch (error) {
                console.error('Error fetching company description:', error);
                setError('Failed to fetch company description. Please try again.');
            }
        };

        fetchCompanyDescription();
    }, [selectedStock]);

    return (
        <div className="font-neuton bg-slate-100 p-6 rounded-lg shadow-md">
            <h1 className="text-xl font-semibold text-slate-700 mb-4">
                Company Profile for <span className="text-slate-800">{selectedStock || "N/A"}</span>
            </h1>
            {companyDescription ? (
                <p className="text-slate-600">{companyDescription}</p>
            ) : (
                <p className="text-slate-600">Select a stock to view its company profile.</p>
            )}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default CompanyProfile;