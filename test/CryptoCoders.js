const assert = require('assert').strict;

const CryptoCoders = artifacts.require("./CryptoCoders.sol");

require("chai")
  .use(require("chai-as-promised"))
  .should();


contract("CryptoCoders", accounts => {
  let contract, result,cryptoCoderCounter ;

  before( async () => {
    contract = await CryptoCoders.deployed();


  })
  it("..deployed", async () => {
    assert.notEqual(contract,"", "dddd")
     
  });
   
  // it("minted and added", async() =>{
  //   const mintoutput = await contract.mint("isahaq")
  //   console.log(mintoutput);

  // })
  describe("application features", async () => {
    it("allows users to mint ERC721 token", async () => {
      cryptoCoderCount = await contract.cryptoCoderCounter();
      console.log(cryptoCoderCounter.toNumber());
      assert.equal(cryptoCoderCount.toNumber(), 0);

      let tokenExists;
      tokenExists = await contract.getTokenExists(1, { from: accounts[0] });
      assert.equal(tokenExists, false);
      
      result = await contract.mint(
        "myCBNFT",
        web3.utils.toWei("1", "Ether"),
        {from: accounts[0]}
      );

      cryptoCoderCount = await contract.cryptoCoderCounter();
      assert.equal(cryptoCoderCount.toNumber(), 1);

      tokenExists = await contract.getTokenExists(1, { from: accounts[0] });
      assert.equal(tokenExists, true);

      

      let cryptoCoder;
      cryptoCoder = await contract.allCryptoCoders(1, {
        from: accounts[0],
      });
      assert.equal(cryptoCoder.tokenId.toNumber(), 1);
      assert.equal(cryptoCoder.tokenName, "myCBNFT");
      assert.equal(cryptoCoder.mintedBy, accounts[0]);
      assert.equal(cryptoCoder.currentOwner, accounts[0]);
      assert.equal(
        cryptoCoder.previousOwner,
        0x0000000000000000000000000000000000000000
      );
      assert.equal(web3.utils.fromWei(cryptoCoder.price, "ether"), 1);
      assert.equal(cryptoCoder.numberOfTransfers.toNumber(), 0);
      assert.equal(cryptoCoder.forSale, true);
 
    
      await contract.mint(
        "myCBNFT2",
        web3.utils.toWei("1", "Ether")
      );


      await contract.mint(
        "myCBNFT3",
        web3.utils.toWei("1", "Ether")

      );


    it("returns address of the token's owner", async () => {
      const tokenOwner = await contract.getTokenOwner(2);
      assert.equal(tokenOwner, accounts[1]);
    });

    it("returns total number of tokens minted so far", async () => {
      const totalNumberOfTokensMinted = await contract.getNumberOfTokensMinted();
      assert.equal(totalNumberOfTokensMinted.toNumber(), 3);
    });

    it("returns total number of tokens owned by an address", async () => {
      const totalNumberOfTokensOwnedByAnAddress = await contract.getTotalNumberOfTokensOwnedByAnAddress(
        accounts[0]
      );
      assert.equal(totalNumberOfTokensOwnedByAnAddress.toNumber(), 3);
    });

    // it("allows users to buy token for specified ethers", async () => {
    //   const oldTokenOwner = await cryptoBoys.getTokenOwner(1);
    //   assert.equal(oldTokenOwner, accounts[0]);

    //   let oldTokenOwnerBalance;
    //   oldTokenOwnerBalance = await web3.eth.getBalance(accounts[0]);
    //   oldTokenOwnerBalance = new web3.utils.BN(oldTokenOwnerBalance);

    //   let oldTotalNumberOfTokensOwnedBySeller;
    //   oldTotalNumberOfTokensOwnedBySeller = await cryptoBoys.getTotalNumberOfTokensOwnedByAnAddress(
    //     accounts[0]
    //   );
    //   assert.equal(oldTotalNumberOfTokensOwnedBySeller.toNumber(), 3);

    //   let cryptoBoy;
    //   cryptoBoy = await cryptoBoys.allCryptoBoys(1, {
    //     from: accounts[0],
    //   });
    //   assert.equal(cryptoBoy.numberOfTransfers.toNumber(), 0);

    //   result = await cryptoBoys.buyToken(1, {
    //     from: accounts[2],
    //     value: web3.utils.toWei("1", "Ether"),
    //   });

    //   const newTokenOwner = await cryptoBoys.getTokenOwner(1);
    //   assert.equal(newTokenOwner, accounts[2]);

    //   let newTokenOwnerBalance;
    //   newTokenOwnerBalance = await web3.eth.getBalance(accounts[0]);
    //   newTokenOwnerBalance = new web3.utils.BN(newTokenOwnerBalance);

    //   let newTotalNumberOfTokensOwnedBySeller;
    //   newTotalNumberOfTokensOwnedBySeller = await cryptoBoys.getTotalNumberOfTokensOwnedByAnAddress(
    //     accounts[0]
    //   );
    //   assert.equal(newTotalNumberOfTokensOwnedBySeller.toNumber(), 2);

    //   cryptoBoy = await cryptoBoys.allCryptoBoys(1, {
    //     from: accounts[0],
    //   });
    //   assert.equal(cryptoBoy.numberOfTransfers.toNumber(), 1);

    //   let price;
    //   price = web3.utils.toWei("1", "Ether");
    //   price = new web3.utils.BN(price);

    //   const exepectedBalance = oldTokenOwnerBalance.add(price);
    //   assert.equal(
    //     newTokenOwnerBalance.toString(),
    //     exepectedBalance.toString()
    //   );

    //   cryptoBoy = await cryptoBoys.allCryptoBoys(1, {
    //     from: accounts[0],
    //   });
    //   assert.equal(cryptoBoy.currentOwner, accounts[2]);

    //   await cryptoBoys.buyToken(2, {
    //     from: 0x0000000000000000000000000000000000000000,
    //     value: web3.utils.toWei("1", "Ether"),
    //   }).should.be.rejected;

    //   await cryptoBoys.buyToken(56, {
    //     from: accounts[4],
    //     value: web3.utils.toWei("1", "Ether"),
    //   }).should.be.rejected;

    //   await cryptoBoys.buyToken(3, {
    //     from: accounts[0],
    //     value: web3.utils.toWei("1", "Ether"),
    //   }).should.be.rejected;
    // });

    // it("allows users to change token price", async () => {
    //   let cryptoBoyPrice;
    //   cryptoBoyPrice = await cryptoBoys.allCryptoBoys(1, {
    //     from: accounts[0],
    //   });
    //   assert.equal(web3.utils.fromWei(cryptoBoyPrice.price, "ether"), 1);

    //   result = await cryptoBoys.changeTokenPrice(
    //     1,
    //     web3.utils.toWei("2", "Ether"),
    //     {
    //       from: accounts[2],
    //     }
    //   );

    //   cryptoBoyPrice = await cryptoBoys.allCryptoBoys(1, {
    //     from: accounts[0],
    //   });
    //   assert.equal(web3.utils.fromWei(cryptoBoyPrice.price, "ether"), 2);

    //   await cryptoBoys.changeTokenPrice(1, web3.utils.toWei("3", "Ether"), {
    //     from: 0x0000000000000000000000000000000000000000,
    //   }).should.be.rejected;

    //   await cryptoBoys.changeTokenPrice(82, web3.utils.toWei("3", "Ether"), {
    //     from: accounts[2],
    //   }).should.be.rejected;

    //   await cryptoBoys.changeTokenPrice(1, web3.utils.toWei("3", "Ether"), {
    //     from: accounts[6],
    //   }).should.be.rejected;
    // });

    // it("allows users to toggle between setting the token for sale or not for sale", async () => {
    //   let cryptoboy;
    //   cryptoboy = await cryptoBoys.allCryptoBoys(1, {
    //     from: accounts[0],
    //   });
    //   assert.equal(cryptoboy.forSale, true);

    //   result = await cryptoBoys.toggleForSale(1, { from: accounts[2] });

    //   cryptoboy = await cryptoBoys.allCryptoBoys(1, {
    //     from: accounts[0],
    //   });
    //   assert.equal(cryptoboy.forSale, false);

    //   result = await cryptoBoys.toggleForSale(1, { from: accounts[2] });

    //   cryptoboy = await cryptoBoys.allCryptoBoys(1, {
    //     from: accounts[0],
    //   });
    //   assert.equal(cryptoboy.forSale, true);

    //   await cryptoBoys.toggleForSale(1, {
    //     from: 0x0000000000000000000000000000000000000000,
    //   }).should.be.rejected;

    //   await cryptoBoys.toggleForSale(94, { from: accounts[2] }).should.be
    //     .rejected;

    //   await cryptoBoys.toggleForSale(1, { from: accounts[8] }).should.be
    //     .rejected;
    });
  });
 

});
