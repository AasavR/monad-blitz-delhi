'use client';

import { useState } from 'react';
import MintForm from '../../components/MintForm';
import WhitelistManager from '../../components/WhitelistManager';
import Analytics from '../../components/Analytics';
import GatingSnippet from '../../components/GatingSnippet';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('mint');

  const tabs = [
    { id: 'mint', name: 'Mint NFT', component: MintForm },
    { id: 'whitelist', name: 'Whitelist', component: WhitelistManager },
    { id: 'analytics', name: 'Analytics', component: Analytics },
    { id: 'gating', name: 'Token Gating', component: GatingSnippet },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || MintForm;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">NFT Terminal Dashboard</h1>

          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-8">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
