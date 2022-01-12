<template>
  <div class="home">
    The value is: {{value}}
  </div>
</template>

<script>
import SimpleStorageContract from '../contracts/SimpleStorage.json'

export default {
  data () {
    return {
      value: 0,
      contract: null
    }
  },
  created () {
    // this.init()
  },
  methods: {
    async init () {
      const networkId = await this.$web3.eth.net.getId()
      const deployedNetwork = SimpleStorageContract.networks[networkId]
      const instance = new this.$web3.eth.Contract(
          SimpleStorageContract.abi,
          deployedNetwork && deployedNetwork.address,
      )
      this.contract = instance
      this.test()
    },
    async test () {
      let receipt = await this.contract.methods.set(6).send({
        from: this.$accounts[0]
      })
      console.log(receipt)
      const response = await this.contract.methods.get().call()
      this.value = response
    }
  }
}
</script>
