import Web3 from 'web3';
import ResearchDAppABI from '../contracts/ResearchDApp.json';

const getContract = async () => {
  const web3 = new Web3(window.ethereum);
  await window.ethereum.request({ method: 'eth_requestAccounts' });

  const contractAddress = "0x6471EACC40D24bC9F4BAB843560eDFEa190730c5";
  const contract = new web3.eth.Contract(ResearchDAppABI, contractAddress);
  const accounts = await web3.eth.getAccounts();
  console.log(accounts)
  return { contract, web3, account: accounts[0] };
};

export default getContract;
