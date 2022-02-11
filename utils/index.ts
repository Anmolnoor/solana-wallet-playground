// Import any additional classes and/or functions needed from Solana's web3.js library as you go along:
import {
	Cluster,
	clusterApiUrl,
	Connection,
	Keypair,
	LAMPORTS_PER_SOL
} from "@solana/web3.js";
import { message } from "antd";

// *Step 3*: implement a function that gets an account's balance
const refreshBalance = async (
	network: Cluster | undefined,
	account: Keypair | null
) => {
	// This line ensures the function returns before running if no account has been set
	if (!account) return 0;

	try {
		// (a) review the import guidance on line 1
		// (b) instantiate a connection using clusterApiUrl with the active network passed in as an argument
		// Documentation References:
		//   https://solana-labs.github.io/solana-web3.js/classes/Connection.html
		//   https://solana-labs.github.io/solana-web3.js/modules.html#clusterApiUrl
		// console.log("Balance functionality not implemented yet!");
		const connection = new Connection(clusterApiUrl(network), "confirmed");

		// in this connection there is a _RPCapi = which include the network endpoint api from where we can figureout if
		// we want to change it
		console.log(connection);

		// (c) get the key using one of the accessors on the account passed in as an argument
		// Documentation Reference: https://solana-labs.github.io/solana-web3.js/classes/Keypair.html
		const publicKey = account.publicKey;

		// (d) get the account's balance using the connection instance
		// Documentation Reference: https://solana-labs.github.io/solana-web3.js/classes/Connection.html
		const balance = await connection.getBalance(publicKey);
		console.log(balance / LAMPORTS_PER_SOL);

		// console.log(account.secretKey.slice(0, 32));
		message.info(`Current balance :: ${balance / LAMPORTS_PER_SOL}`);
		return balance / LAMPORTS_PER_SOL;
		// (e) You can now delete the console.log statement since the function is implemented!
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "Unknown Error";
		message.error(`Balance refresh failed: ${errorMessage}`);
		return 0;
	}
};

// *Step 4*: implement a function that airdrops SOL into devnet account
const handleAirdrop = async (network: Cluster, account: Keypair | null) => {
	// This line ensures the function returns before running if no account has been set
	if (!account) return;

	try {
		// (a) review the import guidance on line 1
		// (b) instantiate a connection using clusterApiUrl with the active network passed in as an argument
		// Documentation References:
		//   https://solana-labs.github.io/solana-web3.js/classes/Connection.html
		//   https://solana-labs.github.io/solana-web3.js/modules.html#clusterApiUrl
		// console.log("Airdrop functionality not implemented yet!");
		const connection = new Connection(clusterApiUrl(network), "confirmed");

		// (c) get the key using one of the accessors on the account passed in as an argument
		// Documentation Reference: https://solana-labs.github.io/solana-web3.js/classes/Keypair.html
		const publicKey = account.publicKey;

		// (d) request the airdrop using the connection instance
		// Note that you should include the amount to airdrop (consider using the LAMPORTS_PER_SOL constant from the web3.js library)
		// Documentation Reference: https://solana-labs.github.io/solana-web3.js/classes/Connection.html
		const confirmation = await connection.requestAirdrop(
			publicKey,
			LAMPORTS_PER_SOL
		);

		// (d) confirm the transaction using the connection instance and the confirmation string returned from the airdrop
		// Documentation Reference: https://solana-labs.github.io/solana-web3.js/classes/Connection.html
		const result = await connection.confirmTransaction(
			confirmation,
			"confirmed"
		);

		// (e) Refactor the refreshBalance function to return balances in SOL instead of Lamports (Hint: LAMPORTS_PER_SOL)
		message.success(`Transaction confirmed`);
		// This line returns the balance after the airdrop so the UI can be refreshed
		return await refreshBalance(network, account);
		// (f) You can now delete the console.log statement since the function is implemented!
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "Unknown Error";
		message.error(`Airdrop failed: ${errorMessage}`);
	}
};

export { refreshBalance, handleAirdrop };
