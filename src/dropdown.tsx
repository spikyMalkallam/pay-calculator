import { useState } from "react";
import './dropdown.css'
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import useToggle from "./hooks/useToggle";
import { SwitchToggle } from './buttons'
import { displayMoney, HtmlTooltip, round } from "./functions"
import { AiFillInfoCircle } from "react-icons/ai";

type DropdownProps = {
    label: string;
    contents: any;
    subContents: any;
    colour: string;
}

type ToggleDropdownProps = {
    label: string;
    contents: any;
    toggleFunc: () => void;
    expandedVar: any;
    infoTag: any;
    desc: string;
}

type SummaryProps = {
    label: string;
    total: number;
    items: Record<string, number>;
};

type SummmaryTabProps = {
    label: string;
    daily: number;
    weekly: number;
    fortnightly: number;
    monthly: number;
    yearly: number;
}

type IncomeProps = {
    label: string;
    items: Record<string, any[] | null>;
    totals: string[];
    oldTax: string[];
    totalItems: Record<string, any[] | null>;
}

export function DropdownTab({ label, contents, subContents, colour }: DropdownProps) {
    // const [expanded, setExpanded] = useToggle()
    const expanded = true;

    return (
        <>
            <div className={'dropdown row-drop ' + label + (expanded ? " open" : '')} style={{ display: 'flex' }} > {/* onClick={setExpanded} */}
                {/* <button
                    className={'dropdown-button ' + (expanded ? "expanded " : '') + label}
                    style={{ backgroundColor: colour }}
                >
                    {expanded ? <AiFillCaretDown /> : <AiFillCaretUp />}
                </button> */}
                <div className={'dropdown-contents-div ' + (expanded ? "expanded " : '') + label} style={{ flexGrow: 1, cursor: 'pointer', backgroundColor: colour }}>
                    {/* <div id='mortage-link-box'>
                        <a id='mortage-link' target='_blank' href='https://www.recruitmenthive.com.au/mortage-savings-calculator/'>
                            <i>Learn how Hive's weekly pay can help you save money on your Home Loan</i>
                        </a>
                    </div> */}
                    {contents}

                </div>

            </div>
            <div className={'dropdown-subdiv ' + (expanded ? "expanded " : '') + label} > {/* onClick={() => !expanded ? setExpanded() : () => null} */}
                {subContents}
            </div >
        </>
    )
}
export function DropdownTab2({ label, contents, subContents, colour }: DropdownProps) {
    const [expanded, setExpanded] = useToggle()

    return (
        <>
            <div onClick={setExpanded} className={'dropdown row-drop ' + label} style={{ display: 'flex', cursor: 'pointer' }}>
                <button
                    className={'dropdown-button ' + colour + (expanded ? " expanded" : '')}

                >
                    {expanded ? <AiFillCaretDown /> : <AiFillCaretUp />}
                </button>
                <div style={{ flexGrow: 1 }}>{contents}</div>
            </div>
            <div className={'dropdown-subdiv ' + (expanded ? "expanded " : '') + label}>
                {subContents}
            </div>
        </>
    )
}

export function SummaryTab({ label, daily, weekly, fortnightly, monthly, yearly }: SummmaryTabProps) {
    return (
        <>
            <table className="summary-tab">
                <tbody>
                    <tr>
                        <td>
                            <div className="summary-label">{label}</div>
                        </td>
                        <td>
                            <div className="summary-tab-amount">${daily}</div>
                        </td>
                        <td>
                            <div className="summary-tab-amount">${weekly}</div>
                        </td>
                        <td>
                            <div className="summary-tab-amount">${fortnightly}</div>
                        </td>
                        <td>
                            <div className="summary-tab-amount">${monthly}</div>
                        </td>
                        <td>
                            <div className="summary-tab-amount">${yearly}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export function ToggleDropdownTab({ label, contents, expandedVar }: ToggleDropdownProps) {
    return (
        <>
            <div className={'dropdown' + ' ' + label}> {<DropdownTab label='' contents={contents} subContents={contents} colour="grey" />}</div >
            <div className={'dropdown-subdiv ' + (expandedVar ? "expanded " : '') + label}>
                {contents}
            </div>
        </>
    )
}

export function ToggleExpandVerticalTab({ label, desc, contents, toggleFunc, expandedVar, infoTag }: ToggleDropdownProps) {
    return (
        <>
            <div className={'expand' + ' ' + label.replace(' ', '')}> {<SwitchToggle
                dropdown={true}
                label={label}
                description={desc}
                setFunc={toggleFunc}
                infoTag={infoTag}
            />}

                <div className={'expand-subdiv-vertical' + (expandedVar ? " expanded" : '') + ' ' + label}>
                    {contents}
                </div>
            </div >
        </>
    )
}

export function ToggleExpandHorizontalTab({ label, desc, contents, toggleFunc, expandedVar, infoTag }: ToggleDropdownProps) {
    return (
        <>
            <div className={'expand' + ' ' + label.replace(' ', '')}> {<SwitchToggle
                dropdown={true}
                label={label}
                description={desc}
                setFunc={toggleFunc}
                infoTag={null}
            />}  {infoTag}

                <div className={'expand-subdiv-horizontal' + (expandedVar ? " expanded" : '') + ' ' + label}>
                    {contents}
                </div>
            </div >
        </>
    )
}

export function DropdownSummaryInformation({ label, total, items }: SummaryProps) {
    const [expanded, setExpanded] = useState(false)

    return (
        <>
            <div className="dropdown-container" onClick={() => setExpanded(!expanded)}>
                <table className="dropdown-header">
                    <tbody>
                        <tr>
                            <td className="coloured-dot-div">
                                <div className={"coloured-dot-header-" + label.split(" ")[0]}></div>
                            </td>
                            <td>
                                <div className="dropdown-label">{(expanded ? <AiFillCaretUp /> : <AiFillCaretDown />)} {label}</div>
                            </td>
                            <td>
                                <div className="finance-dropdown-header-amount">${total}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className={`dropdown-details ${expanded ? 'expanded' : ''}`}>

                    <table className="dropdown-sub-rows">
                        <tbody>
                            {Object.entries(items).map(([key, value]) => {
                                if (value != 0) {
                                    return (
                                        <tr>
                                            <td>
                                                <div className={"coloured-dot-" + label.split(" ")[0]}></div>
                                            </td>
                                            <td>
                                                <div className="finance-dropdown-name">{key}</div>
                                            </td>
                                            <td>
                                                <div className="finance-dropdown-amount">${value}</div>
                                            </td>
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    )
}

export function IncomeTable({ items, totals, oldTax, totalItems }: IncomeProps) {
    let takehomeSubRows = Object.entries(totalItems).map(([key, subValue]: [string, any]) => {
        if (subValue != null) {
            return (
                <div className={'dropdown row-drop '} style={{ display: 'flex' }}>
                    <button className="dropdown-spacer dark-grey">

                    </button>
                    <div style={{ flexGrow: 1 }}><table className="sub-sub-table-header">
                        <tbody>
                            <tr key={key} className={"income-table-category"}>
                                <td>
                                    <div className={"income-table-name"}><div className={"coloured-dot-" + key.replace(" ", "").replace('#', '')}></div><span className="income-table-text">{(key[0] == '#' ? key.split('#')[1] : key)}</span></div>
                                </td>
                                <td>
                                    <div className={"income-table-category"}>{subValue[1]}</div>
                                </td>
                                {/* <td>
                                                    <div className={"income-table-category"}>{subValue[2]}</div>
                                                </td> */}
                                <td>
                                    <div className={"income-table-category"}>{subValue[3]}</div>
                                </td>
                                <td>
                                    <div className={"income-table-category"}>{subValue[4]}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table></div>
                </div>

            )
        }
    })

    return (
        <>
            <table className="income-table">
                <thead >
                    <tr className="income-table-header">

                        <td style={{ width: '20px' }}></td>
                        <td>Weekly</td>
                        {/* <td>
                        Fortnightly
                    </td> */}
                        <td>Monthly</td >
                        <td>Annually</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={4} className="big-income-cell">
                            {Object.entries(items).map(([key, value]: [string, any]) => {
                                let row = value[0]
                                let subrows = value[1]
                                let renderedSubRows = Object.entries(subrows).map(([key, subValue]: [string, any]) => {
                                    if (subValue != null) {
                                        return (
                                            <div className={'dropdown row-drop'} style={{ display: 'flex' }}>
                                                <button className="dropdown-spacer dark-grey">
                                                </button>
                                                <div style={{ flexGrow: 1 }}><table className="sub-sub-table-header">
                                                    <tbody>
                                                        <tr key={key} className={"income-table-category"}>
                                                            <td>
                                                                <div className={"income-table-name"}><div className={"coloured-dot-" + key.replace(" ", "").replace('#', '')}></div><span className="income-table-text">{(key[0] == '#' ? key.split('#')[1] : key)}{key == 'Division 293' ? <HtmlTooltip
                                                                    title={
                                                                        <>
                                                                            <a href="https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/caps-limits-and-tax-on-super-contributions/division-293-tax-on-concessional-contributions-by-high-income-earners" target="_blank">Division 293</a> tax is an additional tax on super contributions, reducing the tax concession for individuals whose combined income and concessional contributions for Division 293 purposes is more than $250,000.
                                                                        </>
                                                                    }
                                                                    slotProps={{
                                                                        popper: {
                                                                            modifiers: [
                                                                                {
                                                                                    name: 'offset',
                                                                                    options: {
                                                                                        offset: [160, -60],
                                                                                    },
                                                                                },
                                                                            ],
                                                                        },
                                                                    }}
                                                                >
                                                                    <AiFillInfoCircle />
                                                                </HtmlTooltip> : ''}</span></div>
                                                            </td>
                                                            <td>
                                                                <div className={"income-table-category"}>{subValue[1]}</div>
                                                            </td>
                                                            {/* <td>
                                                    <div className={"income-table-category"}>{subValue[2]}</div>
                                                </td> */}
                                                            <td>
                                                                <div className={"income-table-category"}>{subValue[3]}</div>
                                                            </td>
                                                            <td>
                                                                <div className={"income-table-category"}>{subValue[4]}</div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table></div>
                                            </div>

                                        )
                                    }
                                })
                                return (
                                    <DropdownTab2 label="row-drop"
                                        colour="grey"
                                        contents={
                                            <table className="sub-table-header">
                                                <tbody>
                                                    <tr key={key} className={"income-table-header-category"}>
                                                        <td>
                                                            <div className={"income-table-header-name"}><div className={"coloured-dot-" + key.replace(" ", "").replace('#', '')}></div><span className="income-table-text">{(key[0] == '#' ? key.split('#')[1] : key)}</span></div>
                                                        </td>
                                                        <td>
                                                            <div className={"income-table-header-category"}>{oldTax !== undefined && oldTax.length > 0 && key == '#Total Taxes' ? (<><del>{oldTax[1]}</del><br></br> {row[1]}</>) : row[1]}</div>
                                                        </td>
                                                        {/* <td>
                                                    <div className={"income-table-header-category"}>{oldTax !== undefined && oldTax.length > 0 && key == '#Total Taxes' ? (<><del>{oldTax[2]}</del><br></br> {row[2]}</>) : row[2]}</div>
                                                </td> */}
                                                        <td>
                                                            <div className={"income-table-header-category"}>{oldTax !== undefined && oldTax.length > 0 && key == '#Total Taxes' ? (<><del>{oldTax[3]}</del><br></br> {row[3]}</>) : row[3]}</div>
                                                        </td>
                                                        <td>
                                                            <div className={"income-table-header-category"}>{oldTax !== undefined && oldTax.length > 0 && key == '#Total Taxes' ? (<><del>{oldTax[4]}</del><br></br> {row[4]}</>) : row[4]}</div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>}
                                        subContents={renderedSubRows} /> //Object.entries(items).map(([key, value]: [string, any]) => { })

                                )
                            })
                            }
                        </td>
                    </tr>
                </tbody>
            </table >
            {

                <DropdownTab2 label="row-drop"
                    colour="yellow"
                    contents={
                        <table className="income-takehome-table">
                            <tbody>
                                <tr className="income-table-takehome-row">
                                    <td className="income-table-takehome label">Take-Home Pay</td>
                                    <td className="income-table-takehome">{totals[1]}</td>
                                    {/* <td className="income-table-takehome-cell">{totals[2]}</td> */}
                                    <td className="income-table-takehome">{totals[3]}</td>
                                    <td className="income-table-takehome">{totals[4]}</td>
                                </tr>
                            </tbody>
                        </table>
                    } subContents={takehomeSubRows}
                />
            }

        </>
    )
}

type MortageProps = {
    mortageData: Record<string, number>
    monthlyPayment: boolean;
}

export function MortageRepaymentTable({ mortageData }: MortageProps) {

    return (
        <div className="mortgage-container">
            {/* Header */}
            <div className="mortgage-header">
                Your Home Loan Repayments
            </div>

            {/* Main Comparison Section */}
            <div className="comparison-flex">

                {/* Monthly Column */}
                <div className="comparison-column border-right">
                    <div className="frequency-title">Monthly</div>
                    <div className="stats-grid">
                        <div className="stat-item border-top">
                            <span>Repayment</span>
                            <div className="value">{displayMoney(mortageData['montlyRepaymentAmmount'])}</div>
                        </div>
                        <div className="stat-item border-top">
                            <span>Loan Duration</span>
                            <div className="value">{mortageData['loanTerm']} years</div>
                        </div>
                        <div className="stat-item">
                            <span>Total loan Repayments</span>
                            <div className="value">{displayMoney(mortageData['monthlyTotalRepayments'])}</div>
                        </div>
                        <div className="stat-item">
                            <span>Total interest charged</span>
                            <div className="value">{displayMoney(mortageData['monthlyTotalInterest'])}</div>
                        </div>
                    </div>
                </div>

                {/* Weekly Column */}
                <div className="comparison-column">
                    <div className="frequency-title">Weekly</div>
                    <div className="stats-grid">
                        <div className="stat-item border-top">
                            <span>Repayment</span>
                            <div className="value">{displayMoney(mortageData['weeklyRepaymentAmmount'])}</div>
                        </div>
                        <div className="stat-item border-top">
                            <span>Loan Duration</span>
                            <div className="value highlighted-text">{mortageData['weeklyPayedOffIn']} years</div>
                        </div>
                        <div className="stat-item">
                            <span>Total loan Repayments</span>
                            <div className="value highlighted-text">{displayMoney(mortageData['weeklyTotalRepayments'])}</div>
                        </div>
                        <div className="stat-item">
                            <span>Total interest charged</span>
                            <div className="value highlighted-text">{displayMoney(mortageData['weeklyTotalInterest'])}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Savings Box */}
            <div id="savings-box">
                <div id="savings-header">Savings with Weekly Repayments</div>
                <div id="benefits-box">
                    <div className="sub-benefit-box">
                        <p>Time Saved</p>
                        <div className="highlighted-value">{mortageData['weeklyTimeSaved']} years</div>
                    </div>
                    <div className="sub-benefit-box">
                        <p>Annual Interest Savings</p>
                        <div className="highlighted-value">{displayMoney(mortageData['weeklyAnnualInterestSavings'])}</div>
                    </div>
                    <div className="sub-benefit-box">
                        <p>Annual Weekly Pay Fee</p>
                        <div className="highlighted-value">{displayMoney(mortageData['yearlyFee'])}</div>
                    </div>
                    <div className="sub-benefit-box">
                        <p>Net Savings</p>
                        <p style={{ fontSize: '14px' }}><i>(Total interest savings minus total Fee)</i></p>
                        <div className="highlighted-value">{displayMoney(round(mortageData['weeklyInterestSavings'] - (mortageData['totalFeeSum']), 2))}</div>
                    </div>
                </div>
            </div>

            <style>{`
            #mortage-dropdown {
                justify-content: center;
                align-items: center;
            }
                #mortage-input {
                width: 100%;
                justify-content: center;
                align-items: center;
                }
        .mortgage-container {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          font-family: sans-serif;
        }
        .mortgage-header {
        //   background-color: #f8f9fa;
          padding: 15px;
          font-size: 28px;
          text-align: center;
          font-weight: bold;
        }
        .comparison-flex {
          display: flex;
          flex-wrap: wrap;
        //   border: 1px solid #ddd;
        }
        .comparison-column {
          flex: 1;
          min-width: 300px;
          display: flex;
          flex-direction: column;
        }
        .frequency-title {
          padding: 15px;
          text-align: center;
          font-size: 20px;
          font-weight: 600;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .stat-item {
          padding: 15px;
          display: flex;
          flex-direction: column;
        }
        .value {
          font-weight: 600;
          margin-top: 5px;
        }
        .highlighted-text {
          color: var(--hive-yellow);
        }
        .highlighted-value {
          color: var(--hive-yellow);
          font-size: 28px;
          font-weight: 600;
        }
        .border-right { border-right: 2px solid var(--hive-yellow); }
        .border-top { border-top: 2px solid var(--hive-yellow); }
        
        #benefits-box {
          display: flex;
          justify-content: space-around;
          text-align: center;
          gap: 20px;
          padding: 20px;
        }

        /* Mobile Adjustments */
        @media (max-width: 654px) {
          .comparison-column.border-right { border-right: none; }
          #benefits-box { flex-direction: column; }
          .mortgage-container { flex-direction: column; }
        }
      `}</style>
        </div>
    )
}