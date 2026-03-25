import './forms.css'
import { displayMoney, displayPercentage } from './functions';
import React, { useState, useEffect } from 'react';
type InputProps = {
    id: string;
    label: string;
    value: any;
    setFunc: (val: any) => void;
    styling: string;
    formatting: string;
    rounding: number;
    min: number;
    max: number | null;
    headerColour: string;
    backgroundColour: string;
    textColour: string;
    lock: boolean;
}
type SelectProps = {
    id: string;
    label: string;
    value: any;
    setFunc: (val: any) => void;
    items: Record<string, string>;
    styling: string;
    headerColour: string;
    backgroundColour: string;
    textColour: string;
}



export function InputField({ id, label, value, setFunc, styling, formatting, min, max, headerColour, backgroundColour, textColour, lock }: InputProps) {
    const internalLabel = id.toLowerCase().replace(" ", "-");
    const [inputValue, setInputValue] = useState<string>(String(value));

    // Formatting logic
    const getFormattingFunction = () => {
        if (formatting === 'monetary') return displayMoney;
        if (formatting === 'percentage') return displayPercentage;
        return null;
    };
    const formattingFunction = getFormattingFunction();

    useEffect(() => {
        setInputValue(formattingFunction !== null ? formattingFunction(value) : String(value));
    }, [value]);

    // Shared logic to "Commit" the value
    const commitValue = () => {
        let numericValue = parseFloat(inputValue.replace(/[^\d.-]/g, '')); // Strip symbols for parsing

        if (isNaN(numericValue)) {
            numericValue = 0;
        }

        let finalValue = numericValue;
        if (max !== null && finalValue > max) finalValue = max;
        if (min !== null && finalValue < min) finalValue = min;

        setFunc(finalValue);
        setInputValue(formattingFunction !== null ? formattingFunction(finalValue) : String(finalValue));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            commitValue();
            // Optional: Remove focus from the input after pressing Enter
            (e.target as HTMLInputElement).blur();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/[^\d.]/g, '');
        const parts = val.split('.');
        const cleanVal = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : val;
        setInputValue(cleanVal);
    };

    return (
        <div className={`${styling}-form-box ${internalLabel}`} style={{ backgroundColor: backgroundColour }}>
            <div style={{ backgroundColor: headerColour }} className={`${styling}-form-box-header ${internalLabel}`}>
                <p style={{ color: textColour }}>{label}</p>
            </div>
            <input
                type="text"
                id={`${internalLabel}-input`}
                className={`${styling}-form ${internalLabel}`}
                value={inputValue}
                style={lock ? { color: 'var(--hive-yellow)', pointerEvents: 'none' } : { color: textColour }}
                onChange={lock ? () => null : handleChange}
                onBlur={lock ? () => null : commitValue} // Use the same shared logic
                onKeyDown={lock ? () => null : handleKeyDown} // Listen for Enter key
                onFocus={lock ? () => null : (() => setInputValue(String(value)))}
            />
        </div>
    );
}

export function SelectField({ id, label, value, setFunc, items, styling, headerColour, backgroundColour, textColour }: SelectProps) {
    const internalLabel = id.toLowerCase().replace(" ", "-")
    return (
        <div className={styling + '-form-box ' + internalLabel} style={{ backgroundColor: backgroundColour }}>
            <div style={{ backgroundColor: headerColour }} className={styling + '-form-box-header ' + internalLabel}>
                <p style={{ color: textColour }}>{label}</p>
            </div>
            <select
                id={internalLabel + "-input"}
                className={styling + '-form ' + internalLabel}
                value={value}
                onChange={(e) => setFunc(e.target.value)}
            >
                {Object.entries(items).map(([key, value]) => (
                    <option value={value}>{key}</option>
                ))}
            </select>
        </div>
    )
}