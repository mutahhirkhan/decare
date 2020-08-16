pragma solidity ^0.5.16;
import "./Campaign.sol";


//Campaign factory: This contract is used to deploy and keep track of deployed Campaigns
contract CampaignFactory{
    
    //list of all the deployed Campaigns
    address[] public deployedCampaigns;
    
    //deploys a new Campaign
    function createCampaign(
        address _manager, 
        string memory _title, 
        string memory _description, 
        uint _initialAmountGoal, 
        uint _createdAt,
        uint _closedAt) public {
        Campaign newCampaign = new Campaign( _manager, _title,  _description, _initialAmountGoal, _createdAt, _closedAt);
        deployedCampaigns.push(address(newCampaign));
    }
    
    function getCampaignsCount() public view returns(uint) {
        return deployedCampaigns.length;
    }
    
    function getDeployedCampaigns() public view returns(address[] memory){
        return deployedCampaigns;
    }
    
    function getLastDeployedContract() public view returns(address){
        return deployedCampaigns[deployedCampaigns.length-1];
    }
}