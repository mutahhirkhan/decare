export const getNetworkNameByID = (id = 5) => {
	let chainId = {
		1: "mainnet",
		3: "ropsten",
		4: "rinkeby",
		5: "goerli",
		42: "kovan",
		56: "bscmainnet",
		97: "bsctestnet",
		137: "matic",
		80001: "mumbai",
	};
	return chainId[id];
};