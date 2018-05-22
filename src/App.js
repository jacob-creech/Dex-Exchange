import React, { Component } from 'react';
import { Label, Button, Container, Row, Col } from 'reactstrap';
import logo from './logo.svg';
import './App.css';


const { web3 } = window

const { soliditySha3, keccak256 } = require('web3-utils');

const leftPad = require('left-pad')

const {
  hashPersonalMessage,
  bufferToHex,
  toBuffer,
  ecsign,
  ecrecover
} = require('ethereumjs-util')

const { mapValues } = require('lodash');

const coinSmithABI = web3.eth.contract([{"constant":false,"inputs":[{"name":"_description","type":"string"},{"name":"_logoURL","type":"string"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_totalSupply","type":"uint256"}],"name":"smith","outputs":[{"name":"token","type":"address"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"}],"name":"TokenCreated","type":"event"}]);

const coinSmith = coinSmithABI.at('0x5e1b6fa5bf5127bd7fbf9c21226f44fca1ce8659')

const tokenCreationEvent = coinSmith.TokenCreated()

const ercTokenABI = web3.eth.contract([{"constant":true,"inputs":[],"name":"creator","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"description","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"url","type":"string"}],"name":"setLogoURL","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"logoURL","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_description","type":"string"},{"name":"_logoURL","type":"string"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_totalSupply","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"creator","type":"address"},{"indexed":false,"name":"supply","type":"uint256"}],"name":"Created","type":"event"}])

const exchangeABI = web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"orderFills","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"},{"name":"_amount","type":"uint256"}],"name":"depositToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"tokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_v","type":"uint8"},{"name":"_r","type":"bytes32"},{"name":"_s","type":"bytes32"},{"name":"_user","type":"address"},{"name":"_tradeHash","type":"bytes32"}],"name":"verifySignature","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"feeAccount","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"etherDeltaStruct","outputs":[{"name":"feeMake","type":"uint256"},{"name":"feeTake","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_feeAccount","type":"address"}],"name":"changeFeeAccount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_feeTake","type":"uint256"}],"name":"changeFeeTake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_admin","type":"address"}],"name":"changeAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenBuy","type":"address"},{"name":"_amountBuy","type":"uint256"},{"name":"_tokenSell","type":"address"},{"name":"_amountSell","type":"uint256"},{"name":"_nonce","type":"uint256"}],"name":"createOrder","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenBuy","type":"address"},{"name":"_amountBuy","type":"uint256"},{"name":"_tokenSell","type":"address"},{"name":"_amountSell","type":"uint256"},{"name":"_nonce","type":"uint256"},{"name":"_v","type":"uint8"},{"name":"_r","type":"bytes32"},{"name":"_s","type":"bytes32"}],"name":"cancelOrder","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"},{"name":"_amount","type":"uint256"}],"name":"withdrawToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"orders","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feeTake","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"etherDelta","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tokenBuy","type":"address"},{"name":"_amountBuy","type":"uint256"},{"name":"_tokenSell","type":"address"},{"name":"_amountSell","type":"uint256"},{"name":"_nonce","type":"uint256"},{"name":"_user","type":"address"},{"name":"_v","type":"uint8"},{"name":"_r","type":"bytes32"},{"name":"_s","type":"bytes32"},{"name":"_amount","type":"uint256"}],"name":"trade","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_token","type":"address"},{"name":"_user","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_admin","type":"address"},{"name":"_feeAccount","type":"address"},{"name":"_etherDelta","type":"address"},{"name":"_feeTake","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenBuy","type":"address"},{"indexed":false,"name":"amountBuy","type":"uint256"},{"indexed":false,"name":"tokenSell","type":"address"},{"indexed":false,"name":"amountSell","type":"uint256"},{"indexed":false,"name":"nonce","type":"uint256"},{"indexed":false,"name":"user","type":"address"}],"name":"Order","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenGet","type":"address"},{"indexed":false,"name":"amountGet","type":"uint256"},{"indexed":false,"name":"tokenGive","type":"address"},{"indexed":false,"name":"amountGive","type":"uint256"},{"indexed":false,"name":"nonce","type":"uint256"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"v","type":"uint8"},{"indexed":false,"name":"r","type":"bytes32"},{"indexed":false,"name":"s","type":"bytes32"}],"name":"Cancel","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenGet","type":"address"},{"indexed":false,"name":"amountGet","type":"uint256"},{"indexed":false,"name":"tokenGive","type":"address"},{"indexed":false,"name":"amountGive","type":"uint256"},{"indexed":false,"name":"get","type":"address"},{"indexed":false,"name":"give","type":"address"}],"name":"Trade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"balance","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"balance","type":"uint256"}],"name":"Withdraw","type":"event"}])

const testABI = web3.eth.contract([{"constant":true,"inputs":[{"name":"tokenBuy","type":"address"},{"name":"amountBuy","type":"uint256"},{"name":"tokenSell","type":"address"},{"name":"amountSell","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"owner","type":"address"}],"name":"testPrefixHash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenBuy","type":"address"},{"name":"amountBuy","type":"uint256"},{"name":"tokenSell","type":"address"},{"name":"amountSell","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"testHashing","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tradeValues","type":"uint256[8]"},{"name":"tradeAddresses","type":"address[4]"},{"name":"v","type":"uint8[2]"},{"name":"r","type":"bytes32[2]"},{"name":"s","type":"bytes32[2]"}],"name":"testTradeHash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tradeValues","type":"uint256[8]"},{"name":"tradeAddresses","type":"address[4]"},{"name":"v","type":"uint8[2]"},{"name":"r","type":"bytes32[2]"},{"name":"s","type":"bytes32[2]"}],"name":"testOrder","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenBuy","type":"address"},{"name":"amountBuy","type":"uint256"},{"name":"tokenSell","type":"address"},{"name":"amountSell","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"owner","type":"address"}],"name":"testHash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tradeValues","type":"uint256[8]"},{"name":"tradeAddresses","type":"address[4]"},{"name":"v","type":"uint8[2]"},{"name":"r","type":"bytes32[2]"},{"name":"s","type":"bytes32[2]"}],"name":"testSaltedTradeHash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tradeValues","type":"uint256[8]"},{"name":"tradeAddresses","type":"address[4]"},{"name":"v","type":"uint8[2]"},{"name":"r","type":"bytes32[2]"},{"name":"s","type":"bytes32[2]"}],"name":"orderHashTest","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tradeValues","type":"uint256[8]"},{"name":"tradeAddresses","type":"address[4]"},{"name":"v","type":"uint8[2]"},{"name":"r","type":"bytes32[2]"},{"name":"s","type":"bytes32[2]"}],"name":"testTrade","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}])

const exchange = exchangeABI.at('0xe27339dba3339ccba9c038a711b713c627ff6245')

const test = testABI.at('0x8e254816db29a274955be976a8115eb38897edfb')

const exchangeAddress = '0xe27339dba3339ccba9c038a711b713c627ff6245'
//const exchangeAddress = '0xd0fb3435a2b892f0c3b16839a256ab937c30afbe'

const depositEvent = exchange.Deposit()

//const exchangeAddress = '0xdc17be6dfabe8f781098665fd0003d88bbe604fb'

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
      newTradeForm: {},
      orderForm: {},
      cancelForm: {},
      tokenForm: {},
      tokenList: {},
      tradeForm: {},
      tokensCreated: [],
      tokenBalance: {},
      depositForm: {},
      withdrawForm: {},
      tradeSignForm: {},
      tradeAmount: {},
      token2Buy: {},
      token2Sell: {},
      amount2Buy: {},
      amount2Sell: {},
      orderNonce: {},
      vSign: {},
      rSign: {},
      sSign: {},
      orders: []
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

    const {newTradeForm, orderForm, cancelForm, tradeForm, tokenForm, tokensCreated, tokenBalance, depositForm, withdrawForm, tradeSignForm, orders, token2Buy, token2Sell, amount2Buy, amount2Sell, tradeAmount} = this.state

    const tradeSignSecion =
        <form className='pure-form' onSubmit={this.signTrade.bind(this)}>
          <div>
            <Label>Sign Trade</Label>
          </div>
          <div className="field">
            <div className="control">
              <Label className='label'>Token Address Buy</Label>
              <input
                onChange={this.setTradeSignForm.bind(this)}
                className="input" type="text" name="tokenBuy" placeholder="0x0"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Label className='label'>Token Address Sell</Label>
              <input
                onChange={this.setTradeSignForm.bind(this)}
                className="input" type="text" name="tokenSell" placeholder="0x0"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Label className='label'>Amount</Label>
              <input
                onChange={this.setTradeSignForm.bind(this)}
                className="input" type="text" name="amount" placeholder="10000"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Label className='label'>Price</Label>
              <input
                onChange={this.setTradeSignForm.bind(this)}
                className="input" type="text" name="price" placeholder=".01"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Button type='submit' className="btn is-link" color="primary"> SignTrade </Button>
            </div>
          </div>
        </form>

    const tradeSecion =
        <form className='pure-form' onSubmit={this.sendTrade.bind(this)}>
          <div>
            <Label>Trade</Label>
          </div>
          <div className="field">
            <div className="control">
              <Label className='label'>Order Hash</Label>
              <input
                onChange={this.setTradeForm.bind(this)}
                className="input" type="text" name="orderHash" placeholder="0x0"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Label className='label'>Amount</Label>
              <input
                onChange={this.setTradeForm.bind(this)}
                className="input" type="text" name="amount" placeholder="10"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Button type='submit' className="btn is-link" color="primary"> Trade </Button>
            </div>
          </div>
        </form>

    const depositSection =
        <form className='pure-form' onSubmit={this.deposit.bind(this)}>
          <div>
            <Label>Set tokenAddress to 0x0000000000000000000000000000000000000000 to work with ether instead of tokens</Label>
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

    const newTradeSection = 
        <form className='pure-form' onSubmit={this.sendTradeOrder.bind(this)}>
          <div>
            <Label>Trade</Label>
          </div>
          <div className="field">
            <div className="control">
              <Label className='label'>Token Buy Address</Label>
              <input
                onChange={this.setNewTradeForm.bind(this)}
                className="input" type="text" name="tokenBuyAddress" placeholder="0x0"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Label className='label'>Token Buy amount</Label>
              <input
                onChange={this.setNewTradeForm.bind(this)}
                className="input" type="text" name="tokenBuyAmount" placeholder="10"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Label className='label'>Token Sell Address</Label>
              <input
                onChange={this.setNewTradeForm.bind(this)}
                className="input" type="text" name="tokenSellAddress" placeholder="0x0"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Label className='label'>Token Sell Amount</Label>
              <input
                onChange={this.setNewTradeForm.bind(this)}
                className="input" type="text" name="tokenSellAmount" placeholder="1"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Label className='label'>Nonce</Label>
              <input
                onChange={this.setNewTradeForm.bind(this)}
                className="input" type="text" name="nonce" placeholder="0x0"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Label className='label'>Order Created by</Label>
              <input
                onChange={this.setNewTradeForm.bind(this)}
                className="input" type="text" name="user" placeholder="0x0"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Label className='label'>v</Label>
              <input
                onChange={this.setNewTradeForm.bind(this)}
                className="input" type="text" name="v" placeholder="0x0"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Label className='label'>r</Label>
              <input
                onChange={this.setNewTradeForm.bind(this)}
                className="input" type="text" name="r" placeholder="0x0"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Label className='label'>s</Label>
              <input
                onChange={this.setNewTradeForm.bind(this)}
                className="input" type="text" name="s" placeholder="0x0"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Label className='label'>Amount</Label>
              <input
                onChange={this.setNewTradeForm.bind(this)}
                className="input" type="text" name="amount" placeholder="10000"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Button type='submit' className="btn is-link" color="primary"> Execute Trade </Button>
            </div>
          </div>
        </form>

    const newOrderForm =
      <form className='pure-form' onSubmit={this.createOrder.bind(this)}>
       <div>
            <Label>Create Order</Label>
          </div>
          <div className="field">
            <div className="control">
              <Label className='label'>Token Buy Address </Label>
              <input
                onChange={this.setOrderForm.bind(this)}
                className="input" type="text" name="tokenBuy" placeholder="0x0"/>
            </div>
          </div>
          <div className='field'>
            <div className='control'>
              <Label className='label'>Amount buy </Label>
              <input className='input' onChange={this.setOrderForm.bind(this)} type="number" name="amountBuy" placeholder='1000'/>
            </div>
          </div>
          <div className='field'>
            <div className='control'>
              <Label className='label'>Token Sell Address </Label>
              <input className='input' onChange={this.setOrderForm.bind(this)} type="text" name="tokenSell" placeholder="0x0"/>
            </div>
          </div>
          <div className='field'>
            <div className='control'>
              <Label className='label'>Amount Sell </Label>
              <input className='input' onChange={this.setOrderForm.bind(this)} type="number" name="amountSell" placeholder="1000"/>
            </div>
          </div>
           <div className='field'>
            <div className='control'>
              <Label className='label'>Nonce </Label>
              <input className='input' onChange={this.setOrderForm.bind(this)} type="text" name="nonce" placeholder="1"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Button type='submit' className="btn is-link" color="primary"> Create </Button>
            </div>
          </div>
        </form>

    const cancelFormSection = 
        <form className='pure-form' onSubmit={this.cancelOrder.bind(this)}>
       <div>
            <Label>Cancel Order</Label>
          </div>
          <div className="field">
            <div className="control">
              <Label className='label'>Token Buy Address </Label>
              <input
                onChange={this.setCancelForm.bind(this)}
                className="input" type="text" name="tokenBuy" placeholder="0x0"/>
            </div>
          </div>
          <div className='field'>
            <div className='control'>
              <Label className='label'>Amount buy </Label>
              <input className='input' onChange={this.setCancelForm.bind(this)} type="number" name="amountBuy" placeholder='1000'/>
            </div>
          </div>
          <div className='field'>
            <div className='control'>
              <Label className='label'>Token Sell Address </Label>
              <input className='input' onChange={this.setCancelForm.bind(this)} type="text" name="tokenSell" placeholder="0x0"/>
            </div>
          </div>
          <div className='field'>
            <div className='control'>
              <Label className='label'>Amount Sell </Label>
              <input className='input' onChange={this.setCancelForm.bind(this)} type="number" name="amountSell" placeholder="1000"/>
            </div>
          </div>
           <div className='field'>
            <div className='control'>
              <Label className='label'>Nonce </Label>
              <input className='input' onChange={this.setCancelForm.bind(this)} type="text" name="nonce" placeholder="1"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Label className='label'>v</Label>
              <input
                onChange={this.setCancelForm.bind(this)}
                className="input" type="text" name="v" placeholder="0x0"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Label className='label'>r</Label>
              <input
                onChange={this.setCancelForm.bind(this)}
                className="input" type="text" name="r" placeholder="0x0"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Label className='label'>s</Label>
              <input
                onChange={this.setCancelForm.bind(this)}
                className="input" type="text" name="s" placeholder="0x0"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Button type='submit' className="btn is-link" color="primary"> Cancel </Button>
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

    const tradeList =
      <div>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <th style={thStyle}>
              Token
              </th>
              <td style={tdStyle}>
              Amount
              </td>
              <td style={tdStyle}>
              Price
              </td>
              <td style={tdStyle}>
              OrderHash
              </td>
            </tr>
            {orders.map((t) => (
              <tr>
                  <th style={thStyle}>{token2Buy[t]}</th>
                  <td style={tdStyle}>{amount2Buy[t]}</td>
                  <td style={tdStyle}>{tradeAmount[t]}</td>
                  <td style={tdStyle}>{t}</td>
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
            {tokenList}
            </Col>
            <Col>
            {depositSection}
            {withdrawSection}
            {tradeSignSecion}
            {newOrderForm}
            {cancelFormSection}
            {newTradeSection}
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

  setTradeSignForm(e) {
    let { tradeSignForm } = this.state

    tradeSignForm[e.target.name] = e.target.value
    this.setState({ tradeSignForm })
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

  setTradeForm(e) {
    let {tradeForm} = this.state

    tradeForm[e.target.name] = e.target.value
    this.setState({ tradeForm })
  }

  setNewTradeForm(e) {
    let {newTradeForm} = this.state

    newTradeForm[e.target.name] = e.target.value
    this.setState({ newTradeForm })
  }

  setOrderForm(e) {
    let {orderForm} = this.state

    orderForm[e.target.name] = e.target.value
    this.setState({ orderForm })
  }

  setCancelForm(e) {
    let {cancelForm} = this.state

    cancelForm[e.target.name] = e.target.value
    this.setState({ cancelForm })
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

    depositEvent.watch((error, result) => {
        if (!result) {
          console.log("error" + error);
        }
        if (result) {
          console.log("Result" + JSON.stringify(result))
        }
    });
  }

  signTrade(e) {
    e.preventDefault()

    const { tradeSignForm, orders, token2Buy, token2Sell, amount2Buy, amount2Sell, orderNonce, vSign, rSign, sSign, tradeAmount } = this.state

    // tokenBuy, amountBuy, tokenSell, amountSell, expires, nonce, maker
    // orderHash, amount

    const ownerAddress = web3.eth.coinbase

    var amountBuy = tradeSignForm.amount / tradeSignForm.price
    var amountSell = tradeSignForm.amount * tradeSignForm.price

    const raw = soliditySha3(
      {t: 'address', v: exchangeAddress}, 
      {t: 'address', v: tradeSignForm.tokenBuy}, 
      {t: 'uint256', v: amountBuy}, 
      {t: 'address', v: tradeSignForm.tokenSell}, 
      {t: 'uint256', v: amountSell},
      {t: 'uint256', v: 1})
    console.log("soliditySha3: " + raw)
    const salted = this.keccak256("\x19Ethereum Signed Message:\n32", raw)
    console.log("salted: " + salted);
    const signature = web3.eth.sign(ownerAddress, salted, (error, result) => {
      if (!error) {
        /*var r = result.slice(2, 66); 
        var s = result.slice(66, 130);
        var v = result.slice(130);*/
        var r = result.slice(0, 66)
        var s = '0x' + result.slice(66, 130)
        var v = '0x' + result.slice(130, 132)
        v = web3.toDecimal(v)
        console.log("r: " + r)
        console.log("s: " + s)
        console.log("v: " + v)
        orders.push(raw)
        token2Buy[raw] = tradeSignForm.tokenBuy
        token2Sell[raw] = tradeSignForm.tokenSell
        amount2Buy[raw] = amountBuy
        amount2Sell[raw] = amountSell
        tradeAmount[raw] = tradeSignForm.price
        orderNonce[raw] = 1
        vSign[raw] = v
        rSign[raw] = r
        sSign[raw] = s
        console.log("\"" + tradeSignForm.tokenBuy + "\", " + amountBuy + ", \"" + tradeSignForm.tokenSell + "\", " + amountSell + ", 1, " + v + ", \"" + r + "\", \"" + s + "\"")
      }
      else
        console.log(error)
    });

  }

  createOrder(e) {
    e.preventDefault()

    const { orderForm } = this.state

    const raw = soliditySha3(
      {t: 'address', v: exchangeAddress}, 
      {t: 'address', v: orderForm.tokenBuy}, 
      {t: 'uint256', v: web3.toWei(orderForm.amountBuy)}, 
      {t: 'address', v: orderForm.tokenSell}, 
      {t: 'uint256', v: web3.toWei(orderForm.amountSell)},
      {t: 'uint256', v: orderForm.nonce})
    console.log("soliditySha3: " + raw)
    const newRaw = this.keccak256(exchangeAddress, orderForm.tokenBuy, web3.toWei(orderForm.amountBuy), orderForm.tokenSell, web3.toWei(orderForm.amountSell), orderForm.nonce);
    console.log("new Raw: " + newRaw)
    const salted = this.keccak256("\x19Ethereum Signed Message:\n32", raw)
    console.log("salted: " + salted);
    const signature = web3.eth.sign(web3.eth.coinbase, salted, (error, result) => {
      if (!error) {
        /*var r = result.slice(2, 66); 
        var s = result.slice(66, 130);
        var v = result.slice(130);*/
        var r = result.slice(0, 66)
        var s = '0x' + result.slice(66, 130)
        var v = '0x' + result.slice(130, 132)
        v = web3.toDecimal(v)
        console.log("r: " + r)
        console.log("s: " + s)
        console.log("v: " + v)
        const amountDeposited = web3.toWei(orderForm.amountSell);
        if (orderForm.tokenSell != "0x0000000000000000000000000000000000000000") {
          var erc20Contract = ercTokenABI.at(orderForm.tokenSell)
          erc20Contract.approve(exchangeAddress, amountDeposited,
            function(error, result) {
              exchange.createOrder(orderForm.tokenBuy, web3.toWei(orderForm.amountBuy), orderForm.tokenSell, web3.toWei(orderForm.amountSell), orderForm.nonce, (error, result) => {
                if (!error)
                  console.log(result)
                else
                  console.log(error)
              });
          })
        } else {
          exchange.createOrder(orderForm.tokenBuy, web3.toWei(orderForm.amountBuy), orderForm.tokenSell, web3.toWei(orderForm.amountSell), orderForm.nonce,
          {
            from: web3.eth.coinbase,
            value: web3.toWei(orderForm.amountSell)
          }, (error, result) => {
                if (!error)
                  console.log(result)
                else
                  console.log(error)
          });
        }
      }
      else
        console.log(error)
    });
  }

  cancelOrder(e) {
    e.preventDefault()

    const { cancelForm } = this.state

    console.log("\"" + cancelForm.tokenBuy + "\",\"" + cancelForm.amountBuy + "\",\"" + cancelForm.tokenSell + "\",\"" + cancelForm.amountSell + "\",\"" + cancelForm.nonce + "\",\"" + cancelForm.v + "\",\"" + cancelForm.r + "\",\"" + cancelForm.s + "\"")

    exchange.cancelOrder(cancelForm.tokenBuy, web3.toWei(cancelForm.amountBuy), cancelForm.tokenSell, web3.toWei(cancelForm.amountSell), cancelForm.nonce, cancelForm.v, cancelForm.r, cancelForm.s, (error, result) => {
      if (!error)
        console.log(result)
      else
        console.log(error)
    })

  }

  sendTradeOrder(e) {
    e.preventDefault()

    const { newTradeForm } = this.state

    console.log(newTradeForm.tokenBuyAddress + " " + web3.toWei(newTradeForm.tokenBuyAmount) + " " + newTradeForm.tokenSellAddress + " " + web3.toWei(newTradeForm.tokenSellAmount) + " " + 
      newTradeForm.nonce + " " + newTradeForm.user + " " + newTradeForm.v + " " + newTradeForm.r + " " + newTradeForm.s + " " + web3.toWei(newTradeForm.amount));

    var feeAmount = newTradeForm.amount * .002

    var amountDeposited = web3.toWei(((newTradeForm.tokenBuyAmount * newTradeForm.amount) / newTradeForm.tokenSellAmount) + feeAmount);

    if (newTradeForm.tokenBuyAddress != "0x0000000000000000000000000000000000000000") {
      var erc20Contract = ercTokenABI.at(newTradeForm.tokenBuyAddress)
      erc20Contract.approve(exchangeAddress, amountDeposited,
            function(error, result) {
              exchange.trade(newTradeForm.tokenBuyAddress, web3.toWei(newTradeForm.tokenBuyAmount), newTradeForm.tokenSellAddress, web3.toWei(newTradeForm.tokenSellAmount), 
                newTradeForm.nonce, newTradeForm.user, newTradeForm.v, newTradeForm.r, newTradeForm.s, web3.toWei(newTradeForm.amount / 10), (error, result) => {
                  if (!error)
                    console.log(result)
                  else
                    console.log(error)
              });
          });
    } else {
      exchange.trade(newTradeForm.tokenBuyAddress, web3.toWei(newTradeForm.tokenBuyAmount), newTradeForm.tokenSellAddress, web3.toWei(newTradeForm.tokenSellAmount), 
        newTradeForm.nonce, newTradeForm.user, newTradeForm.v, newTradeForm.r, newTradeForm.s, web3.toWei(newTradeForm.amount / 10),
        {
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

  sendTrade(e) {
    e.preventDefault()

    const { tradeForm, orders, token2Buy, token2Sell, amount2Buy, amount2Sell, orderNonce, vSign, rSign, sSign, tradeAmount } = this.state

    //var tradeHash = this.keccak256(tradeForm.orderHash, web3.eth.coinbase, tradeForm.amount, 1);
    var tradeHash = soliditySha3( 
      {t: 'bytes32', v: tradeForm.orderHash},
      {t: 'uint256', v: tradeForm.amount},
      {t: 'address', v: web3.eth.coinbase},
      {t: 'uint256', v: 1})
    console.log("tradeHash: " + tradeHash)
    var saltedTradeHash = this.keccak256("\x19Ethereum Signed Message:\n32", tradeHash);
    /*soliditySha3(
      {t: 'bytes32', v: "\x19Ethereum Signed Message:\n32"},
      {t: 'bytes32', v: tradeHash})*/
    //this.keccak256("\x19Ethereum Signed Message:\n32", tradeHash);
    console.log("tradeHash salted: " + saltedTradeHash)
    console.log("coinbase: " + web3.eth.coinbase)
    const signature = web3.eth.sign(web3.eth.coinbase, saltedTradeHash, (error, result) => {
      if (!error) {
        var r = result.slice(0, 66)
        var s = '0x' + result.slice(66, 130)
        var v = '0x' + result.slice(130, 132)
        v = web3.toDecimal(v)
        console.log("r: " + r)
        console.log("s: " + s)
        console.log("v: " + v)

        var tradeAddresses = [token2Buy[tradeForm.orderHash], token2Sell[tradeForm.orderHash], web3.eth.coinbase, web3.eth.coinbase];
        var tradeValues = [amount2Buy[tradeForm.orderHash], amount2Sell[tradeForm.orderHash], parseInt(tradeForm.amount), 1, 1, 0, 0, 0];
        var vArray = [vSign[tradeForm.orderHash], v]
        var rArray = [rSign[tradeForm.orderHash], r]
        var sArray = [sSign[tradeForm.orderHash], s]

        exchange.trade(tradeValues, tradeAddresses, vArray, rArray, sArray, (error, result) => {
          if (!error)
            console.log(result)
          else
            console.log(error)
        });
      }
    });

  }

  keccak256(...args) {
    args = args.map(arg => {
      if (typeof arg === 'string') {
        if (arg.substring(0, 2) === '0x') {
            return arg.slice(2)
        } else {
            return web3.toHex(arg).slice(2)
        }
      }

      if (typeof arg === 'number') {
        return leftPad((arg).toString(16), 64, 0)
      } else {
        return ''
      }
    })

    args = args.join('')

    return web3.sha3(args, { encoding: 'hex' })
  }

  deposit(e) {
    e.preventDefault()

    const { depositForm } = this.state

    /*exchange.balanceOf(depositForm.tokenAddress, web3.eth.coinbase,
      function (error, result) {
        if (!error) 
          console.log(result);
      })*/

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
