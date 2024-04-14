// const { loadFixture}= require("@nomicfoundation/hardhat-toolbox/network-helpers") ;
const {expect,assert}= require("chai");
const {ethers} = require("hardhat");

const {fundContract}= require("../utils/utilities.js");

// const apiKey = "62EZWS2DGUPW3QARRMFDGQGN14DIDHZTSQ"

const {abi,} =require("../artifacts/contracts/interfaces/IERC20.sol/IERC20.json")
// The assert() method tests if a given expression is true or not. 
// a feature (hook) in test libraries that you can use to set preconditions for each test

describe("FlashLoan", function(){
    
        let FLASHLOAN,
        BORROW_AMOUNT,
        FUND_AMOUNT,
        initialFundingHuman,
        txArbitrage;

        const DECIMALS =18;
        // const BUSD_WHALE= "0xf977814e90da44bfa03b6295a0616a897441acec";
        const FDUSD_WHALE="0xf977814e90da44bfa03b6295a0616a897441acec";
        const FDUSD ="0xc5f0f7b66764F6ec8C8Dff7BA683102295E16409";
        // const BUSD ="0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
        const CROX = "0x2c094F5A7D1146BB93850f629501eB749f6Ed491";
        const CAKE = "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82";
        // const [Signer] = await ethers.getSigners()
        const mainnetForkProvider = network.provider;
        const fdusdInstance = new ethers.Contract(FDUSD,abi,mainnetForkProvider);
       
        // console.log(toNumber(whale_balance));
        
        beforeEach(async ()=>{
          //ensure whake has the balance
         const whale_balance = await ethers.provider.getBalance(FDUSD_WHALE);
        //  console.log(whale_balance)
           expect(whale_balance).not.equal("0");

           //Deploy smart contract
            FLASHLOAN = await ethers.deployContract("FlashLoan");
         //   console.log(FLASHLOAN)

           const borrowAmountHuman ="1";
           BORROW_AMOUNT =  ethers.parseUnits(borrowAmountHuman,DECIMALS);
         //   console.log(BORROW_AMOUNT)

            initialFundingHuman ="100";
           FUND_AMOUNT= ethers.parseUnits(borrowAmountHuman,DECIMALS)
         //   console.log(FUND_AMOUNT)

        //    Fund our Contract- for testing
            await fundContract(fdusdInstance,FDUSD_WHALE,FLASHLOAN.target,initialFundingHuman)
          
        },
        );
         describe("Arbitrage ", ()=>{
        it(" ensure the contract is funded",async()=>{
             const FlashLoanBalance =await FLASHLOAN.getBalanceOfToken(FDUSD);
            //  console.log(FlashLoanBalance)
           
            const flashSwapBalanceHuman = ethers.formatUnits(FlashLoanBalance,DECIMALS);//formatUnits to convert in string format
            // console.log(flashSwapBalanceHuman)
             expect(Number(flashSwapBalanceHuman)).equal(Number(initialFundingHuman))
     }) 
       it("execute the Arbitrage",async()=>{
         txArbitrage = await FLASHLOAN.initateArbitrage(FDUSD,BORROW_AMOUNT);
         assert(txArbitrage)

         // Print balances
      // const contractBalanceBUSD = await FLASHLOAN.getBalanceOfToken(BUSD);
      // const formattedBalBUSD = Number(
      //   ethers.utils.formatUnits(contractBalanceBUSD, DECIMALS)
      // );
      // console.log("Balance of BUSD: " + formattedBalBUSD);

      // const contractBalanceCROX = await FLASHLOAN.getBalanceOfToken(CROX);
      // const formattedBalCROX = Number(
      //   ethers.utils.formatUnits(contractBalanceCROX, DECIMALS)
      // );
      // console.log("Balance of CROX: " + formattedBalCROX);

      // const contractBalanceCAKE = await FLASHLOAN.getBalanceOfToken(CAKE);
      // const formattedBalCAKE = Number(
      //   ethers.utils.formatUnits(contractBalanceCAKE, DECIMALS)
      // );
      // console.log("Balance of CAKE: " + formattedBalCAKE);
       })
     })
        
     })