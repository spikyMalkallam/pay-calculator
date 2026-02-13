import './forms.css'
import { displayMoney } from './functions';
type InputProps = {
    id: string;
    label: string;
    value: any;
    setFunc: (val: any) => void;
    styling: string;
    monetary: boolean;
    rounding: number;
    min: number;
    max: number | null;
}
type SelectProps = {
    id: string;
    label: string;
    value: any;
    setFunc: (val: any) => void;
    items: Record<string, string>;
    styling: string;
}

export function InputField({ id, label, value, setFunc, styling, monetary, min, max }: InputProps) {
    const internalLabel = id.toLowerCase().replace(" ", "-");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        const selectionStart = input.selectionStart; // Capture cursor position
        let rawValue = input.value;

        function replaceAt(string: string, index: number): string {
            let replacement = string.substring(index, index + 1);
            console.log(string.substring(0, index + 1) + replacement + string.substring(index + 1 + replacement.length))
            return string.substring(0, index) + replacement + string.substring(index + 1 + replacement.length);
        }

        // 1. Filter characters
        rawValue = rawValue.replace(/[^\d.]/g, '');
        // console.log(rawValue);
        // 2. Handle multiple decimals
        const parts = rawValue.split('.');
        if (parts.length > 2) {
            rawValue = parts[0] + '.' + parts.slice(1).join('');
        }
        else if (parts.length == 2) {
            rawValue = parts[0] + '.' + parts[1].substring(0, 2);
        }
        // 3. Logic for numeric conversion 
        // NOTE: If you use .toFixed() here, it returns a string. 
        // If setFunc expects a number, use parseFloat().
        const numericValue = parseFloat(rawValue);
        let finalValue = isNaN(numericValue) ? 0 : numericValue;

        if (!monetary) {
            if (selectionStart !== null) {
                finalValue = Number(replaceAt(String(finalValue), selectionStart - 1));
            }
        }
        // Cap values
        if (max !== null) {
            if (Number(finalValue) > max) {
                finalValue = max;
            }
        }
        else if (Number(finalValue) < min) {
            finalValue = min;
        }
        // const formatted = new Intl.NumberFormat().format(Number(finalValue))
        setFunc(finalValue);

        // 4. Restore Cursor Position
        // We use requestAnimationFrame to wait for the next render cycle
        requestAnimationFrame(() => {
            if (selectionStart !== null) {
                input.setSelectionRange(selectionStart, selectionStart);
            }
        });
    };

    return (
        <div className={`${styling}-form-box ${internalLabel}`}>
            <div className={`${styling}-form-box-header ${internalLabel}`}>
                <p>{label}</p>
            </div>
            <input
                type="text"
                id={`${internalLabel}-input`}
                className={`${styling}-form ${internalLabel}`}
                // 4. Format the display only: Add $ and commas for the user
                value={(monetary ? displayMoney(value) : value)}
                onChange={handleChange}
            />
        </div>
    )
}

export function SelectField({ id, label, value, setFunc, items, styling }: SelectProps) {
    const internalLabel = id.toLowerCase().replace(" ", "-")
    return (
        <div className={styling + '-form-box ' + internalLabel}>
            <div className={styling + '-form-box-header ' + internalLabel}>
                <p>{label}</p>
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