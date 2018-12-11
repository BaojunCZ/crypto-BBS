const { default: AppChain } = require('@appchain/base');

var appchain;

if (typeof window.appchain !== 'undefined') {
  appchain = AppChain(window.appchain.currentProvider);
  appchain.currentProvider.setHost('http://121.196.200.225:1337');
} else {
  console.log('No appchain ? You should consider trying Neuron!');
  appchain = AppChain('http://121.196.200.225:1337');
}

window.appchain = appchain;

module.exports = appchain;
