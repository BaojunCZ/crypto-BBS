const { default: Nervos } = require("@nervos/chain");

// const nervos = Nervos(config.chain) // config.chain indicates that the address of Appchain to interact
if (typeof window.appchain !== "undefined") {
  window.appchain = Nervos(window.appchain.currentProvider);
  window.appchain.currentProvider.setHost("http://121.196.200.225:1337");
} else {
  console.log("No Nervos web3? You should consider trying Neuron!");
  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  window.appchain = Nervos("http://121.196.200.225:1337");
}
var appchain = window.appchain;

module.exports = appchain;
