
var solc=require('solc')
var fs=require('fs')
const Web3 = require('web3');
const settings=require('../../settings.json')
const web3 = new Web3(new Web3.providers.HttpProvider(settings.rpc));
module.exports.register=(req,res)=>{
    console.log(req.body.password+'\n\n');
    var userAddress=web3.personal.newAccount(req.body.password)
    const input = fs.readFileSync(__dirname+'/patient.sol');
    var output = solc.compile(input.toString(), 1)
    console.log(output)
    var data=output.contracts[':patient'].bytecode
    var abi=output.contracts[':patient'].interface
    var patientContract=web3.eth.contract(JSON.parse(abi))
    console.log(abi)
    //web3.personal.unlockAccount(web3.eth.accounts[0],password,10000);
    web3.eth.sendTransaction({
        from:web3.eth.accounts[0],
        to:userAddress,
        value:100000000000000000000
    },(err,success)=>{
        console.log('error:'+err)
        console.log('success:'+success)

    })
    var patientInstance=patientContract.new({
        data:'0x'+data,
        from:web3.eth.accounts[0],
        gas: 1000000
    },function(err, myContract){
        var result=JSON.stringify(myContract)
        console.log(err+"\n\n"+myContract.transactionHash)
        var intId=setInterval(()=>{
            if(patientInstance.address!==undefined){
                console.log(patientInstance.address)
                clearInterval(intId)
                var masterContract=web3.eth.contract(JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"patients","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_patient","type":"address"}],"name":"returnRecord","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_patient","type":"address"},{"name":"_contract","type":"address"}],"name":"addRecord","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]'))
                masterContractInstance=masterContract.at('0x69b825268941f4916f8cbe438a2a5666f5d7dfaf')
                masterContractInstance.addRecord(userAddress.toString(),patientInstance.address.toString(),{from:web3.eth.accounts[0]},(err,response)=>{
                    console.log(err,'+',response)
                })
                res.json({status:200,address:userAddress,contract:patientInstance.address}).end()
                patientInstance.address=undefined
            }
        },3000)
    })
}
