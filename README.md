# Coin Flip Contract

The CoinFlip smart contract on the NEAR Protocol enables users to participate in a straightforward coin flipping game. Players can call the flip_coin function to make their guess on whether the outcome of a coin flip will be "heads" or "tails". The contract then simulates the coin flip and compares the player's guess with the actual outcome. If the guess is correct, the player earns a point; otherwise, they lose a point. Each player's points are tracked using an UnorderedMap, allowing them to accumulate points over multiple rounds. Additionally, the contract provides a points_of function, allowing anyone to view the total points of a specific player by providing their account ID. This simple yet interactive contract showcases the fundamental features of NEAR smart contracts, including state management and interaction with user accounts.

<br />

# Quickstart

1. Make sure you have installed [node.js](https://nodejs.org/en/download/package-manager/) >= 16.
2. Install the [`NEAR CLI`](https://github.com/near/near-cli#setup)

<br />

## 1. Build and Test the Contract
You can automatically compile and test the contract in the NEAR testnet by running:

```bash
npm run test
```

<br />

## 2. Create Account and Deploy the Contract
You can create a new account and deploy the contract on it by running:

```bash
near create-account <your-account>.testnet --useFaucet
near deploy <your-account>.testnet build/contract.wasm
```

<br />

## 3. Get the Score
`points_of` performs read-only operations, therefore it is a `view` method.

`View` methods can be called for **free** by anyone, even people **without a NEAR account**!

```bash
# Use near-cli to get the points
near view <your-account> points_of '{"player": "<dev-account>"}'
```

<br />

## 4. Flip a Coin and Try to Guess the Outcome
`flip_coin` takes a guess ("heads" or "tails"), simulates a coin flip and gives/removes points to the player.

It changes the contract's state, for which it is a `call` method.

`Call` methods can only be invoked using a NEAR account, since the account needs to pay GAS for the transaction.

```bash
# Use near-cli to play
near call <your-account> flip_coin '{"player_guess":"tails"}' --accountId <your-account>
```

**Tip:** If you would like to call `flip_coin` using another account, first login into NEAR using:

```bash
# Use near-cli to login your NEAR account
near login
```

and then use the logged account to sign the transaction: `--accountId <another-account>`.


