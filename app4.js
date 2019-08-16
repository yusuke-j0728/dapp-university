var Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/60a9a9cc3e2b4b3ea2eaacc80a10e6c8')

const account1 = '0x5aB522DBE9A3b1F2c408F9Ecd7c8d5FAA76d86ef'
const account2 = '0x1bddC7B683b8Ccf0dC506641700d60135B189DF3'
const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')
const privateKey2 = Buffer.from(process.env.PRIVATE_KEY_2, 'hex')


const contractAddress = '0xA5019Ede22D11D356BE261D4A4e3F3c26004B23A'
const contractABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];

const dapptokenContract = new web3.eth.Contract(contractABI, contractAddress)
const data = dapptokenContract.methods.transfer(account2, 1000).encodeABI()

// console.log(data)

web3.eth.getTransactionCount(account1, (err, txCount) => {
    //create transaction object
   
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(800000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')),
        to: contractAddress,
        data: data
    }

    //sign the transaction
    const tx = new Tx(txObject, {'chain':'ropsten'})
    tx.sign(privateKey1)
    
    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')

    //broadcast the transaction
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log( 'txHash:', txHash)
    })
})
    
dapptokenContract.methods.balanceOf(account1).call((err, balance) => {
    console.log({err, balance})
})

dapptokenContract.methods.balanceOf(account2).call((err, balance) => {
    console.log({err, balance})
})
