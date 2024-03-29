import Web3 from 'web3'

let develop = false

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if (develop) {
        console.log('...dev')
        const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545')
        const web3 = new Web3(provider)
        resolve(web3)
      } else if (window.ethereum) {
        console.log(window.ethereum, 'eth...')
        const web3 = new Web3(window.ethereum)
        try {
          await window.ethereum.enable()
          resolve(web3)
        } catch (error) {
          reject(error)
        }
      } else if (window.web3) {
        const web3 = window.web3
        resolve(web3)
      }
    })
  })

export default getWeb3
