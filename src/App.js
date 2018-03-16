import React, { Component } from 'react';
import { Label, Button, Container, Row, Col } from 'reactstrap';
import logo from './logo.svg';
import './App.css';


const { web3 } = window

const coinSmithABI = web3.eth.contract([{"constant":false,"inputs":[{"name":"_description","type":"string"},{"name":"_logoURL","type":"string"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_totalSupply","type":"uint256"}],"name":"smith","outputs":[{"name":"token","type":"address"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"}],"name":"TokenCreated","type":"event"}]);

const coinSmith = coinSmithABI.at('0x5e1b6fa5bf5127bd7fbf9c21226f44fca1ce8659')

const tokenCreationEvent = coinSmith.TokenCreated()

const ercTokenABI = web3.eth.contract([{"constant":true,"inputs":[],"name":"creator","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"description","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"url","type":"string"}],"name":"setLogoURL","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"logoURL","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_description","type":"string"},{"name":"_logoURL","type":"string"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_totalSupply","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"creator","type":"address"},{"indexed":false,"name":"supply","type":"uint256"}],"name":"Created","type":"event"}])

const exchangeABI = web3.eth.contract([{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdraw","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"}],"name":"depositToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"tokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"feeMake_","type":"uint256"}],"name":"changeFeeMake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feeMake","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feeAccount","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"feeAccount_","type":"address"}],"name":"changeFeeAccount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"feeTake_","type":"uint256"}],"name":"changeFeeTake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"admin_","type":"address"}],"name":"changeAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"}],"name":"withdrawToken","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"tradeValues","type":"uint256[8]"},{"name":"tradeAddresses","type":"address[4]"},{"name":"v","type":"uint8[2]"},{"name":"r","type":"bytes32[2]"},{"name":"s","type":"bytes32[2]"}],"name":"trade","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feeTake","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"traded","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"orderFills","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"token","type":"address"},{"name":"user","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"admin_","type":"address"},{"name":"feeAccount_","type":"address"},{"name":"feeMake_","type":"uint256"},{"name":"feeTake_","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":false,"stateMutability":"nonpayable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenBuy","type":"address"},{"indexed":false,"name":"amountBuy","type":"uint256"},{"indexed":false,"name":"tokenSell","type":"address"},{"indexed":false,"name":"amountSell","type":"uint256"},{"indexed":false,"name":"expires","type":"uint256"},{"indexed":false,"name":"nonce","type":"uint256"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"v","type":"uint8"},{"indexed":false,"name":"r","type":"bytes32"},{"indexed":false,"name":"s","type":"bytes32"}],"name":"Order","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenGet","type":"address"},{"indexed":false,"name":"amountGet","type":"uint256"},{"indexed":false,"name":"tokenGive","type":"address"},{"indexed":false,"name":"amountGive","type":"uint256"},{"indexed":false,"name":"expires","type":"uint256"},{"indexed":false,"name":"nonce","type":"uint256"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"v","type":"uint8"},{"indexed":false,"name":"r","type":"bytes32"},{"indexed":false,"name":"s","type":"bytes32"}],"name":"Cancel","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenGet","type":"address"},{"indexed":false,"name":"amountGet","type":"uint256"},{"indexed":false,"name":"tokenGive","type":"address"},{"indexed":false,"name":"amountGive","type":"uint256"},{"indexed":false,"name":"get","type":"address"},{"indexed":false,"name":"give","type":"address"}],"name":"Trade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"balance","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"balance","type":"uint256"}],"name":"Withdraw","type":"event"}])

const exchange = exchangeABI.at('0x6110bda46d99f40a2bd8af47c41c3e58a5166c8a')

const exchangeAddress = '0x6110bda46d99f40a2bd8af47c41c3e58a5166c8a'

var tokens = []

const tdStyle = {
  border: '1px solid black',
  padding: '5px'  
}

const tableStyle = {
  border: '1px solid black'
}

const thStyle = {
  border: '1px solid black',
  padding: '5px'
}


class App extends Component {
  constructor() {
    super()

    this.state = {
      tokenForm: {},
      tokenList: {},
      tokensCreated: [],
      tokenBalance: {},
      depositForm: {},
      withdrawForm: {}
    }

    fetch('https://api.coinmarketcap.com/v1/ticker/ethereum/')
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({ ticker: data[0] })
      }) 
  }

  render() {

    const {tokenForm, tokensCreated, tokenBalance, depositForm, withdrawForm} = this.state

    const depositSection =
        <form className='pure-form' onSubmit={this.deposit.bind(this)}>
          <div>
            <Label>Set tokenAddress to undefined to work with ether instead of tokens</Label>
          </div>
          <div>
            <Label>Deposit</Label>
          </div>
          <div className="field">
            <div className="control">
              <Label className='label'>Token Address</Label>
              <input
                onChange={this.setDepositForm.bind(this)}
                className="input" type="text" name="tokenAddress" placeholder="0x0"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Label className='label'>Amount</Label>
              <input
                onChange={this.setDepositForm.bind(this)}
                className="input" type="text" name="amount" placeholder="10000"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Button type='submit' className="btn is-link" color="primary"> Deposit </Button>
            </div>
          </div>
        </form>

    const withdrawSection = 
        <form className='pure-form' onSubmit={this.withdraw.bind(this)}>
          <div>
            <Label>Withdraw</Label>
          </div>
          <div className="field">
            <div className="control">
              <Label className='label'>Token Address</Label>
              <input
                onChange={this.setWithdrawForm.bind(this)}
                className="input" type="text" name="tokenAddress" placeholder="0x0"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Label className='label'>Amount</Label>
              <input
                onChange={this.setWithdrawForm.bind(this)}
                className="input" type="text" name="amount" placeholder="10000"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Button type='submit' className="btn is-link" color="primary"> Withdraw </Button>
            </div>
          </div>
        </form>

    const tokenLabels = 
        <form className='pure-form' onSubmit={this.createToken.bind(this)}>
          <div className="field">
            <div className="control">
              <Label className='label'>Symbol </Label>
              <input
                onChange={this.setTokenForm.bind(this)}
                className="input" type="text" name="symbol" placeholder="SYM"/>
            </div>
          </div>
          <div className='field'>
            <div className='control'>
              <Label className='label'>Name </Label>
              <input className='input' onChange={this.setTokenForm.bind(this)} type="text" name="name" placeholder='Trent Token'/>
            </div>
          </div>
          <div className='field'>
            <div className='control'>
              <Label className='label'>Description</Label>
              <input className='input' onChange={this.setTokenForm.bind(this)} type="text" name="description" placeholder="The token for Trent."/>
            </div>
          </div>
          <div className='field'>
            <div className='control'>
              <Label className='label'>Total Supply</Label>
              <input className='input' onChange={this.setTokenForm.bind(this)} step='1e-18' type="number" name="totalSupply" placeholder="100,000,000"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Button type='submit' className="btn is-link" color="primary"> Create </Button>
            </div>
          </div>
        </form>

    const tokenList = 
      <div>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <th style={thStyle}>
              Tokens Created
              </th>
              <td style={tdStyle}>
              Balance
              </td>
            </tr>
            {tokensCreated.map((t) => (
              <tr>
                  <th style={thStyle}>{t}</th>
                  <td style={tdStyle}>{tokenBalance[t]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Web3 Mydex Demo</h1>
        </header>
        <p className="App-intro">
          Eth wallet: {web3.eth.coinbase}
        </p>
        <Container>
          <Row>
            <Col>
            {tokenLabels}
            </Col>
            <Col>
            {depositSection}
            {withdrawSection}
            </Col>
            <Col>
            {tokenList}
            </Col>
          </Row>
        </Container>
      </div>
    );

  }
  setTokenForm(e) {
    let { tokenForm } = this.state

    tokenForm[e.target.name] = e.target.value
    this.setState({ tokenForm })
  }

  setDepositForm(e) {
    let {depositForm} = this.state

    depositForm[e.target.name] = e.target.value
    this.setState({ depositForm })
  }

  setWithdrawForm(e) {
    let {withdrawForm} = this.state

    withdrawForm[e.target.name] = e.target.value
    this.setState({ withdrawForm })
  }

  componentDidMount() {
    let {tokensCreated, tokenBalance} = this.state
    var currentState = this;
    tokenCreationEvent.watch((error, result) => {
        console.log(result);
        tokensCreated.push(result.args.token);
        var erc20Contract = ercTokenABI.at(result.args.token)
        var tokenAddress = result.args.token

        erc20Contract.balanceOf(web3.eth.coinbase, (error, result) => {
             if(!error)
                tokenBalance[tokenAddress] = web3.fromWei(result.toNumber(), "ether")
             else
                 console.error(error);
         });
        currentState.setState({tokensCreated})
    });
  }

  deposit(e) {
    e.preventDefault()

    const { depositForm } = this.state

    var amountDeposited = web3.toWei(depositForm.amount)

    if(depositForm.tokenAddress) {
      var erc20Contract = ercTokenABI.at(depositForm.tokenAddress)

      var batchTransactionForDeposit = new web3.createBatch();

      // TODO: Change this to batch request
      erc20Contract.approve(exchangeAddress, amountDeposited,
        function(error, result) {
          exchange.depositToken(depositForm.tokenAddress, amountDeposited, 
            function(error, result) {
              if(!error)
                console.log(result)
          })
        })
      
    } else {
      exchange.deposit({
        from: web3.eth.coinbase,
        value: amountDeposited
      }, (error, result) => {
        if (!error)
          console.log(result)
        else
          console.log(error) 
      })
    }
  }

  withdraw(e) {
    e.preventDefault()

    const {withdrawForm} = this.state

    var amountWithdrawn = web3.toWei(withdrawForm.amount)

    if(withdrawForm.tokenAddress) {
      exchange.withdrawToken(withdrawForm.tokenAddress, amountWithdrawn,
        function(error,result) {
          if(!error)
            console.log(result)
        })
    } else {
      exchange.withdraw(amountWithdrawn,
        function(error, result) {
          if(!error)
            console.log(result)
        })
    }

  }

  createToken(e) {
    e.preventDefault()

    const { tokenForm, ticker } = this.state
    const fee = web3.toWei(5 / ticker.price_usd)

    coinSmith.owner(function(error, result){
    if(!error)
        console.log(JSON.stringify(result));
    else
        console.error(error);
    });

    coinSmith.smith(
      tokenForm.description || '',
      tokenForm.logoURL || '',
      tokenForm.name,
      tokenForm.symbol,
      web3.toWei(tokenForm.totalSupply),
      function(error, result){
        if(!error)
            console.log(JSON.stringify(result));
        else
            console.error(error);
        }
    );

  }
}

export default App;
