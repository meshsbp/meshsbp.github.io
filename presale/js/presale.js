const Buffer = buffer.Buffer

const abi = [{"constant":false,"inputs":[],"name":"withdrawVite","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unstakeMesh","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getLatestReward","outputs":[{"name":"index","type":"uint256"},{"name":"totalVite","type":"uint256"},{"name":"totalstaked","type":"uint256"}],"payable":false,"stateMutability":"view","type":"offchain"},{"constant":true,"inputs":[],"name":"getTotalStaked","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"offchain"},{"constant":false,"inputs":[{"name":"sbpName","type":"string"}],"name":"voteSBP","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getRewardByIndex","outputs":[{"name":"totalVite","type":"uint256"},{"name":"totalstaked","type":"uint256"}],"payable":false,"stateMutability":"view","type":"offchain"},{"constant":false,"inputs":[],"name":"stakeMesh","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getSoldPresale","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"offchain"},{"constant":false,"inputs":[],"name":"withdrawSBPRewards","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"getWithdrawableRewards","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"offchain"},{"constant":true,"inputs":[],"name":"getLatestRewardIndex","outputs":[{"name":"index","type":"uint256"}],"payable":false,"stateMutability":"view","type":"offchain"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"getNextReward","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"offchain"},{"constant":true,"inputs":[],"name":"getLockPeriod","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"offchain"},{"constant":true,"inputs":[],"name":"getPresaleState","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"offchain"},{"constant":true,"inputs":[],"name":"getLastBlockClaimed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"offchain"},{"constant":true,"inputs":[],"name":"getMeshToken","outputs":[{"name":"","type":"tokenId"}],"payable":false,"stateMutability":"view","type":"offchain"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"getLockedUntil","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"offchain"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"getStakedAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"offchain"},{"constant":false,"inputs":[],"name":"fund","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"inputs":[{"indexed":false,"name":"sbpName","type":"string"}],"name":"VoteForSBP","type":"message"},{"inputs":[{"indexed":false,"name":"sbpName","type":"string"},{"indexed":false,"name":"receiveAddress","type":"address"}],"name":"WithdrawSBPReward","type":"message"},{"anonymous":false,"inputs":[{"indexed":true,"name":"addr","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"presaleSold","type":"uint256"}],"name":"PresaleBuy","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"addr","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"presaleSold","type":"uint256"}],"name":"PresaleRefund","type":"event"},{"anonymous":false,"inputs":[],"name":"PresaleEnd","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"totalVite","type":"uint256"},{"indexed":false,"name":"totalMesh","type":"uint256"}],"name":"RewardsReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"addr","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"staked","type":"uint256"},{"indexed":false,"name":"lock","type":"uint256"},{"indexed":false,"name":"totalStaked","type":"uint256"}],"name":"MeshStaking","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"addr","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"totalStaked","type":"uint256"}],"name":"MeshUnstaking","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"addr","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"index","type":"uint256"}],"name":"RewardsWithdraw","type":"event"}]
const offchaincode = "YIBgQFJgBDYQYQDJV2AANXwBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJAEY/////8WgGM8JhMiFGEAy1eAYz5djvAUYQD3V4BjWIAAARRhARVXgGNptfH9FGEBX1eAY3+6Z3EUYQF9V4BjjihVVRRhAddXgGOR5neyFGEB9VeAY5Mv7bEUYQJPV4Bjou0fUxRhAm1XgGO1aczQFGECi1eAY8cSBlcUYQKpV4BjyeznIxRhAt9XgGPv3LyeFGEDOVdhAMlWWwBbYQDTYQOTVltgQFGAhIFSYCABg4FSYCABgoFSYCABk1BQUFBgQFGAkQOQ81thAP9hA+lWW2BAUYCCgVJgIAGRUFBgQFGAkQOQ81thAUJgBIA2A2AggRAVYQEsV2AAYAD9W4EBkICANZBgIAGQkpGQUFBQYQP7VltgQFGAg4FSYCABgoFSYCABklBQUGBAUYCRA5DzW2EBZ2EEPFZbYEBRgIKBUmAgAZFQUGBAUYCRA5DzW2EBwWAEgDYDYCCBEBVhAZRXYABgAP1bgQGQgIA1dP///////////////////////////xaQYCABkJKRkFBQUGEETlZbYEBRgIKBUmAgAZFQUGBAUYCRA5DzW2EB32EGJVZbYEBRgIKBUmAgAZFQUGBAUYCRA5DzW2ECOWAEgDYDYCCBEBVhAgxXYABgAP1bgQGQgIA1dP///////////////////////////xaQYCABkJKRkFBQUGEGOlZbYEBRgIKBUmAgAZFQUGBAUYCRA5DzW2ECV2EGkFZbYEBRgIKBUmAgAZFQUGBAUYCRA5DzW2ECdWEGo1ZbYEBRgIKBUmAgAZFQUGBAUYCRA5DzW2ECk2EGtVZbYEBRgIKBUmAgAZFQUGBAUYCRA5DzW2ECsWEGx1ZbYEBRgIJp/////////////xZp/////////////xaBUmAgAZFQUGBAUYCRA5DzW2EDI2AEgDYDYCCBEBVhAvZXYABgAP1bgQGQgIA1dP///////////////////////////xaQYCABkJKRkFBQUGEG3lZbYEBRgIKBUmAgAZFQUGBAUYCRA5DzW2EDfWAEgDYDYCCBEBVhA1BXYABgAP1bgQGQgIA1dP///////////////////////////xaQYCABkJKRkFBQUGEHNFZbYEBRgIKBUmAgAZFQUGBAUYCRA5DzW2AAYABgAGAAYARgAFBgAGABYANgAFBUA4FSYCABkIFSYCABYAAhYABQkFBgAWADYABQVAOBYAABYABQVIJgAQFgAFBUk1CTUJNQUGED5FZQW5CRklZbYABgCGAAUFSQUGED+FZbkFZbYABgAGAAYARgAFBgAIWBUmAgAZCBUmAgAWAAIWAAUJBQgGAAAWAAUFSBYAEBYABQVJJQklBQYQQ3VlBbkVCRVltgAGACYABQVJBQYQRLVluQVltgAGAAYAZgAFBgAIR0////////////////////////////FnT///////////////////////////8WgVJgIAGQgVJgIAFgACFgAFBUFBVhBKlXYACQUGEGIFZbYANgAFBUYAVgAFBgAIR0////////////////////////////FnT///////////////////////////8WgVJgIAGQgVJgIAFgACFgAFBUFBVhBQZXYACQUGEGIFZbYABgAJBQYABgA2AAUFSQUGAAYAVgAFBgAIZ0////////////////////////////FnT///////////////////////////8WgVJgIAGQgVJgIAFgACFgAFBUkFBbgYEQFWEGEldgBGAAUGAAgoFSYCABkIFSYCABYAAhYABQYAEBYABQVGAEYABQYACDgVJgIAGQgVJgIAFgACFgAFBgAAFgAFBUYAZgAFBgAIh0////////////////////////////FnT///////////////////////////8WgVJgIAGQgVJgIAFgACFgAFBUAoEVFWEF/Vf+WwSDAZJQglBbgIBgAQGRUFBhBWNWW1BgAJJQUFBhBiBWUFBbkZBQVltgAGABYANgAFBUA5BQYQY3VluQVltgAGAFYABQYACDdP///////////////////////////xZ0////////////////////////////FoFSYCABkIFSYCABYAAhYABQVJBQYQaLVluRkFBWW2AAYgFRgGADApBQYQagVluQVltgAGABYABQVJBQYQayVluQVltgAGAJYABQVJBQYQbEVluQVltgAGk9SCqs6wdqcpyzkFBhBttWW5BWW2AAYAdgAFBgAIN0////////////////////////////FnT///////////////////////////8WgVJgIAGQgVJgIAFgACFgAFBUkFBhBy9WW5GQUFZbYABgBmAAUGAAg3T///////////////////////////8WdP///////////////////////////xaBUmAgAZCBUmAgAWAAIWAAUFSQUGEHhVZbkZBQVv6hZWJ6enIwWCAwIWCmpE0ZQMQAUGHR0i7H3XaQ4a0wp+oJp07aEQRC/gAp"
const tokens = {
    VITE: "tti_5649544520544f4b454e6e40",
    MESH: "tti_8b971a1b4735fcd83c999272"
}
const smartContractAddress = "vite_5bdab23b0e94a0500decd027cc9a2be47038ce6d0c4b3b728a"

const httpProvider = new $vite_HTTP.HTTP_RPC("https://node-vite.thomiz.dev/http")

const onConnect = async () => {
    await new Promise((res) => setTimeout(res, 0))

    const fetch = async function(){
        return await Promise.all([
            (async () => {
                const call = $vite_vitejs.abi.encodeFunctionCall(abi, [], "getSoldPresale")
                
                const result = await api.request("contract_callOffChainMethod", {
                    address: smartContractAddress,
                    data: Buffer.from(call, "hex").toString("base64"),
                    code: offchaincode
                })
                const decoded = $vite_vitejs.abi.decodeParameters(
                    abi.find(e => e.name === "getSoldPresale").outputs.map(e => e.type),
                    Buffer.from(result, "base64").toString("hex")
                )
                return decoded[0]
            })(),
            (async () => {
                return "800000000000000000000000000000000"
            })()
        ])
    }
    while(true){
        try{
            const [sold, max] = await fetch()
            const percent = BigInt(10000000000)*BigInt(sold)/BigInt(1e18)/(BigInt(max)/BigInt(1e18))
            document.querySelector("u#percent").innerHTML = `${Number(percent)/100000000}%`
            document.querySelector("span#amount").innerHTML = `${BigInt(sold)/BigInt(1e18)/BigInt(1e8)}`
        }catch(err){
            console.error(err)
        }
        await new Promise(r=>setTimeout(r,5000))
    }
}

const api = new $vite_vitejs.ViteAPI(httpProvider, onConnect)