const assert = require('assert').strict;

const CryptoCoders = artifacts.require("./CryptoCoders.sol");

contract("CryptoCoders", accounts => {
  let contract;

  before( async () => {
    contract = await CryptoCoders.deployed();


  })
  it("..deployed", async () => {
    assert.notEqual(contract,"", "dddd")
     
  });
   
  it("minted and added", async() =>{
    const result = await contract.mint("isahaq")
    console.log(result);

  })


});
