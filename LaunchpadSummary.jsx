import React, { useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from '@mui/material/Button'
import Web3 from 'web3'
import Presale from './Presale.json'
import { ArrowForwardIosTwoTone } from '@mui/icons-material'
import { tokenAbi } from "../../tokenAbi";
const LaunchpadSummary = ({ prevStep, launchpadValue }) => {

  const datetotimestamp = (date) => {
    let d = Date.parse(date)
    return Math.round(d / 1000)
  }
  const checkburn = () => {
    return launchpadValue.refundType.length > 0 ? true : false
  }

  const connectsmartcontract = async () => {
    if (typeof Web3.givenProvider !== 'undefined') {
      const web3 = new Web3(Web3.givenProvider)
      const accounts = await web3.eth.getAccounts()
      const Token=await new web3.eth.Contract(tokenAbi, launchpadValue.tokenAddress);
      await Token.methods.approve("0x54B19a3c738Cd7F83a90c6fA4fC92756Ed998026",1000).send({from: accounts[0]});
      const presale = new web3.eth.Contract(
        Presale,
        '0x54B19a3c738Cd7F83a90c6fA4fC92756Ed998026'
      )
      console.log(presale)
      const penality = await presale.methods.penalty().call()
      console.log(launchpadValue)
      let starttime =  datetotimestamp(
        launchpadValue.presaleStartTime.toString()
        
      )
      let endtime =  datetotimestamp(
        launchpadValue.presaleEndTime.toString()
        
      )
      let isburn = checkburn()
      console.log(isburn)
      console.log(starttime)
      console.log(endtime)
      const presaledetail = [
        launchpadValue.presaleRates,
        launchpadValue.softCap,
        launchpadValue.hardCap,
        launchpadValue.tokenAddress,
        launchpadValue.minCont,
        launchpadValue.maxCont,
        isburn,
        '0xD99D1c33F9fC3444f8101754aBC46c52416550D1',
        launchpadValue.pancakeLiquidity,
        launchpadValue.pancakeListingRate,
        starttime,
        endtime,
        accounts[0],
      ]
      console.log(presaledetail,"hi")
      const duration = endtime - starttime
      let presaleid = await presale.methods
        .addPreSale(presaledetail, duration)
        .send({ from: accounts[0] })
      console.log(presaleid)
      
    } else {
      alert('please install metamask')
    }
  }
  return (
    <div className='prelimDetails formBox'>
      <h3>Summary</h3>
      <p>Review all token details</p>

      <div className='summary-line'>
        <h5>Token Logo</h5>
        <img
          className='summary-image'
          src={
            launchpadValue.tokenImage
              ? URL.createObjectURL(launchpadValue.tokenImage)
              : 'No Image!'
          }
        ></img>
      </div>
      <div className='summary-line'>
        <h5>Token Name</h5>
        <p>Hypersonic.finance</p>
      </div>
      <div className='summary-line'>
        <h5>Token Symbol</h5>
        <p>Mint Token With Fees</p>
      </div>
      <div className='summary-line'>
        <h5>
          Token Decimal <span className='light-text'>(1-18)</span>
        </h5>
        <p>Ethereum</p>
      </div>
      <div className='summary-line'>
        <h5>Presale Rates</h5>
        <p>{launchpadValue.presaleRates}</p>
      </div>
      <div className='summary-line'>
        <h5>Softcap</h5>
        <p>{launchpadValue.softCap}</p>
      </div>
      <div className='summary-line'>
        <h5>Hardcap</h5>
        <p>{launchpadValue.hardCap}</p>
      </div>
      <div className='summary-line'>
        <h5>Sale Method</h5>
        <p>{launchpadValue.saleType}</p>
      </div>
      <div className='summary-line'>
        <h5>Min. Contribuation</h5>
        <p>{launchpadValue.minCont}</p>
      </div>
      <div className='summary-line'>
        <h5>Max. Contribution</h5>
        <p>{launchpadValue.maxCont}</p>
      </div>
      <div className='summary-line'>
        <h5>Refund Type</h5>
        <p>{launchpadValue.refundType}</p>
      </div>
      <div className='summary-line'>
        <h5>Exchange</h5>
        <p>{launchpadValue.selectExchange}</p>
      </div>
      <div className='summary-line'>
        <h5>Liquidity</h5>
        <p>{launchpadValue.pancakeLiquidity}</p>
      </div>
      <div className='summary-line'>
        <h5>Listing Rate</h5>
        <p>{launchpadValue.pancakeListingRate}</p>
      </div>
      <div className='summary-line'>
        <h5>Start Time</h5>
        <p>{launchpadValue.presaleStartTime?.toString()}</p>
      </div>
      <div className='summary-line'>
        <h5>End Time</h5>
        <p>{launchpadValue.presaleEndTime?.toString()}</p>
      </div>
      <div className='summary-line'>
        <h5>Liquidity Lockup Time</h5>
        <p>{launchpadValue.liquidityUnlockTime?.toString()}</p>
      </div>
      <div className='summary-line'>
        <h5>Website</h5>
        <p>{launchpadValue.website}</p>
      </div>
      <div className='summary-line'>
        <h5>Description</h5>
        <p>{launchpadValue.projectDescription}</p>
      </div>
      {launchpadValue.vestingContributor && (
        <div className='summary-line-grey'>
          <h5>Vesting Contributor</h5>
          <div className='summary-border mt-2'>
            <div className='summary-line-back'>
              <h5>First release for presale %</h5>
              <p>{launchpadValue.firstReleaseForPresale}</p>
            </div>
            <div className='summary-line-back'>
              <h5>Presale token release each cycle %</h5>
              <p>{launchpadValue.presaleTokenReleaseEachCycle}</p>
            </div>
            <div className='summary-line-back'>
              <h5>Vesting period each cycle (minutes)</h5>
              <p>{launchpadValue.vestingPeriodCycle}</p>
            </div>
          </div>
        </div>
      )}
      <div className='summary-line-grey'>
        <h5>Team Vesting</h5>
        <div className='summary-border'>
          <div className='summary-line-back'>
            <h5>Total team vesting tokens</h5>
            <p>{launchpadValue.totalVestingTokens}</p>
          </div>
          <div className='summary-line-back'>
            <h5>First token release after listing (minutes)</h5>
            <p>{launchpadValue.firstTokenListingTimes}</p>
          </div>
          <div className='summary-line-back'>
            <h5>First token release %</h5>
            <p>{launchpadValue.firstReleaseForPresale}</p>
          </div>
          <div className='summary-line-back'>
            <h5>Vesting period each cycle (minutes)</h5>
            <p>{launchpadValue.vestingPeriodCycle}</p>
          </div>
          <div className='summary-line-back'>
            <h5>Team token release each cycle (percent)*</h5>
            <p>{launchpadValue.teamTokenCycle}</p>
          </div>
        </div>
      </div>

      <div className='d-flex flex-row w-100'>
        <Button
          className='btn-secondary mx-1 btn-dimension w-50'
          variant='contained'
          onClick={prevStep}
          disableElevation={true}
        >
          Back
        </Button>
        <Button
          className='btn-primary mx-1 btn-dimension w-50'
          variant='contained'
          onClick={connectsmartcontract}
          disableElevation={true}
        >
          Add to Presale
        </Button>
      </div>
    </div>
  )
}

export default LaunchpadSummary
