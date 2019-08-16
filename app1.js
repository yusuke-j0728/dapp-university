var Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/60a9a9cc3e2b4b3ea2eaacc80a10e6c8')

const account1 = '0x5aB522DBE9A3b1F2c408F9Ecd7c8d5FAA76d86ef'
const account2 = '0x1bddC7B683b8Ccf0dC506641700d60135B189DF3'

const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')
const privateKey2 = Buffer.from(process.env.PRIVATE_KEY_2, 'hex')


web3.eth.getTransactionCount(account1, (err, txCount) => {
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        to: account2,
        value: web3.utils.toHex(web3.utils.toWei('0.1','ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei'))
    }
    const tx = new Tx(txObject, {'chain':'ropsten'})
    // console.log(tx)
    tx.sign(privateKey1)
    // console.log(privateKey1)
    
    const serializedTx = tx.serialize()
    // console.log(serializedTx)
    const raw = '0x' + serializedTx.toString('hex')

    // console.log(raw)
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('txHash:', txHash)
    })
})
    

