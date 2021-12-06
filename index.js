const Buffer = buffer.Buffer

const abi = [{"constant":true,"inputs":[{"name":"token","type":"tokenId"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"offchain"},{"constant":true,"inputs":[],"name":"collectedFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"offchain"},{"constant":true,"inputs":[],"name":"feeInfo","outputs":[{"name":"","type":"uint256"},{"name":"","type":"tokenId"}],"payable":false,"stateMutability":"view","type":"offchain"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"offchain"},{"constant":false,"inputs":[{"name":"token","type":"tokenId"}],"name":"withdrawLiquidity","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"tokenId"}],"name":"withdrawBlockedBalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"Fund","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"supportedTokens","outputs":[{"name":"","type":"tokenId"},{"name":"","type":"tokenId"}],"payable":false,"stateMutability":"view","type":"offchain"},{"constant":false,"inputs":[{"name":"newFees","type":"uint256"}],"name":"changeFees","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawFees","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]
const offchaincode = Buffer.from(
    "608060405260043610610071576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632e87cfe814610073578063376d54bf146100c257806347e5fd0d146100e05780635c6cfcbe1461011d5780639f8fe8561461016957610071565b005b6100ac6004803603602081101561008a5760006000fd5b81019080803569ffffffffffffffffffff1690602001909291905050506101be565b6040518082815260200191505060405180910390f35b6100ca6101fe565b6040518082815260200191505060405180910390f35b6100e8610210565b604051808381526020018269ffffffffffffffffffff1669ffffffffffffffffffff1681526020019250505060405180910390f35b610125610240565b604051808274ffffffffffffffffffffffffffffffffffffffffff1674ffffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610171610270565b604051808369ffffffffffffffffffff1669ffffffffffffffffffff1681526020018269ffffffffffffffffffff1669ffffffffffffffffffff1681526020019250505060405180910390f35b6000600360005060008369ffffffffffffffffffff1669ffffffffffffffffffff1681526020019081526020016000216000505490506101f9565b919050565b6000600260005054905061020d565b90565b60006000600060005054600160009054906101000a900469ffffffffffffffffffff169150915061023c565b9091565b6000600460009054906101000a900474ffffffffffffffffffffffffffffffffffffffffff16905061026d565b90565b600060006950e441ba15d97c17b6a86969efa3308628b0e1a4a891509150610293565b909156fea165627a7a72305820dd9ab6dc21094eccfd14114123b96ed024deefac96c743f956f2ba68df7930430029"
, "hex").toString("base64")
const tokens = {
    VINO: "tti_f9bd6782f966f899d74d7df8",
    VGATE: "tti_61f59e574f9f7babfe8908e5"
}
const smartContractAddress = "vite_afa7def1946264f71165669c72d1e570aff2eb70e14524fa8d"

const httpProvider = new $vite_HTTP.HTTP_RPC("https://node-vite.thomiz.dev/http")

const onConnect = async () => {
    await new Promise((res) => setTimeout(res, 0))

    const fee = await (async () => {
        const call = $vite_vitejs.abi.encodeFunctionCall(abi, [], "feeInfo")
        
        const result = await api.request("contract_callOffChainMethod", {
            address: smartContractAddress,
            data: Buffer.from(call, "hex").toString("base64"),
            code: offchaincode
        })
        const decoded = $vite_vitejs.abi.decodeParameters(
            abi.find(e => e.name === "feeInfo").outputs.map(e => e.type),
            Buffer.from(result, "base64").toString("hex")
        )
        document.getElementById("fee-info").textContent = `${decoded[0]}%`
        return parseInt(decoded[0])
    })()
    await Promise.all([
        (async () => {
            const call = $vite_vitejs.abi.encodeFunctionCall(abi, [
                tokens.VINO
            ], "getBalance")
            
            const result = await api.request("contract_callOffChainMethod", {
                address: smartContractAddress,
                data: Buffer.from(call, "hex").toString("base64"),
                code: offchaincode
            })
            const decoded = $vite_vitejs.abi.decodeParameters(
                abi.find(e => e.name === "getBalance").outputs.map(e => e.type),
                Buffer.from(result, "base64").toString("hex")
            )
            const banoshis = BigInt(decoded[0])/BigInt("1"+"0".repeat(27))
            const bananos = Number(banoshis)/100
            document.getElementById("vgatetovino-max").textContent = `${bananos} BANs`
        })(),
        (async () => {
            const call = $vite_vitejs.abi.encodeFunctionCall(abi, [
                tokens.VGATE
            ], "getBalance")
            
            const result = await api.request("contract_callOffChainMethod", {
                address: smartContractAddress,
                data: Buffer.from(call, "hex").toString("base64"),
                code: offchaincode
            })
            const decoded = $vite_vitejs.abi.decodeParameters(
                abi.find(e => e.name === "getBalance").outputs.map(e => e.type),
                Buffer.from(result, "base64").toString("hex")
            )
            const banoshis = BigInt(decoded[0])/BigInt("1"+"0".repeat(27))*BigInt(100)/BigInt(100-fee)
            const bananos = Number(banoshis)/100
            document.getElementById("vinotovgate-max").textContent = `${bananos} BANs`
        })()
    ])
    document.getElementById("address").textContent = smartContractAddress
}

const api = new $vite_vitejs.ViteAPI(httpProvider, onConnect)