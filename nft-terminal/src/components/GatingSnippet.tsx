'use client';

import { useState } from 'react';

export default function GatingSnippet() {
  const [contractAddress, setContractAddress] = useState('');
  const [snippetType, setSnippetType] = useState('react');

  const generateSnippet = () => {
    if (!contractAddress) return '';

    const snippets = {
      react: `import { useAccount } from 'wagmi';
import { ethers } from 'ethers';

function GatedContent({ children }) {
  const { address } = useAccount();

  const checkOwnership = async () => {
    if (!address) return false;
    // TODO: Check NFT ownership via contract
    return true; // Placeholder
  };

  const ownsNFT = checkOwnership();

  return ownsNFT ? children : <div>Please own an NFT to access this content</div>;
}

export default GatedContent;`,

      javascript: `async function checkNFTOwnership(walletAddress, contractAddress) {
  // TODO: Implement NFT ownership check
  // This would query the blockchain for NFT balance
  return false; // Placeholder
}

// Usage:
if (await checkNFTOwnership(userWallet, '${contractAddress}')) {
  showGatedContent();
} else {
  showAccessDenied();
}`,

      html: `<script>
async function checkNFTOwnership(walletAddress, contractAddress) {
  // TODO: Implement NFT ownership check
  return false; // Placeholder
}

async function gateContent() {
  const userWallet = '/* Get user wallet address */';
  const ownsNFT = await checkNFTOwnership(userWallet, '${contractAddress}');
  const gatedElement = document.getElementById('gated-content');

  if (ownsNFT) {
    gatedElement.style.display = 'block';
  } else {
    gatedElement.innerHTML = 'Please own an NFT to access this content';
  }
}

gateContent();
</script>

<div id="gated-content" style="display: none;">
  <!-- Your gated content here -->
</div>`,
    };

    return snippets[snippetType] || snippets.javascript;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Token Gating Code Snippets</h2>

      <div className="mb-4">
        <label htmlFor="contract" className="block text-sm font-medium text-gray-700 mb-2">
          NFT Contract Address
        </label>
        <input
          type="text"
          id="contract"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          placeholder="0x..."
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="snippetType" className="block text-sm font-medium text-gray-700 mb-2">
          Code Type
        </label>
        <select
          id="snippetType"
          value={snippetType}
          onChange={(e) => setSnippetType(e.target.value)}
          className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="react">React</option>
          <option value="javascript">Vanilla JavaScript</option>
          <option value="html">HTML with JS</option>
        </select>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Generated Code Snippet</h3>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
          <code>{generateSnippet()}</code>
        </pre>
      </div>

      <button
        onClick={() => navigator.clipboard.writeText(generateSnippet())}
        className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
      >
        Copy to Clipboard
      </button>
    </div>
  );
}
