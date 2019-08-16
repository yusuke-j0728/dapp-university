const Web3 = require('web3')
const web3 = new Web3('https://mainnet.infura.io/v3/60a9a9cc3e2b4b3ea2eaacc80a10e6c8')

// web3.eth.getBlockNumber().then(console.log)
// web3.eth.getBlockNumber((err, number) => {
//     console.log(number)
// })

// web3.eth.getBlock('latest').then(console.log)

// web3.eth.getBlockNumber().then((latest) => {
//     for(let i = 0; i < 10; i++) {
//         web3.eth.getBlock(latest - i).then(console.log)
//     }
// })

// web3.eth.getBlockNumber().then((latest) => {
//     for(let i = 0; i < 10; i++) {
//         web3.eth.getBlock(latest - i).then((block) => {
//             console.log(block.number)
//         })
//     }
// })

const hash = '0xbb8ebbf716da54ee3a548340e0c5f0479909c7be2ef2b925c72cdf294d84899d'
web3.eth.getTransactionFromBlock(hash, 2).then(console.log)