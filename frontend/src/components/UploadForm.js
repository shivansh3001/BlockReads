import React, { useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import './UploadForm.css';
import Navbar from "../components/Navbar"; // Adjust path based on file structure
const UploadForm = () => {
  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');
  const [rentPrice, setRentPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Define your contract address here
  const contractAddress = '0x6471EACC40D24bC9F4BAB843560eDFEa190730c5';
  const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "buyResearch",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "rentResearch",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "intro",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "contentHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "rentPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "salePrice",
				"type": "uint256"
			}
		],
		"name": "uploadResearch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getRenters",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getResearchDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "intro",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "contentHash",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "rentPrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "salePrice",
						"type": "uint256"
					},
					{
						"internalType": "address[]",
						"name": "renters",
						"type": "address[]"
					}
				],
				"internalType": "struct ResearchDApp.Research",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "researchById",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "intro",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "contentHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "rentPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "salePrice",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "researches",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "intro",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "contentHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "rentPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "salePrice",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const validateInput = () => {
    if (!file || !title || !intro || !rentPrice || !salePrice) {
      setError('Please fill all fields.');
      return false;
    }
    if (file.size > 10485760) { // 10MB file size limit
      setError('File size must be less than 10MB.');
      return false;
    }
    setError('');
    return true;
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const ipfsRes = await axios.post('http://localhost:3000/upload', formData);
      const contentHash = ipfsRes.data.ipfsHash;

      const web3 = new Web3(window.ethereum);
      await web3.eth.requestAccounts(); // More modern approach than `enable()`

      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        setError('Please connect to MetaMask.');
        setIsLoading(false);
        return;
      }
      const account = accounts[0];

      const contract = new web3.eth.Contract(abi, contractAddress);

      // Ensure that decimal values are properly handled by converting them to Wei
      const rentPriceWei = web3.utils.toWei(rentPrice.toString(), "ether");
      const salePriceWei = web3.utils.toWei(salePrice.toString(), "ether");

      console.log("Calling uploadResearch with:", {title, intro, contentHash, rentPriceWei, salePriceWei, account});
      await contract.methods
        .uploadResearch(title, intro, contentHash, rentPriceWei, salePriceWei)
        .send({ from: account });

      alert('Research uploaded successfully!');
    } catch (error) {
      console.error("Error:", error);
      setError('Error uploading research. ' + error.message);
    }
    setIsLoading(false);
  };

  return (
	<>
      <Navbar />
    <div className="upload-bg">
      <form className="upload-form-glass" id="uploadForm" onSubmit={handleUpload}>
        <h2 className="upload-form-title">🚀 Upload Your Research Paper</h2>

        {error && <p className="upload-form-error">{error}</p>}

        <input
          id="uploadTitle"
          className="upload-input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          id="uploadIntro"
          className="upload-textarea"
          placeholder="Introduction"
          value={intro}
          onChange={e => setIntro(e.target.value)}
        />

        <input
          id="uploadRentPrice"
          className="upload-input"
          type="text"
          placeholder="Rent Price (ETH)"
          value={rentPrice}
          onChange={e => setRentPrice(e.target.value)}
        />

        <input
          id="uploadSalePrice"
          className="upload-input"
          type="text"
          placeholder="Sale Price (ETH)"
          value={salePrice}
          onChange={e => setSalePrice(e.target.value)}
        />

        <input
          id="uploadFile"
          className="upload-file-input"
          type="file"
          onChange={e => setFile(e.target.files[0])}
        />

        <button
          id="uploadSubmit"
          className="upload-button"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
	</>
  );
};

export default UploadForm;