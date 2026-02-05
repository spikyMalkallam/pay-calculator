import './forms.css'

type InputProps = {
    id: string;
    label: string;
    inputType: string
    value: any;
    setFunc: (val: any) => void;
    styling: string;
}
type SelectProps = {
    id: string;
    label: string;
    value: any;
    setFunc: (val: any) => void;
    items: Record<string, string>;
    styling: string;
}

export function InputField({ id, label, inputType, value, setFunc, styling }: InputProps) {
    const internalLabel = id.toLowerCase().replace(" ", "-")
    return (
        <div className={styling + '-form-box ' + internalLabel}>
            <div className={styling + '-form-box-header ' + internalLabel}>
                <p>{label}</p>
            </div>
            <input
                type={inputType}
                id={internalLabel + "-input"}
                className={styling + '-form ' + internalLabel}
                value={value}
                onChange={(e) => {
                    const val = Number(e.target.value);
                    setFunc(val);
                }}
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