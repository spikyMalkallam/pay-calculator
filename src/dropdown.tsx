import { useState } from "react";
import './dropdown.css'
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import useToggle from "./hooks/useToggle";
import { SwitchToggle } from './buttons'

type DropdownProps = {
    label: string;
    contents: any;
    toggleFunc: () => void;
    openIcon: any;
    closeIcon: any;
}

type ToggleDropdownProps = {
    label: string;
    contents: any;
    toggleFunc: () => void;
    expandedVar: any;
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
    totals: number[];
}

export function DropdownTab({ label, contents, toggleFunc, openIcon, closeIcon }: DropdownProps) {
    const [expanded, setExpanded] = useToggle()

    return (
        <>
            <div className={'dropdown' + ' ' + label}> <button className={'dropdown-button' + (expanded ? " expanded" : '') + ' ' + label} onClick={() => { toggleFunc(); setExpanded(); }}>{expanded ? closeIcon : openIcon}</button>{label}</div>
            <div className={'dropdown-subdiv' + (expanded ? " expanded" : '') + ' ' + label}>
                {contents}
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

export function ToggleDropdownTab({ label, contents, toggleFunc, expandedVar }: ToggleDropdownProps) {
    return (
        <>
            <div className={'dropdown' + ' ' + label}> {<SwitchToggle
                label={label}
                description=''
                setFunc={toggleFunc}
            />}</div >
            <div className={'dropdown-subdiv' + (expandedVar ? " expanded" : '') + ' ' + label}>
                {contents}
            </div>
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

export function IncomeTable({ label, items, totals }: IncomeProps) {
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

                {Object.entries(items).map(([key, value]: [string, any]) => {
                    if (value != null) {
                        return (
                            <tr key={key} className={"income-table" + (key[0] == '#' ? '-header' : '') + "-category"}>
                                <td>

                                    <div className={"income-table" + (key[0] == '#' ? '-header' : '') + "-name"}><div className={"coloured-dot-" + key.replace(" ", "").split("#")[1]}></div>{(key[0] == '#' ? key.split('#')[1] : key)}</div>
                                </td>
                                <td>
                                    <div className={"income-table" + (key[0] == '#' ? '-header' : '') + "-category"}>{typeof value[1] == 'number' ? '$' + value[1] : value[1]}</div>
                                </td>
                                <td>
                                    <div className={"income-table" + (key[0] == '#' ? '-header' : '') + "-category"}>{typeof value[2] == 'number' ? '$' + value[2] : value[2]}</div>
                                </td>
                                <td>
                                    <div className={"income-table" + (key[0] == '#' ? '-header' : '') + "-category"}>{typeof value[3] == 'number' ? '$' + value[3] : value[3]}</div>
                                </td>
                                <td>
                                    <div className={"income-table" + (key[0] == '#' ? '-header' : '') + "-category"}>{typeof value[4] == 'number' ? '$' + value[4] : value[4]}</div>
                                </td>
                            </tr>
                        )
                    }
                })
                }
                <tr className="income-table-takehome-row">
                    <td className="income-table-takehome-label">Take-home pay</td>
                    <td className="income-table-takehome-cell">{'$' + totals[1] + label}</td>
                    <td className="income-table-takehome-cell">{'$' + totals[2]}</td>
                    <td className="income-table-takehome-cell">{'$' + totals[3]}</td>
                    <td className="income-table-takehome-cell">{'$' + totals[4]}</td>
                </tr>
            </tbody>
        </table>
    )
}