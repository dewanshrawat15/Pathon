import React, { Component } from 'react';
import Web3 from 'web3';

import './App.css';
import Pathon from '../abis/Pathon.json'
import Navbar from './Navbar'
import Main from './Main'

const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      pathon: null,
      posts: [],
      loading: true
    }
    this.tipProjectOwner = this.tipProjectOwner.bind(this);
    this.createNewProject = this.createNewProject.bind(this);
    this.captureFile = this.captureFile.bind(this);
  }

  async componentWillMount(){
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3(){
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3){
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Non ethereum based browser detected. You should consider trying MetaMask!");
    }
  }

  async loadBlockchainData(){
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({
      account: accounts[0]
    });
    const networkID = await web3.eth.net.getId();
    const networkData = Pathon.networks[networkID];
    console.log(networkData);
    if(networkData){
      const pathon = web3.eth.Contract(Pathon.abi, networkData.address);
      const postCount = await pathon.methods.postCount().call();
      this.setState({ pathon, postCount });
      console.log(this.state);
      for (var i = 1; i <= postCount; i++) {
        const post = await pathon.methods.posts(i).call();
        this.setState({
          posts: [...this.state.posts, post]
        });
      }
      this.setState({
        posts: this.state.posts.sort((a,b) => b.tipAmount - a.tipAmount )
      })
      this.setState({ loading: false})
    } else {
      // raise error
      window.alert("Pathon contract not yet deployed to detected network");
    }
  }

  createNewProject = (title, tagline, description, projectUrl) => {
    console.log("Submitting file to ipfs...");
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      if(error) {
        console.error(error);
        return
      }

      this.setState({ loading: true });
      this.state.pathon.methods.uploadPost(result[0].hash, title, tagline, description, projectUrl).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false });
      });
    });
  }

  async tipProjectOwner(id, tipAmount) {
    this.setState({ loading: true });
    await this.state.pathon.methods.tipPostOwner(id).send({
      from: this.state.account,
      value: tipAmount
    });
    window.location.reload();
  }

  captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
      console.log('buffer', this.state.buffer);
    }
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
            posts={this.state.posts}
            captureFile={this.captureFile}
            tipProjectOwner={this.tipProjectOwner}
            uploadPost={this.createNewProject}
          />
        }
      </div>
    );
  }
}

export default App;