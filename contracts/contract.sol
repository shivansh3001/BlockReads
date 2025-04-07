// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract ResearchDApp {
    struct Research {
        uint id;
        address payable owner;
        string title;
        string intro;
        string contentHash; // IPFS hash of the full paper
        uint rentPrice;
        uint salePrice;
        address[] renters;
    }

    Research[] public researches;
    mapping(uint => Research) public researchById;

    function uploadResearch(string memory title, string memory intro, string memory contentHash, uint rentPrice, uint salePrice) public {
        address[] memory renters;
        researches.push(Research(researches.length, payable(msg.sender), title, intro, contentHash, rentPrice, salePrice, renters));
        researchById[researches.length - 1] = researches[researches.length - 1];
    }

    function rentResearch(uint id) public payable {
        require(msg.value == researchById[id].rentPrice, "Incorrect rent amount");
        researchById[id].renters.push(msg.sender);
    }

    function buyResearch(uint id) public payable {
        require(msg.value == researchById[id].salePrice, "Incorrect sale amount");
        address payable previousOwner = researchById[id].owner;
        previousOwner.transfer(msg.value);
        researchById[id].owner = payable(msg.sender);
    }

    function getResearchDetails(uint id) public view returns (Research memory) {
        return researchById[id];
    }

    function getRenters(uint id) public view returns (address[] memory) {
        return researchById[id].renters;
    }
}