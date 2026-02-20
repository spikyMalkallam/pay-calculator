import './buttons.css'

type SwitchProps = {
    label: string;
    description: string;
    setFunc: () => void;
    infoTag: any;
};

export function SwitchToggle({ label, description, setFunc, infoTag }: SwitchProps) {
    return (
        <table>
            <tbody>
                <tr>
                    <td rowSpan={2}>
                        <label className="switch">
                            <input type="checkbox" onClick={setFunc}></input>
                            <span className="slider round"></span>
                        </label>
                    </td>

                    <td className='switch-title'>
                        <span>{label}</span> {infoTag}
                    </td>
                </tr>
                <tr>
                    <td className='switch-desc'>
                        <span>{description}</span>
                    </td>
                </tr>
            </tbody >
        </table >
    )
}