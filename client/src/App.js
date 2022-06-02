import React, { useEffect, useState } from "react";
import CryptoCoders from "./contracts/CryptoCoders.json";
import getWeb3 from "./getWeb3";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Navbar from "./component/Navbar";

const App = () => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [coders, setCoders] = useState([]);
  const [mintText, setText] = useState("");
  

  //load account from metamask
  const loadWeb3Account = async (web3) => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    if (accounts) {
      setAccount(accounts[0]);
    }
  };

  //load contract
  const loadWeb3Contract = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const networkData = await CryptoCoders.networks[networkId];
    console.log(networkData);

    if (networkData) {
      const abi = CryptoCoders.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      setContract(contract);

      console.log(contract);

      return contract;
    }
  };

  //load all nfts

  const loadNFTS = async (contract) => {
    const totalSupply = await contract.methods.totalSupply().call();
    console.log("totalSupply :", totalSupply);

    let nfts = [];

    for (let i = 0; i < totalSupply; i++) {
      let coder = await contract.methods.coders(i).call();
      nfts.push(coder);
    }
    setCoders(nfts);

    console.log(nfts);
  };

  //mint nft

  const mint = () => {
    console.log(mintText);
    contract.methods.mint(mintText).send({from : account}, error =>{
      console.log("in mint")
      if(!error){
        setCoders([...coders, mintText]);
        setText("")

      }
    })
  };

  useEffect(async () => {
    const web3 = await getWeb3();

    await loadWeb3Account(web3);
    let contract = await loadWeb3Contract(web3);
    await loadNFTS(contract);

    console.log(web3);
  }, []);

  return (
    <div>
    <Navbar/>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col d-flex flex-column align-items-center">
            <img
              className="mb-4"
              src="https://avatars.dicebear.com/api/pixel-art/nft.svg"
              alt=""
              width="72"
            />
            <h1 className="display-5 fw-bold">Crypto Coders</h1>
            <div className="col-6 text-center mb-3">
              <p className="lead text-center">
                We are inventors, innovators, and creators
              </p>
              <div>
                <input
                  type="text"
                  value={mintText}
                  onChange={(e) => setText(e.target.value)}
                  className="form-control mb-2"
                  placeholder="e.g. Isahaq"
                />
                <button onClick={mint} className="btn btn-primary">
                  Mint
                </button>
              </div>
            </div>
            <div className="col-8 d-flex justify-content-center flex-wrap">
              {coders.map((coder, key) => (
                <div
                  className="d-flex flex-column align-items-center"
                  key={key}
                >
                  <img
                    width="150"
                    src={`https://avatars.dicebear.com/api/pixel-art/${coder.replace(
                      "#",
                      ""
                    )}.svg`}
                  />
                  <span>{coder}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
