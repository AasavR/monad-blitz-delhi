'use client';

import { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState({
    totalMinted: 0,
    holderCount: 0,
    totalVolume: 0,
    topHolders: [],
  });

  // Mock data - in real app, fetch from backend/API
  useEffect(() => {
    setAnalyticsData({
      totalMinted: 1250,
      holderCount: 892,
      totalVolume: 45.2,
      topHolders: [
        { address: '0x1234...abcd', count: 25 },
        { address: '0x5678...efgh', count: 18 },
        { address: '0x9abc...ijkl', count: 15 },
      ],
    });
  }, []);

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'NFTs Minted',
        data: [120, 190, 300, 500, 200, 300],
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Minting Activity Over Time',
      },
    },
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Collection Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900">Total Minted</h3>
          <p className="text-3xl font-bold text-indigo-600">{analyticsData.totalMinted}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900">Unique Holders</h3>
          <p className="text-3xl font-bold text-indigo-600">{analyticsData.holderCount}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900">Total Volume (ETH)</h3>
          <p className="text-3xl font-bold text-indigo-600">{analyticsData.totalVolume}</p>
        </div>
      </div>

      <div className="mb-8">
        <Bar data={chartData} options={chartOptions} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Top Holders</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NFTs Owned
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analyticsData.topHolders.map((holder, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                    {holder.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {holder.count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
