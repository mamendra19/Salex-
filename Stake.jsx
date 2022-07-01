import { useEffect, useState } from "react";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import hypersonicImg from "../../assets/Hypersonic.svg";
import supersonicImg from "../../assets/Supersonic.svg";
import totalHsnImg from "../../assets/TotalHsn.svg";
import hsnEarnedImg from "../../assets/HsnEarned.svg";
import hsnStakedImg from "../../assets/HsnStaked.svg";
import totalSSNImg from "../../assets/TotalSSN.svg";
import SsnStakedImg from "../../assets/SsnStaked.svg";
import SsnEarned from "../../assets/SsnEarned.svg";
import PoolRankSSN from "../../assets/PoolRankSSN.svg";
import poolRankImg from "../../assets/PoolRank.svg";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "react-bootstrap/Button";
import ContentPasteRoundedIcon from "@mui/icons-material/ContentPasteRounded";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import websiteImg from "../../assets/website.svg";
import contactCopyImg from "../../assets/ContactCopy.svg";
import noTokensImg from "../../assets/noTokens.svg";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import StakeHsn, {
    StakeTokens,
} from "../../components/modals/StakeHsn/StakeHsn";
import StakingDone from "../../components/modals/StakingDone/StakingDone";
import WithdrawModal, {
    Withdraw,
} from "../../components/modals/WithdrawModal/WithdrawModal";
import { Helmet } from "react-helmet";
import {CustomSelectComp} from "../../components/select/CustomSelect";
import Tooltip from '@mui/material/Tooltip';
import Web3 from 'web3'
import Web3Modal from 'web3modal'

import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';




const Stake = ({ isWallet }) => {
    const [stakingHsp, setStakingHsp] = useState(false);
    const [withdrawModal, setWithdrawModal] = useState(false);
    const [stakingDone, setStakingDone] = useState(false);
    
    return (
        <div className="stake-section">
            <Helmet>
                <meta charSet="utf-8" />
                <title>xStake | SaleX</title>
            </Helmet>
            <div className="stake-heading">
                <h2>Staking Pool</h2>
                <span>Welcome to salex the home of roken</span>
            </div>
            <div className="stake-content">
                <div className="accordion-col">
                    <Accordion disableGutters>
                        <AccordionSummary
                            expandIcon={
                                <ExpandCircleDownOutlinedIcon
                                    sx={{ color: "#000" }}
                                />
                            }
                        >
                            <div className="stake-section-title">
                                <img src={hypersonicImg} alt="hypersonic" />
                                <span>Hypersonic</span>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <HyperSonicData isWallet={isWallet}
                                stakingHsp={stakingHsp}
                                setStakingHsp={setStakingHsp} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion disableGutters>
                        <AccordionSummary
                            expandIcon={
                                <ExpandCircleDownOutlinedIcon
                                    sx={{ color: "#000" }}
                                />
                            }
                        >
                            <div className="stake-section-title">
                                <img src={supersonicImg} alt="supersonic" />
                                <span>Supersonic</span>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SuperSonicData
                                isWallet={isWallet}
                                stakingHsp={stakingHsp}
                                setStakingHsp={setStakingHsp}
                            />
                        </AccordionDetails>
                    </Accordion>
                </div>
                <div className="refferal-wrapper">
                    <Refferal />
                </div>
            </div>
            <StakeHsn openModal={stakingHsp} onClose={setStakingHsp} />
            <StakingDone openModal={stakingDone} onClose={setStakingDone} />
            <WithdrawModal
                openModal={withdrawModal}
                onClose={setWithdrawModal}
                token="Hypersonic"
            />
        </div>
    );
};

export default Stake;

const Refferal = () => {
    const [referralCode, setReferralCode] = useState("");
    const [earned, setEarned] = useState(0);

    return (
        <div className="refferal-sidebar"> 
            <div>
                <span>{earned} SSN</span>
                <span>Referral Earning</span>
                <Button
                    className={`btn-primary ${earned === 0 && "btn-disabled"}`}
                    variant="contained"
                    disabled={earned === 0 ? true : false}
                >
                    Withdraw
                </Button>
            </div>
            <div className="refer-info">
                <span>Participate in our</span> <br />
                <span>referral program</span>
                <div>
                    <span>{`Hypersonic.finance/ref/${referralCode}`}</span>
                    <ContentPasteRoundedIcon
                        sx={{ color: "#3457d9" }}
                        fontSize="small"
                    />
                </div>
                <span className="bottom-text">
                    Share your referral link to earn more!
                </span>
            </div>

            <div className="refer-info-list">
                <span>Referral List</span> <br />
                <div>

                </div>
            </div>
        </div>
    );
};

const HyperSonicData = ({ isWallet, stakingHsp, setStakingHsp }) => {
    const [totalHsn, setTotalHsn] = useState(0);
    const [hsnStaked, setHsnStaked] = useState(0);
    const [hsnEarned, setHsnEarned] = useState(0);
    const [poolRank, setPoolRank] = useState(0);
    const [activeInfo, setActiveInfo] = useState("Details");

    // const tableData = []

    const handleActiveInfo = (event) => {
        setActiveInfo(event.target.value);
    };
    return (
        <div className="sonic-data">
            <div className="info-row">
                <div className="info-box info-box-1">
                    <img src={totalHsnImg} alt="total-hsn-staked" />
                    <div>
                        <span>{totalHsn}B</span>
                        <span>Total HSN Staked</span>
                    </div>
                </div>
                <div className="info-box">
                    <img src={hsnStakedImg} alt="hsn-staked" />
                    <div>
                        <span>{hsnStaked}</span>
                        <span>HSN Staked</span>
                    </div>
                </div>
                <div className="info-box">
                    <img src={hsnEarnedImg} alt="hsn-earned" />
                    <div>
                        <span>{hsnEarned}</span>
                        <span>HSN Earned</span>
                    </div>
                </div>
                <div className="info-box">
                    <img src={poolRankImg} alt="pool-rank" />
                    <div>
                        <span>{poolRank}</span>
                        <span>Pool Rank</span>
                    </div>
                </div>
            </div>
            <div className="button-row">
                <button
                    onClick={handleActiveInfo}
                    value="Details"
                    className={`btn ${
                        activeInfo === "Details" && "btn-primary"
                    }`}
                >
                    Details
                </button>
                <button
                    onClick={handleActiveInfo}
                    value="Stake"
                    className={`btn ${activeInfo === "Stake" && "btn-primary"}`}
                >
                    Stake
                </button>
                <button
                    onClick={handleActiveInfo}
                    value="Withdraw"
                    className={`btn ${
                        activeInfo === "Withdraw" && "btn-primary"
                    }`}
                >
                    Withdraw
                </button>
            </div>
            <div className="content-cols mobile-hidden">
                <TokensTable />
                <ContractDetails />
            </div>
            <div className="buttons-filter">
                {activeInfo === "Details" && <ContractDetails />}
                {activeInfo === "Stake" && <StakeTokens />}
                {activeInfo === "Withdraw" && (
                    <>
                        <Withdraw />
                        <TokensTable />
                    </>
                )}
            </div>
        </div>
    );
};

const SuperSonicData = ({ isWallet, stakingHsp, setStakingHsp }) => {
    const [totalHsn, setTotalHsn] = useState(0);
    const [hsnStaked, setHsnStaked] = useState(0);
    const [hsnEarned, setHsnEarned] = useState(0);
    const [poolRank, setPoolRank] = useState(0);
    const [activeInfo, setActiveInfo] = useState("Details");

    // const tableData = []

    const handleActiveInfo = (event) => {
        setActiveInfo(event.target.value);
    };
    return (
        <div className="sonic-data">
            <div className="info-row">
                <div className="info-box info-box-1">
                    <img src={totalSSNImg} alt="total-hsn-staked" />
                    <div>
                        <span>{totalHsn}B</span>
                        <span>Total SSN Staked</span>
                    </div>
                </div>
                <div className="info-box">
                    <img src={SsnStakedImg} alt="hsn-staked" />
                    <div>
                        <span>{hsnStaked}</span>
                        <span>SSN Staked</span>
                    </div>
                </div>
                <div className="info-box">
                    <img src={SsnEarned} alt="hsn-earned" />
                    <div>
                        <span>{hsnEarned}</span>
                        <span>SSN Earned</span>
                    </div>
                </div>
                <div className="info-box">
                    <img src={PoolRankSSN} alt="pool-rank" />
                    <div>
                        <span>{poolRank}</span>
                        <span>Pool Rank</span>
                    </div>
                </div>
            </div>
            <div className="button-row">
                <button
                    onClick={handleActiveInfo}
                    value="Details"
                    className={`btn ${
                        activeInfo === "Details" && "btn-primary"
                    }`}
                >
                    Details
                </button>
                <button
                    onClick={handleActiveInfo}
                    value="Stake"
                    className={`btn ${activeInfo === "Stake" && "btn-primary"}`}
                >
                    Stake
                </button>
                <button
                    onClick={handleActiveInfo}
                    value="Withdraw"
                    className={`btn ${
                        activeInfo === "Withdraw" && "btn-primary"
                    }`}
                >
                    Withdraw
                </button>
            </div>
            <div className="content-cols mobile-hidden">
                <TokensTable />
                <ContractDetails />
            </div>
            <div className="buttons-filter">
                {activeInfo === "Details" && <ContractDetails />}
                {activeInfo === "Stake" && <StakeTokens />}
                {activeInfo === "Withdraw" && (
                    <>
                        <Withdraw />
                        <TokensTable />
                    </>
                )}
            </div>
        </div>
    );
};

const ContractDetails = () => {
    const [copied,setCopied] = useState(false);
    const [contractAddress,setContractAddress] = useState("0xF58220Cc1e34sewS1u676Cds33");

    const copyAddress = async () => {
        setCopied(true);
        return await navigator.clipboard.writeText(contractAddress);
    };

    useEffect(() => {
        setTimeout(() => {
            setCopied(false);
        },[3000]);
    },[copied])

    const [web3, setweb3] = useState('')
    const providerOptions = {
        /* See Provider Options Section */
        walletconnect: {
            package: WalletConnectProvider, // required
            options: {
                rpc: {
                    56: "https://speedy-nodes-nyc.moralis.io/362fc40c1ab324c15e79d4da/bsc/mainnet",
                },
            },
        },
        binancechainwallet: {
            package: true,
        },
    
        coinbasewallet: {
            package: CoinbaseWalletSDK, // Required
            options: {
                appName: "Baby Doge Coin", // Required
                rpc: "https://speedy-nodes-nyc.moralis.io/362fc40c1ab324c15e79d4da/bsc/mainnet", // Optional if `infuraId` is provided; otherwise it's required
                chainId: 56, // Optional. It defaults to 1 if not provided
            },
        },
    };
    const [isWallet, setisWallet] = useState(false)
    useEffect(async () => {
        const accounts = await web3.eth.getAccounts()
        accounts.length > 0
          ? await localStorage.setItem('isWallet', (true))
          : await localStorage.setItem('isWallet', (false))
        setisWallet((localStorage.getItem('isWallet')))
      })

  const connectwallet = async () => {
    // const providerOptions = {
    //   /* See Provider Options Section */
    // };

    const web3Modal = new Web3Modal({
      //network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions
    })

    const provider = await web3Modal.connect()

    const web3 = new Web3(provider)
    setweb3(web3)
}
    return (
        <div className="contract-info">
            <div>
                <span>Website</span>
                <div>
                    <span>Hypersonic.finance</span>
                    <img src={websiteImg} alt="website" />
                </div>
            </div>
            <div>
                <span>Contract Address</span>
                <div>
                    <span className="blue-bg">{contractAddress?.slice(0,12)}...{contractAddress?.slice(-3)}</span>
                    <Tooltip title={copied ? "Copied" :"Copy"}>
                        <img src={contactCopyImg} alt="copyContact" onClick={copyAddress} />
                    </Tooltip>
                </div>
            </div>
            <div>
                <span>No. of Stakers</span>
                <div>
                    <span className="blue-bg">1000</span>
                </div>
            </div>
            <div>
                <span>Ends in</span>
                <div>
                    <span className="yellow-bg">180 Days</span>
                </div>
            </div>
            <div>
                {isWallet ? (
                    <>
                        <button className="btn">Withdraw</button>
                        <button className="btn btn-primary">Stake</button>
                    </>
                ) : (
                    <button className="btn btn-primary" onClick={connectwallet}>
                        Connect Wallet to Stake
                    </button>
                )}
            </div>
        </div>
    );
};

const TokensTable = () => {
    const [totalTokenType, setTotalTokenType] = useState("");

    const tableData = [
        { token: "Supersonic", amount: "234900" },
        { token: "Hypersonic", amount: "900" },
        { token: "Supersonic", amount: "234900" },
        { token: "Hypersonic", amount: "900" },
        { token: "Supersonic", amount: "234900" },
        { token: "Hypersonic", amount: "900" },
    ];

    const handleSelect = (event) => {
        setTotalTokenType(event.target.value);
    };
    const [customSelectState,setCustomSelectState] = useState("");
    return (
        <div className="tokens-earned-section">
            <div className="tokens-title">
                <span>Tokens Earned</span>
                <CustomSelectComp
                    title={""}
                    options={[
                    { value: "chocolate", label: "Chocolate" },
                    { value: "strawberry", label: "Strawberry" },
                    { value: "vanilla", label: "Vanilla" }, 
                ]}
                setState={setCustomSelectState}
                    state={customSelectState}
                    name={"customSelectState"}
                />
            </div>
            <div className="stake--box">
                <TableContainer
                    component={Paper}
                    sx={{
                        height: "300px",
                        overflowY: "scroll",
                        marginTop: "1rem",
                    }}
                >
                    <Table
                        className={`stake-table ${tableData.length === 0 && "table-no-data"}`}
                        aria-label="tokens table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "#8C93A3" }}>
                                    Token
                                </TableCell>
                                <TableCell sx={{ color: "#8C93A3",textAlign:'right' }}>
                                    Amount Earned
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {tableData.length === 0 ? (
                            <div className="no-tokens">
                                <img src={noTokensImg} alt="noTokens" />
                                <span>Tokens earned will be listed here</span>
                            </div>
                        ) : (
                            <TableBody>
                                {tableData.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                { border: 0 },
                                        }}
                                    >
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            sx={{ fontWeight: "500" }}
                                        >
                                            {row.token}
                                        </TableCell>
                                        <TableCell>{row.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>
                <button className="claim-tokens-btn">Claim Tokens</button>
            </div>
        </div>
    );
};
