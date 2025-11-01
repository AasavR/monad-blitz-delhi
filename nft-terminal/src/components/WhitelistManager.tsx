'use client';

import { useState } from 'react';

export default function WhitelistManager() {
  const [addresses, setAddresses] = useState<string[]>([]);
  const [newAddress, setNewAddress] = useState('');

  const addAddress = () => {
    if (newAddress && !addresses.includes(newAddress)) {
      setAddresses([...addresses, newAddress]);
      setNewAddress('');
    }
  };

  const removeAddress = (address: string) => {
    setAddresses(addresses.filter(addr => addr !== address));
  };

  const handleSubmit = () => {
    // TODO: Update whitelist on smart contract
    console.log('Updating whitelist:', addresses);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Manage Whitelist</h2>

      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
          Add Wallet Address
        </label>
        <div className="flex">
          <input
            type="text"
            id="address"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            placeholder="0x..."
            className="flex-1 border-gray-300 rounded-l-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            onClick={addAddress}
            className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700"
          >
            Add
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Whitelisted Addresses ({addresses.length})</h3>
        <div className="max-h-64 overflow-y-auto border rounded-md">
          {addresses.length === 0 ? (
            <p className="p-4 text-gray-500">No addresses added yet</p>
          ) : (
            addresses.map((address, index) => (
              <div key={index} className="flex justify-between items-center p-2 border-b last:border-b-0">
                <span className="font-mono text-sm">{address}</span>
                <button
                  onClick={() => removeAddress(address)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
      >
        Update Whitelist
      </button>
    </div>
  );
}
