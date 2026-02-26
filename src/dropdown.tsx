import { useState } from "react";
import './dropdown.css'
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import useToggle from "./hooks/useToggle";
import { SwitchToggle } from './buttons'
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

type DropdownProps = {
    label: string;
    contents: any;
    subContents: any;
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
}

export function DropdownTab({ label, contents, subContents }: DropdownProps) {
    const [expanded, setExpanded] = useToggle()

    return (
        <>
            <div className={'dropdown row-drop ' + label} style={{ display: 'flex' }}>
                <button
                    className={'dropdown-button' + (expanded ? " expanded" : '')}
                    onClick={setExpanded}
                >
                    {expanded ? <AiOutlineDown /> : <AiOutlineUp />}
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
            <div className={'dropdown' + ' ' + label}> {<DropdownTab label='' contents={contents} subContents={contents} />}</div >
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
                                <div className="dropdown-label">{(expanded ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />)} {label}</div>
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

export function IncomeTable({ items, totals, oldTax }: IncomeProps) {
    return (
        <table className="income-table">
            <thead >
                <tr className="income-table-header">
                    <td>
                        Component
                    </td>
                    <td>
                        Weekly
                    </td>
                    <td>
                        Fortnightly
                    </td>
                    <td>
                        Monthly
                    </td>
                    <td>
                        Annually
                    </td>
                </tr>
            </thead>
            <tbody>
                <td colSpan={5}>
                    {Object.entries(items).map(([key, value]: [string, any]) => {
                        let row = value[0]
                        let subrows = value[1]
                        let renderedSubRows = Object.entries(subrows).map(([key, subValue]: [string, any]) => {
                            if (subValue != null) {
                                return (
                                    <table className="sub-sub-table-header">
                                        <tbody>
                                            <tr key={key} className={"income-table-category"}>
                                                <td>
                                                    <div className={"income-table-name"}><div className={"coloured-dot-" + key.replace(" ", "").replace('#', '')}></div>{(key[0] == '#' ? key.split('#')[1] : key)}</div>
                                                </td>
                                                <td>
                                                    <div className={"income-table-category"}>{subValue[1]}</div>
                                                </td>
                                                <td>
                                                    <div className={"income-table-category"}>{subValue[2]}</div>
                                                </td>
                                                <td>
                                                    <div className={"income-table-category"}>{subValue[3]}</div>
                                                </td>
                                                <td>
                                                    <div className={"income-table-category"}>{subValue[4]}</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                )
                            }
                            console.log(subValue)
                        })
                        console.log(renderedSubRows)
                        return (
                            <DropdownTab label="row-drop"
                                contents={
                                    <table className="sub-table-header">
                                        <tbody>
                                            <tr key={key} className={"income-table-header-category"}>
                                                <td>
                                                    <div className={"income-table-header-name"}><div className={"coloured-dot-" + key.replace(" ", "").replace('#', '')}></div>{(key[0] == '#' ? key.split('#')[1] : key)}</div>
                                                </td>
                                                <td>
                                                    <div className={"income-table-header-category"}>{oldTax !== undefined && oldTax.length > 0 && key == '#Total Taxes' ? (<><del>{oldTax[1]}</del><br></br> {row[1]}</>) : row[1]}</div>
                                                </td>
                                                <td>
                                                    <div className={"income-table-header-category"}>{oldTax !== undefined && oldTax.length > 0 && key == '#Total Taxes' ? (<><del>{oldTax[2]}</del><br></br> {row[2]}</>) : row[2]}</div>
                                                </td>
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
                <tr className="income-table-takehome-row">
                    <td className="income-table-takehome-label">Take-home pay</td>
                    <td className="income-table-takehome-cell">{totals[1]}</td>
                    <td className="income-table-takehome-cell">{totals[2]}</td>
                    <td className="income-table-takehome-cell">{totals[3]}</td>
                    <td className="income-table-takehome-cell">{totals[4]}</td>
                </tr>
            </tbody>
        </table>
    )
}