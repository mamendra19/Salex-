import React, { useEffect, useState } from 'react'
import { ReactComponent as Back } from '../../assets/Back.svg'
import { HorizontalDash, VerticalDash } from '../../assets/Dash'
// steps
import TokenDetails from '../../components/LaunchpadSteps/TokenDetails'
import ExchangeDetails from '../../components/LaunchpadSteps/ExchangeDetails'
import Timing from '../../components/LaunchpadSteps/Timing'
import Vesting from '../../components/LaunchpadSteps/Vesting'
import AdditionalDetails from '../../components/LaunchpadSteps/AdditionalDetails'
import LaunchpadSummary from '../../components/LaunchpadSteps/LaunchpadSummary'
import Helmet from 'react-helmet'
import { Formik } from 'formik'

const Launchpad = () => {
  const [step, setStep] = useState(1)
  const [additionalDetails, setAdditionalDetails] = useState('true')
  const [saleType, setSaleType] = useState('')
  const [error, setError] = useState({
    blockchainError: '',
    tokenOwnerAddressError: '',
    tokenAddressError: '',
    presaleRatesError: '',
    presaleCapsError: '',
    contributionLimitsError: '',
    softCapError: '',
    hardCapError: '',
    minContError: '',
    maxContError: '',
    //2
    refundTypeError: '',
    selectExchangeError: '',
    pancakeLiquidityError: '',
    pancakeListingRateError: '',
    //3
    presaleStartTimeError: '',
    presaleEndTimeError: '',
    liquidityUnlockTimeError: '',
    //4
    totalVestingTokensError: '',
    firstTokenListingTimesError: '',
    firstTokenReleasePercentError: '',
    vestingPeriodCycleError: '',
    teamTokenCycleError: '',
    vestingContributorError: false,
    firstReleaseForPresaleError: '',
    presaleTokenReleaseEachCycleError: '',
    vestingPeriodEachCycleError: '',
    //additional details
    tokenImageError: '',
    websiteError: '',
    telegramError: '',
    discordError: '',
    facebookError: '',
    instagramError: '',
    redditError: '',
    githubError: '',
    projectDescriptionError: '',
  })

  let launchpadInitialValues = {
    //1
    tokenAddress: '',
    presaleRates: '',
    presaleCaps: '',
    contributionLimits: '',
    softCap: '',
    hardCap: '',
    minCont: '',
    maxCont: '',
    //2
    refundType: '',
    selectExchange: '',
    pancakeLiquidity: '',
    pancakeListingRate: '',
    //3
    presaleStartTime: '',
    presaleEndTime: '',
    liquidityUnlockTime: '',
    //4
    totalVestingTokens: '',
    firstTokenListingTimes: '',
    firstTokenReleasePercent: '',
    vestingPeriodCycle: '',
    teamTokenCycle: '',
    vestingContributor: false,
    firstReleaseForPresale: '',
    presaleTokenReleaseEachCycle: '',
    vestingPeriodEachCycle: '',
    //additional details
    tokenImage: '',
    website: '',
    telegram: '',
    discord: '',
    facebook: '',
    instagram: '',
    reddit: '',
    github: '',
    projectDescription: '',
    saleType: '',
  }

  const [launchpadValue, setLaunchpadValue] = useState(launchpadInitialValues)

  const validate = () => {
    console.log('step ', step)
    var errors = {}
    let errorCount = 0
    if (step == 1) {
      if (!launchpadValue.tokenAddress) {
        errors.tokenAddressError = 'Token Address Required'
        errorCount += 1
      }
      if (!launchpadValue.presaleRates) {
        errors.presaleRatesError = 'Presale rates required'
        errorCount += 1
      }
      if (!launchpadValue.softCap || !launchpadValue.hardCap) {
        errors.softCapError = 'Cap is required'
        errorCount += 1
      }
      if (!launchpadValue.minCont || !launchpadValue.maxCont) {
        errors.minContError = 'Count is required'
        errorCount += 1
      }
    } else if (step == 2) {
      if (!launchpadValue.refundType) {
        errors.refundTypeError = 'Refund Type is required'
        errorCount += 1
      }
      if (!launchpadValue.selectExchange) {
        errors.selectExchangeError = 'Select Exchange is required'
        errorCount += 1
      }
      if (!launchpadValue.pancakeLiquidity) {
        errors.pancakeLiquidityError = 'Pancake Liquidity is required'
        errorCount += 1
      }
      if (!launchpadValue.pancakeListingRate) {
        errors.pancakeListingRateError = 'Pancake listing rate is required'
        errorCount += 1
      }
    } else if (step == 3) {
      if (!launchpadValue.presaleStartTime) {
        errors.presaleStartTimeError = 'Presale start time is required'
        errorCount += 1
      }
      if (!launchpadValue.presaleEndTime) {
        errors.presaleEndTimeError = 'Presale end time is required'
        errorCount += 1
      }
      if (!launchpadValue.liquidityUnlockTime) {
        errors.liquidityUnlockTimeError = 'Liquidity unlock time is required'
        errorCount += 1
      }
    } else if (step == 4) {
      if (!launchpadValue.totalVestingTokens) {
        errors.totalVestingTokensError = 'Total vesting tokens are required'
        errorCount += 1
      }
      if (!launchpadValue.firstTokenListingTimes) {
        errors.firstTokenListingTimesError = 'Token time is required'
        errorCount += 1
      }
      if (!launchpadValue.firstTokenReleasePercent) {
        errors.firstTokenReleasePercentError =
          'Liquidity unlock time is required'
        errorCount += 1
      }

      if (!launchpadValue.vestingPeriodCycle) {
        errors.vestingPeriodCycleError = 'Vesting Period Cycle is required'
        errorCount += 1
      }
      if (!launchpadValue.teamTokenCycle) {
        errors.teamTokenCycleError = 'Team token cycle is required'
        errorCount += 1
      }
      //if vesting contributor
    } else if (step == 5) {
      if (!launchpadValue.tokenImage) {
        errors.tokenImageError = 'Token Image is required'
        errorCount += 1
      }
    }
    setError({
      ...error,
      errors,
    })
    return { errors: errors, errorCount: errorCount }
  }

  const nextStep = () => {
    console.log(additionalDetails)

    if (
      (additionalDetails == 'false' || additionalDetails == false) &&
      step == 4
    ) {
      setStep(step + 2)
    } else if (step < 7) {
      setStep(step + 1)
    }
  }
  const prevStep = () => {
    console.log(additionalDetails)
    if (
      step != 1 &&
      (additionalDetails == 'true' || additionalDetails == true)
    ) {
      setStep(step - 1)
    } else if (
      (additionalDetails == 'false' || additionalDetails == false) &&
      step == 6
    ) {
      setStep(step - 2)
    } else if (
      step != 1 &&
      (additionalDetails == 'false' || additionalDetails == false)
    ) {
      setStep(step - 1)
    } else {
      // hideCreateToken();
    }
  }
  const handleLaunchpadValue = (evt) => {
    let value = evt.target.value
    setLaunchpadValue({
      ...launchpadValue,
      [evt.target.name]: value,
    })
  }

  return (
    <section className='launchpad-section'>
      {/* copied from createToken */}
      <Helmet>
        <meta charSet='utf-8' />
        <title>xLaunchpad | SaleX</title>
      </Helmet>
      <div className='createTokenSection'>
        <Back onClick={prevStep} />
        <h2>
          Create{' '}
          {launchpadValue.saleType == 'normalLaunch'
            ? 'new Presale'
            : 'a Fairlaunch'}
        </h2>
        <p>Enter the required details to create a new token</p>

        {/* two divison left and right(separte components in create-token folder) */}

        <form className='create-tokenPages'>
          <div className='create-tokenPages__steps-container'>
            <div className='create-tokenPages__steps'>
              {launchpadValue.saleType == 'normalLaunch' && (
                <>
                  <div
                    className={
                      step >= 1 ? 'steps-box activeStep' : ' steps-box'
                    }
                    onClick={prevStep}
                  >
                    <div className='steps-left'>1</div>
                    <div className='steps-right'>
                      <span>Presale Details</span>
                      <p>Enter presale rates and contribution limits</p>
                    </div>
                  </div>
                  <VerticalDash step={step > 1} />
                  <HorizontalDash step={step > 1} />
                </>
              )}
              <div
                className={
                  step >= 2 || launchpadValue.saleType == 'fairLaunch'
                    ? 'steps-box activeStep'
                    : ' steps-box'
                }
                onClick={nextStep}
              >
                <div className='steps-left'>
                  {launchpadValue.saleType == 'normalLaunch' ? 2 : 1}
                </div>
                <div className='steps-right'>
                  <span>Exchange Details</span>
                  <p>Enter your token details to start presale</p>
                </div>
              </div>
              <VerticalDash
                step={step > 2 || launchpadValue.saleType == 'fairLaunch'}
              />
              <HorizontalDash
                step={step > 2 || launchpadValue.saleType == 'fairLaunch'}
              />
              <div
                className={step >= 3 ? 'steps-box activeStep' : ' steps-box'}
                onClick={nextStep}
              >
                <div className='steps-left'>
                  {launchpadValue.saleType == 'normalLaunch' ? 3 : 2}
                </div>
                <div className='steps-right'>
                  <span>Timing</span>
                  <p>Enter your token details to start presale</p>
                </div>
              </div>

              <VerticalDash step={step > 3} />
              <HorizontalDash step={step > 3} />

              <div
                className={step >= 4 ? 'steps-box activeStep' : ' steps-box'}
              >
                <div className='steps-left'>
                  {launchpadValue.saleType == 'normalLaunch' ? 4 : 3}
                </div>
                <div className='steps-right'>
                  <span>Vesting</span>
                  <p>Enter your token details to start presale</p>
                </div>
              </div>
              <VerticalDash step={step > 4} />
              <HorizontalDash step={step > 4} />
              {additionalDetails == 'true' && (
                <div
                  className={step >= 5 ? 'steps-box activeStep' : ' steps-box'}
                >
                  <div className='steps-left'>
                    {additionalDetails == 'true' &&
                    launchpadValue.saleType == 'normalLaunch'
                      ? 5
                      : 4}
                  </div>
                  <div className='steps-right'>
                    <span>Additional Details</span>
                    <p>Enter your token details to start presale</p>
                  </div>
                </div>
              )}
              {additionalDetails == 'true' && (
                <>
                  <VerticalDash step={step > 5} />
                  <HorizontalDash step={step > 5} />
                </>
              )}
              <div
                className={step >= 6 ? 'steps-box activeStep' : ' steps-box'}
              >
                <div className='steps-left'>
                  {launchpadValue.saleType == 'normalLaunch'
                    ? additionalDetails == 'true'
                      ? 6
                      : 5
                    : additionalDetails == 'true'
                    ? 5
                    : 4}
                </div>
                <div className='steps-right'>
                  <span>Summary</span>
                  <p>Enter your token details to start presale</p>
                </div>
              </div>
            </div>
          </div>
          {/* all the pages here  */}
          <div className='create-tokenPages__pages'>
            <ShowStepPage
              step={step}
              setStep={setStep}
              setAdditionalDetails={setAdditionalDetails}
              additionalDetails={additionalDetails}
              nextStep={nextStep}
              prevStep={prevStep}
              error={error}
              setError={setError}
              launchpadInitialValues={launchpadInitialValues}
              setSaleType={setSaleType}
              saleType={saleType}
              handleLaunchpadValue={handleLaunchpadValue}
              launchpadValue={launchpadValue}
              setLaunchpadValue={setLaunchpadValue}
            />
          </div>
        </form>
      </div>
    </section>
  )
}

const ShowStepPage = ({
  step,
  setStep,
  mintTokenForm,
  setMintTokenForm,
  setWithFees,
  withFees,
  nextStep,
  prevStep,
  error,
  setError,
  launchpadInitialValues,
  saleType,
  setSaleType,
  handleLaunchpadValue,
  launchpadValue,
  setLaunchpadValue,
}) => {
  switch (step) {
    case 1:
      return (
        <TokenDetails
          error={error}
          setError={setError}
          nextStep={nextStep}
          prevStep={prevStep}
          launchpadInitialValues={launchpadInitialValues}
          setSaleType={setSaleType}
          saleType={saleType}
          handleLaunchpadValue={handleLaunchpadValue}
          launchpadValue={launchpadValue}
          setLaunchpadValue={setLaunchpadValue}
        />
      )
    case 2:
      return (
        <ExchangeDetails
          error={error}
          setError={setError}
          nextStep={nextStep}
          prevStep={prevStep}
          //  launchpadInitialValues={launchpadInitialValues}
          handleLaunchpadValue={handleLaunchpadValue}
          launchpadValue={launchpadValue}
          setLaunchpadValue={setLaunchpadValue}
        />
      )
    case 3:
      return (
        <Timing
          error={error}
          setError={setError}
          nextStep={nextStep}
          prevStep={prevStep}
          launchpadInitialValues={launchpadInitialValues}
          setLaunchpadValue={setLaunchpadValue}
          launchpadValue={launchpadValue}
        />
      )
    case 4:
      return (
        <Vesting
          error={error}
          setError={setError}
          nextStep={nextStep}
          prevStep={prevStep}
          launchpadInitialValues={launchpadInitialValues}
          setLaunchpadValue={setLaunchpadValue}
          launchpadValue={launchpadValue}
          handleLaunchpadValue={handleLaunchpadValue}
        />
      )
    case 5:
      return (
        <AdditionalDetails
          error={error}
          setError={setError}
          nextStep={nextStep}
          prevStep={prevStep}
          launchpadInitialValues={launchpadInitialValues}
          setSaleType={setSaleType}
          saleType={saleType}
          setLaunchpadValue={setLaunchpadValue}
          handleLaunchpadValue={handleLaunchpadValue}
          launchpadValue={launchpadValue}
        />
      )
    case 6:
      return (
        <LaunchpadSummary
          error={error}
          setError={setError}
          nextStep={nextStep}
          prevStep={prevStep}
          launchpadInitialValues={launchpadInitialValues}
          launchpadValue={launchpadValue}
        />
      )
    default:
      setStep(1)
      return (
        <TokenDetails
          error={error}
          setError={setError}
          nextStep={nextStep}
          prevStep={prevStep}
          launchpadInitialValues={launchpadInitialValues}
          setSaleType={setSaleType}
          saleType={saleType}
          handleLaunchpadValue={handleLaunchpadValue}
          launchpadValue={launchpadValue}
        />
      )
  }
}

export default Launchpad
