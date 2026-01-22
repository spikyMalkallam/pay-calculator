import { useState } from "react";
import './dropdown.css'
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

type Props = {
    label: string;
    total: number;
    items: Record<string, number>;
};

export default function DropdownInformation({ label, total, items }: Props) {
    const [expanded, setExpanded] = useState(false)

    return (
        <>
            <div className="dropdown-container" onClick={() => setExpanded(!expanded)}>
                <table className="dropdown-header">
                    <tbody>
                        <tr>
                            <td>
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
                {/* <div className="dropdown-label">
                    {(expanded ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />)} {label}
                </div> */}

                <div className={`dropdown-details ${expanded ? 'expanded' : ''}`}>

                    <table className="dropdown-sub-rows">
                        <tbody>
                            {Object.entries(items).map(([key, value]) => (
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
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    )
}