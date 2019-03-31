const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

const input = fs.readFileSync(__dirname+'/master.sol');
const output = solc.compile(input.toString(), 1);
const bytecode = output.contracts[':Master'].bytecode;
const abi = JSON.parse(output.contracts[':Master'].interface);
console.log(output.contracts[':Master'].interface)
const contract = web3.eth.contract(abi);
web3.personal.unlockAccount(web3.eth.accounts[0],"kattanam",100000)
const contractInstance = contract.new({
    data: '0x' + bytecode,
    from: web3.eth.accounts[0],
    gas: 90000*5
}, (err, res) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("transaction hash : "+res.transactionHash);

    var intId=setInterval(()=>{
        if(contractInstance.address!==undefined){
            console.log(contractInstance.address)
            clearInterval(intId)
            contractInstance.address=undefined
        }
    },3000)
});
