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
            <div className={'dropdown row-drop ' + label + (expanded ? " open" : '')} style={{ display: 'flex' }} onClick={setExpanded}>
                <button
                    className={'dropdown-button ' + (expanded ? "expanded " : '') + label}
                    style={{ backgroundColor: colour }}
                >
                    {expanded ? <AiFillCaretDown /> : <AiFillCaretUp />}
                </button>
                <div className={'dropdown-contents-div ' + (expanded ? "expanded " : '') + label} style={{ flexGrow: 1, backgroundColor: colour }}>{contents}</div>
            </div>
            <div className={'dropdown-subdiv ' + (expanded ? "expanded " : '') + label} onClick={() => !expanded ? setExpanded() : () => null}>
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
                                            <div className={'dropdown row-drop '} style={{ display: 'flex' }}>
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
                                    <td className="income-table-takehome label">Pay</td>
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
                    <td colSpan={4} >
                        Your Home Loan Repayments
                    </td>
                    {/* <td className={!monthlyPayment ? 'selected-freq' : 'unselected-freq'}>
                        Monthly
                    </td>
                    <td className={monthlyPayment ? 'selected-freq' : 'unselected-freq'}>
                        Weekly
                    </td> */}
                </tr>
            </thead>
            <tbody className="mortage-body">

                <tr>
                    <td style={{ borderLeft: '2px solid var(--hive-yellow)' }}>
                        <span style={{ fontSize: '20px', fontWeight: '600' }}>Monthly</span>
                        <div className="value">{displayMoney(mortageData['montlyRepaymentAmmount'])}</div>
                    </td>
                    <td style={{ borderRight: '2px solid var(--hive-yellow)' }}>
                        Loan Duration
                        <div className="value">{mortageData['loanTerm']} years</div>
                        {/* {displayMoney(mortageData['montlyRepaymentAmmount'])} */}
                    </td>
                    <td>
                        <span style={{ fontSize: '20px', fontWeight: '600' }}>Weekly</span>
                        <div className="value">{displayMoney(mortageData['weeklyRepaymentAmmount'])}</div>
                    </td>
                    <td className={!monthlyPayment ? 'selected-val' : ''}>
                        Loan Duration
                        <div className="value" style={{ color: "var(--hive-yellow)" }}>{mortageData['weeklyPayedOffIn']} years</div>
                        {/* {displayMoney(mortageData['montlyRepaymentAmmount'])} */}
                    </td>
                </tr>
                {/* <tr>
                    <td>
                        Loan Paid Off In Years
                    </td>
                    <td className={!monthlyPayment ? 'selected-val' : ''}>
                        {mortageData['loanTerm']}
                    </td>
                    <td className={monthlyPayment ? 'selected-val' : ''}>
                        {mortageData['weeklyPayedOffIn']}
                    </td>
                </tr> */}
                <tr>
                    <td style={{ borderLeft: '2px solid var(--hive-yellow)' }}>
                        Total loan Repayments
                        <div className="value">{displayMoney(mortageData['monthlyTotalRepayments'])}</div>
                    </td>
                    <td style={{ borderRight: '2px solid var(--hive-yellow)' }}>
                        Total interest charged
                        <div className="value" >  {displayMoney(mortageData['monthlyTotalInterest'])}</div>
                    </td>
                    <td>
                        Total loan Repayments
                        <div className="value" style={{ color: "var(--hive-yellow)" }}>{displayMoney(mortageData['weeklyTotalRepayments'])}</div>
                    </td>
                    <td>
                        Total interest charged
                        <div className="value" style={{ color: "var(--hive-yellow)" }}>  {displayMoney(mortageData['weeklyTotalInterest'])}</div>
                    </td>
                    {/* <td className={monthlyPayment ? 'selected-val' : ''}>
                        {mortageData['weeklyTimeSaved']} years
                    </td> */}
                </tr>
                <tr className="mortage-table-header">
                    <td colSpan={4} style={{ textAlign: 'center' }}>
                        Savings with Weekly
                    </td>
                </tr>
                <tr>
                    <td colSpan={4} >
                        <div id='benefits-box' >
                            <div className="sub-benefit-box">
                                <p>Time Saved</p>
                                <div style={{ color: "var(--hive-yellow)", fontSize: '28px', fontWeight: '600' }}>  {mortageData['weeklyTimeSaved'] + ' years'}</div>
                            </div>
                            <div className="sub-benefit-box">
                                <p>Annual Interest Savings</p>
                                <div style={{ color: "var(--hive-yellow)", fontSize: '28px', fontWeight: '600' }}>  {displayMoney(mortageData['weeklyAnnualInterestSavings'])}</div>
                            </div>
                            <div className="sub-benefit-box">
                                <p>Total Interest Savings</p>
                                <div style={{ color: "var(--hive-yellow)", fontSize: '28px', fontWeight: '600' }}>  {displayMoney(mortageData['weeklyInterestSavings'])}</div>
                            </div>
                        </div>
                    </td>
                </tr>

                {/* <tr>
                    <td>
                        Total Interest Paid
                    </td>
                    <td className={!monthlyPayment ? 'selected-val' : ''}>
                        {displayMoney(mortageData['monthlyTotalInterest'])}
                    </td>
                    <td className={monthlyPayment ? 'selected-val' : ''}>
                        {displayMoney(mortageData['weeklyTotalInterest'])}
                    </td>
                </tr> */}
                {/* <tr>
                    <td>
                        Total Interest Savings
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
                </tr> */}

            </tbody>
        </table >
    )
}