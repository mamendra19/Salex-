import React, { useState, useEffect } from 'react'
import CustomInput from '../input/CustomInput'
import CustomSelect, { CustomSelectComp } from '../select/CustomSelect'
import Form from 'react-bootstrap/Form'
import Button from '@mui/material/Button'
import horizontalDash from '../../assets/horizontalDash.svg'
import { tokenAbi } from "../../tokenAbi";
import Web3 from 'web3'
const TokenDetails = ({
  setAdditionalDetails,
  additionalDetails,
  nextStep,
  prevStep,
  error,
  setError,
  saleType,
  setSaleType,
  handleLaunchpadValue,
  launchpadValue,
  setLaunchpadValue,
}) => {
  const [approve, setApprove] = useState(false)

  const handleNextStep = async() => {
    console.log("SaleType",launchpadValue.saleType)
    if (launchpadValue.saleType == "normalLaunch") {
      //setApprove(true)
      console.log("saleTYPe next")
     
      try{
        const web3 =new Web3(Web3.givenProvider);
        const token = new web3.eth.Contract(tokenAbi,launchpadValue.tokenAddress)
        console.log(token,"mamendra")
        await token.methods.decimals().call()
        setApprove(true);
      }
      catch(error){
       console.log(error);
       }
    }
     else {
      console.log("Newxt")
      nextStep()
    }
  }
  useEffect(() => {
    console.log(approve)
  },[approve])
  
  return (
    <div className='prelimDetails formBox'>
      <Form className='w-100 text-center'>
        {!approve && (
          <div>
            <h3>Verify Token</h3>
            <p>Enter token address to start presale</p>
            <CustomSelectComp
              title={'Sale Type'}
              options={[
                { value: 'normalLaunch', label: 'Normal Launch' },
                { value: 'fairLaunch', label: 'Fairlaunch' },
              ]}
              state={launchpadValue}
              setState={setLaunchpadValue}
              name={'saleType'}
            />
            <br />
            <CustomInput
              title={'Token Address'}
              error={error.blockchainError}
              setError={setError}
              isDisabled={false}
              placeholder={'Ex. 0x3a...'}
              type={'text'}
              setState={handleLaunchpadValue}
              state={launchpadValue.tokenAddress}
              name={'tokenAddress'}
            />
            <br />
            <div className='page-sub-details'>
              <strong>Presale fees:</strong> 3100 SSN
            </div>
            {/* <br /> */}

            {approve ? (
              <Button
                className='btn-primary mt-4 btn-dimension w-100'
                variant='contained'
                disabled={!launchpadValue.tokenAddress}
                onClick={nextStep}
              >
                Next
              </Button>
            ) : (
              <Button
                className='btn-primary mt-4 btn-dimension w-100'
                variant='contained'
                disabled={!launchpadValue.tokenAddress}
                onClick={handleNextStep}
              >
                Approve Token
              </Button>
            )}
          </div>
        )}
        {approve && launchpadValue.saleType == 'normalLaunch' && (
          <div>
            <h3>Presale Details</h3>
            <p>Enter presale rates and contribution limits</p>
            <br />
            <Form.Label htmlFor='inputPassword5' className='input-box-title'>
              <span>
                Enter Presale Rates <sup class='star'>*</sup>
              </span>
            </Form.Label>
            <CustomInput
              title={''}
              error={error.tokenOwnerAddressError}
              setError={setError}
              isDisabled={false}
              placeholder={'234'}
              showChange={true}
              type={'text'}
              setState={handleLaunchpadValue}
              state={launchpadValue.presaleRates}
              name={'presaleRates'}
            />
            <div className='sub-detail-input'>
              If I spend 1 BNB how many tokens will I receive?
            </div>
            <br />
            <Form.Label htmlFor='inputPassword5' className='input-box-title'>
              <span>
                Enter Pre-Sale Caps <sup class='star'>*</sup>
              </span>
            </Form.Label>
            <div className='d-flex'>
              <CustomInput
                title={''}
                error={error.tokenOwnerAddressError}
                setError={setError}
                isDisabled={false}
                placeholder={'Soft Cap'}
                showChange={true}
                type={'text'}
                setState={handleLaunchpadValue}
                state={launchpadValue.softCap}
                name={'softCap'}
              />
              <img className='m-2' src={horizontalDash} alt='dash' />
              <CustomInput
                title={''}
                error={error.tokenOwnerAddressError}
                setError={setError}
                isDisabled={false}
                placeholder={'Hard Cap'}
                showChange={true}
                type={'text'}
                setState={handleLaunchpadValue}
                state={launchpadValue.hardCap}
                name={'hardCap'}
              />
            </div>
            <div className='sub-detail-input'>
              Softcap must be &ge; 50% of Hardcap
            </div>
            <br />
            <Form.Label htmlFor='inputPassword5' className='input-box-title'>
              <span>
                Enter Contribution Limits
                <sup class='star'>*</sup>
              </span>
            </Form.Label>
            <div className='d-flex'>
              <CustomInput
                title={''}
                error={error.tokenOwnerAddressError}
                setError={setError}
                isDisabled={false}
                placeholder={'Min Cont.'}
                showChange={true}
                type={'text'}
                setState={handleLaunchpadValue}
                state={launchpadValue.minCont}
                name={'minCont'}
              />
              <img className='m-2' src={horizontalDash} alt='dash' />
              <CustomInput
                title={''}
                error={error.tokenOwnerAddressError}
                setError={setError}
                isDisabled={false}
                placeholder={'Max Cont.'}
                showChange={true}
                type={'text'}
                setState={handleLaunchpadValue}
                state={launchpadValue.maxCont}
                name={'maxCont'}
              />
            </div>
            <br />
            <div className='page-sub-details'>
              <strong>Presale fees:</strong> 3100 SSN
            </div>
            <br />
            <Button
              className='btn-primary mt-4 btn-dimension'
              variant='contained'
              onClick={nextStep}
            >
              Next
            </Button>
          </div>
        )}
      </Form>
    </div>
  )
}

export default TokenDetails
