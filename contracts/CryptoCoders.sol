// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "../client/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../client/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";



contract CryptoCoders is ERC721, ERC721Enumerable{

    string [] public coders;

    mapping(string => bool) _coderExist;
    uint256 public cryptoCoderCounter;
    

    struct CryptoCoder {
    uint256 tokenId;
    string tokenName;
    address payable mintedBy;
    address payable currentOwner;
    address payable previousOwner;
    uint256 price;
    uint256 numberOfTransfers;
    bool forSale;
  }

   mapping(uint256 => CryptoCoder) public allCryptoCoders;




    constructor() ERC721("CryptoCoders","NFT"){

    }

    function mint(string memory coder, uint256 _price) public {

        require(!_coderExist[coder]);
        coders.push(coder);
        uint _id=coders.length;
        cryptoCoderCounter++;

        _mint(msg.sender, cryptoCoderCounter);
        _coderExist[coder]=true;
        

    CryptoCoder memory newCryptoCoder = CryptoCoder(
    cryptoCoderCounter,
    coder,
    payable(msg.sender),
    payable(msg.sender),
    payable(address(0)),
    _price,
    0,
    true);

    // add the token id and it's crypto boy to all crypto boys mapping
     allCryptoCoders[cryptoCoderCounter] = newCryptoCoder;

   }


 // get total number of tokens minted so far
  function getNumberOfTokensMinted() public view returns(uint256) {
    uint256 totalNumberOfTokensMinted = totalSupply();
    return totalNumberOfTokensMinted;
  }

  // get total number of tokens owned by an address
  function getTotalNumberOfTokensOwnedByAnAddress(address _owner) public view returns(uint256) {
    uint256 totalNumberOfTokensOwned = balanceOf(_owner);
    return totalNumberOfTokensOwned;
  }

   // check if the token already exists
  function getTokenExists(uint256 _tokenId) public view returns(bool) {
    bool tokenExists = _exists(_tokenId);
    return tokenExists;
  }


   // by a token by passing in the token's id
  function buyToken(uint256 _tokenId) public payable {
    // check if the function caller is not an zero account address
    require(msg.sender != address(0));
    // check if the token id of the token being bought exists or not
    require(_exists(_tokenId));
    // get the token's owner
    address tokenOwner = ownerOf(_tokenId);
    // token's owner should not be an zero address account
    require(tokenOwner != address(0));
    // the one who wants to buy the token should not be the token's owner
    require(tokenOwner != msg.sender);
    // get that token from all crypto boys mapping and create a memory of it defined as (struct => CryptoBoy)
    CryptoCoder memory cryptoCoder = allCryptoCoders[_tokenId];
    // price sent in to buy should be equal to or more than the token's price
    require(msg.value >= cryptoCoder.price);
    // token should be for sale
    require(cryptoCoder.forSale);

    // transfer the token from owner to the caller of the function (buyer)
    _transfer(tokenOwner, msg.sender, _tokenId);
    // get owner of the token
    address payable sendTo = cryptoCoder.currentOwner;
    // send token's worth of ethers to the owner
    sendTo.transfer(msg.value);
    // update the token's previous owner
    cryptoCoder.previousOwner = cryptoCoder.currentOwner;
    // update the token's current owner
   cryptoCoder.currentOwner = payable(msg.sender);
    // update the how many times this token was transfered
   cryptoCoder.numberOfTransfers += 1;
    // set and update that token in the mapping
    allCryptoCoders[_tokenId] = cryptoCoder;
  }

   // switch between set for sale and set not for sale
  function toggleForSale(uint256 _tokenId) public {

    // require caller of the function is not an empty address

    require(msg.sender != address(0));
    // require that token should exist

    require(_exists(_tokenId));
    // get the token's owner
    address tokenOwner = ownerOf(_tokenId);
    // check that token's owner should be equal to the caller of the function

    require(tokenOwner == msg.sender);
    // get that token from all crypto boys mapping and create a memory of it defined as (struct => CryptoBoy)
    CryptoCoder memory cryptoCoder = allCryptoCoders[_tokenId];
    // if token's forSale is false make it true and vice versa
    if(cryptoCoder.forSale) {
      cryptoCoder.forSale = false;
    } else {
      cryptoCoder.forSale = true;
    }
    // set and update that token in the mapping
    allCryptoCoders[_tokenId] = cryptoCoder;

  }

   function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }



}

