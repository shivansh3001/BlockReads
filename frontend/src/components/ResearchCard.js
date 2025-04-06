import React from 'react';
import getContract from '../utils/contract';
import { PinataSDK } from 'pinata';
import './ResearchCard.css';

const pinata = new PinataSDK({
  pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhNzM1ODU3My04OWJmLTQzNjUtOGJmNy1hN2JhMTU5YzJmZGUiLCJlbWFpbCI6InJhd2F0YXJpbmRhbTk1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI4YTcyZjdiOTBmNzFkYWY2OWQ1ZiIsInNjb3BlZEtleVNlY3JldCI6ImYyNTFkMzMzZDkzOWM0NGRlNTViNGE1NTRjYmYyMTBlNDBkNGRhOWQxMzhlZjc0MDM1NDUxZmUyOTc3YTY0ZWMiLCJleHAiOjE3NzUzODAzNjl9.UmtDnNOvCUSNbD1BJfxKL5b4XyVyNZsozFqxGBt_lic",
  pinataGateway: "gateway.pinata.cloud" // Update this to the actual gateway if different
});

const ResearchCard = ({ research, id }) => {
  const handleRent = async () => {
    const { contract, account } = await getContract();
    try {
      await contract.methods.rentResearch(id).send({
        from: account,
        value: research.rentPrice,
      });
      alert('Rented successfully');

      // After successful rent, create an access link
      const accessLink = await pinata.gateways.public.createAccessLink({
        cid: research.contentHash,
        expires: 30 // Link expires in 30 seconds
      });

      if (accessLink && accessLink.url) {
        window.open(accessLink.url, '_blank'); // Opens the temporary URL in a new tab
      }

    } catch (error) {
      console.error("Error during the renting process or creating access link:", error);
      alert('Failed to rent or retrieve file.');
    }
  };


  const handleBuy = async () => {
    const { contract, account } = await getContract();
    try {
      await contract.methods.buyResearch(id).send({
        from: account,
        value: research.salePrice,
      });
      alert('Purchased successfully');

      // After successful purchase, fetch the file from IPFS
      const { data, contentType } = await pinata.gateways.public.get(research.contentHash);
      console.log('File fetched from IPFS:', data);
      
      // Assuming it's a text file or similar; adjust handling depending on actual file type
      // For example, if it's an image or PDF, you might want to display it differently
      const blob = new Blob([data], { type: contentType });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');

    } catch (error) {
      console.error('Error during purchase or file retrieval:', error);
      alert('Failed to purchase or retrieve file.');
    }
  };

  return (
    <div className="research-card" id={`ResearchCard-${id}`}>
      <h3 className="research-card-title">{research.title}</h3>
      <p className="research-card-intro">{research.intro}</p>
      <p className="research-card-owner">Owner: {research.owner}</p>
      <div className="research-card-buttons">
        <button onClick={handleBuy} className="research-card-button buy">Buy</button>
      </div>
    </div>
  );
};

export default ResearchCard;
