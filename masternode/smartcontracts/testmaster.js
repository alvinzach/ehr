const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.personal.unlockAccount(web3.eth.accounts[0],"kattanam",100000)
const input = fs.readFileSync(__dirname+'/master.sol');
var output=solc.compile(input.toString(),1)
console.log(output)


/*var masterContract=web3.eth.contract(JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"patients","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_patient","type":"address"}],"name":"returnRecord","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_patient","type":"address"},{"name":"_contract","type":"address"}],"name":"addRecord","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]'))
                masterContractInstance=masterContract.at('0x69b825268941f4916f8cbe438a2a5666f5d7dfaf')
                console.log(masterContractInstance)
                masterContractInstance.returnRecord("0x0435b17025f89e85d595a662ecf4d259616f205f",(err,response)=>{
                    console.log(err,'+',response)
                })*/