import { useState } from "react";
import './dropdown.css'
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import useToggle from "./hooks/useToggle";
import { SwitchToggle } from './buttons'
import { displayMoney, HtmlTooltip } from "./functions"
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
    const [expanded, setExpanded] = useToggle()

    return (
        <>
            <div className={'dropdown row-drop ' + label} style={{ display: 'flex' }} onClick={setExpanded}>
                <button
                    className={'dropdown-button ' + colour + (expanded ? " expanded" : '')}

                >
                    {expanded ? <AiFillCaretDown /> : <AiFillCaretUp />}
                </button>
                <div className='dropdown-contents-div' style={{ flexGrow: 1 }}>{contents}</div>
            </div>
            <div className={'dropdown-subdiv' + (expanded ? " expanded" : '')}>
                {subContents}
            </div >
        </>
    )
}
export function DropdownTab2({ label, contents, subContents, colour }: DropdownProps) {
    const [expanded, setExpanded] = useToggle()

    return (
        <>
            <div onClick={setExpanded} className={'dropdown row-drop ' + label} style={{ display: 'flex' }}>
                <button
                    className={'dropdown-button ' + colour + (expanded ? " expanded" : '')}

                >
                    {expanded ? <AiFillCaretDown /> : <AiFillCaretUp />}
                </button>
                <div style={{ flexGrow: 1 }}>{contents}</div>
            </div>
            <div className={'dropdown-subdiv' + (expanded ? " expanded" : '')}>
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
            <div className={'dropdown-subdiv' + (expandedVar ? " expanded" : '') + ' ' + label}>
                {contents}
            </div>
        </>
    )
}

export function ToggleExpandVerticalTab({ label, desc, contents, toggleFunc, expandedVar, infoTag }: ToggleDropdownProps) {
    return (
        <>
            <div className={'expand' + ' ' + label.replace(' ', '')}> {<SwitchToggle
                label={label}
                description={desc}
                setFunc={toggleFunc}
                infoTag={null}
            />}  {infoTag}

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
                            }</td>
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
                                    <td className="income-table-takehome label">Take-home pay</td>
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

export function MortageRepaymentTable({ mortageData, monthlyPayment }: MortageProps) {
    // Excel helpers


    return (
        <table className="mortage-table">
            <thead>
                <tr className="mortage-table-header">
                    <td className='unselected-freq'>
                        Mortage Repayments
                    </td>
                    <td className={!monthlyPayment ? 'selected-freq' : 'unselected-freq'}>
                        Monthly
                    </td>
                    <td className={monthlyPayment ? 'selected-freq' : 'unselected-freq'}>
                        Weekly <HtmlTooltip
                            title={
                                <>
                                    <b>Repayment brackets</b>
                                    <ul style={{ 'textAlign': 'left' }}>
                                        <li><b>$0 - $67,000:</b> Nil</li>
                                        <li><b>$67,001 - $125,000:</b> 15c for each $1 over $67,000</li>
                                        <li><b>$125,001 -$179,285:</b> $8,700 plus 17c for each $1 over $125,000</li>
                                        <li><b>$179,286 and over:</b> 10% of your total repayment income</li>
                                    </ul>
                                </>
                            }
                            slotProps={{
                                popper: {
                                    modifiers: [
                                        {
                                            name: 'offset',
                                            options: {
                                                offset: [210, -90],
                                            },
                                        },
                                    ],
                                },
                            }}
                        >
                            <AiFillInfoCircle />
                        </HtmlTooltip>
                    </td>
                </tr>
            </thead>
            <tbody className="mortage-body">
                <tr>
                    <td>
                        Repayment Ammount
                    </td>
                    <td className={!monthlyPayment ? 'selected-val' : ''}>
                        {displayMoney(mortageData['montlyRepaymentAmmount'])}
                    </td>
                    <td className={monthlyPayment ? 'selected-val' : ''}>
                        {displayMoney(mortageData['weeklyRepaymentAmmount'])}
                    </td>
                </tr>
                <tr>
                    <td>
                        Loan Paid Off In Years
                    </td>
                    <td className={!monthlyPayment ? 'selected-val' : ''}>
                        {mortageData['loanTerm']}
                    </td>
                    <td className={monthlyPayment ? 'selected-val' : ''}>
                        {mortageData['weeklyPayedOffIn']}
                    </td>
                </tr>
                <tr>
                    <td>
                        Time Saved (years)
                    </td>
                    <td>
                        {'-'}
                    </td>
                    <td className={monthlyPayment ? 'selected-val' : ''}>
                        {mortageData['weeklyTimeSaved']}
                    </td>
                </tr>
                <tr>
                    <td>
                        Total Repayments
                    </td>
                    <td className={!monthlyPayment ? 'selected-val' : ''}>
                        {displayMoney(mortageData['monthlyTotalRepayments'])}
                    </td>
                    <td className={monthlyPayment ? 'selected-val' : ''}>
                        {displayMoney(mortageData['weeklyTotalRepayments'])}
                    </td>
                </tr>
                <tr>
                    <td>
                        Total Interest Paid
                    </td>
                    <td className={!monthlyPayment ? 'selected-val' : ''}>
                        {displayMoney(mortageData['monthlyTotalInterest'])}
                    </td>
                    <td className={monthlyPayment ? 'selected-val' : ''}>
                        {displayMoney(mortageData['weeklyTotalInterest'])}
                    </td>
                </tr>
                <tr>
                    <td>
                        Total Interest Savings over the loan term
                    </td>
                    <td>
                        {'-'}
                    </td>
                    <td className={monthlyPayment ? 'selected-val' : ''}>
                        {displayMoney(mortageData['weeklyInterestSavings'])}
                    </td>
                </tr>
                <tr>
                    <td>
                        Annual Interest Savings
                    </td>
                    <td>
                        {'-'}
                    </td>
                    <td className={monthlyPayment ? 'selected-val' : ''}>
                        {displayMoney(mortageData['weeklyAnnualInterestSavings'])}
                    </td>
                </tr>
            </tbody>
        </table>
    )
}