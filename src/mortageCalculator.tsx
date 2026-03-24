import { displayMoney, round, PMT, NPER, HtmlTooltip } from './functions';
import useToggle from './hooks/useToggle'
import { useState, useMemo } from 'react'
import { IncomeTable, ToggleExpandVerticalTab, MortageRepaymentTable, DropdownTab } from './dropdown'
import { InputField, SelectField } from './forms'
import { SwitchToggle } from './buttons'

export default function MortageCalculator() {
    const [mortageLoanAmmount, setMortageLoanAmmount] = useState(500000);
    const [mortageInterestRate, setMortageInterestRate] = useState(5.25);
    const [mortageTerm, setMortageTerm] = useState(20);
    const [mortagePayFreq, setMortagePayFreq] = useToggle();
    // const [hasMortage, setHasMortage] = useToggle();

    function calculateMortage(loanAmmount: number, loanInterestRate: number, loanTerm: number) {
        const adjustedInterestRate = loanInterestRate / 100;
        const montlyRepaymentAmmount = round(-PMT(adjustedInterestRate / 12, loanTerm * 12, -loanAmmount), 2);
        const weeklyRepaymentAmmount = round(montlyRepaymentAmmount / 4, 2);
        const weeklyPayedOffIn = round(NPER(adjustedInterestRate / 52, weeklyRepaymentAmmount, -loanAmmount) / 52, 2);
        const weeklyTimeSaved = round(loanTerm - weeklyPayedOffIn, 2);
        const monthlyTotalRepayments = round(montlyRepaymentAmmount * loanTerm * 12, 2);
        const weeklyTotalRepayments = round(weeklyRepaymentAmmount * NPER(adjustedInterestRate / 52, weeklyRepaymentAmmount, -loanAmmount), 2);
        const monthlyTotalInterest = round(monthlyTotalRepayments - loanAmmount, 2);
        const weeklyTotalInterest = round(weeklyTotalRepayments - loanAmmount, 2);
        const weeklyInterestSavings = round(monthlyTotalInterest - weeklyTotalInterest, 2);
        const weeklyAnnualInterestSavings = round(weeklyInterestSavings / weeklyPayedOffIn, 2);
        return (
            {
                'loanTerm': loanTerm,
                'montlyRepaymentAmmount': montlyRepaymentAmmount,
                'weeklyRepaymentAmmount': weeklyRepaymentAmmount,
                'weeklyPayedOffIn': weeklyPayedOffIn,
                'weeklyTimeSaved': weeklyTimeSaved,
                'monthlyTotalRepayments': monthlyTotalRepayments,
                'weeklyTotalRepayments': weeklyTotalRepayments,
                'monthlyTotalInterest': monthlyTotalInterest,
                'weeklyTotalInterest': weeklyTotalInterest,
                'weeklyInterestSavings': weeklyInterestSavings,
                'weeklyAnnualInterestSavings': weeklyAnnualInterestSavings
            }
        )
    }
    const mortageData = useMemo(() => {
        const mortageData = calculateMortage(mortageLoanAmmount, mortageInterestRate, mortageTerm);
        return mortageData
    }, [mortageLoanAmmount, mortageInterestRate, mortageTerm, mortagePayFreq])
    return (
        <div id='payroll-options'>
            <div style={{ background: 'black' }}>
                <div style={{ padding: '20px 20px 0px 20px' }}>
                    <p style={{ color: 'var(--hive-yellow)', margin: '0px', fontSize: '20px' }}>Recruitment Hive offers Monthly & Weekly payroll options.</p>
                    <p><a id='payroll-button' href='https://www.recruitmenthive.com.au/payroll-operations/' target='_blank'>View our Payroll Options here</a></p>
                    <p style={{ color: 'var(--hive-yellow)', textAlign: 'left', margin: '0px 20px' }}><b>"Accelerated" repayments</b> allow you to repay your mortage weekly, saving <b>time</b> and <b>money</b>. Hive's Weekly pay option can help you make these weekly repayments. See below how much you can save.</p>
                </div>
                <div style={{ padding: '0px 20px 5px 20px' }}>
                    <div id='mortage-dropdown'>
                        <div id='mortage-input'>
                            <InputField
                                textColour='white'
                                headerColour='var(--dark-grey)'
                                backgroundColour='var(--dark-grey)'
                                label={"Loan Ammount"}
                                id='mortage-loan-ammount'
                                value={mortageLoanAmmount}
                                setFunc={(val) => { setMortageLoanAmmount(val); }}
                                styling='medium'
                                formatting={'monetary'}
                                rounding={2}
                                min={0}
                                max={null}
                                lock={false}
                            />
                            <InputField
                                textColour='white'
                                headerColour='var(--dark-grey)'
                                backgroundColour='var(--dark-grey)'
                                label={"Annual Interest Rate"}
                                id='mortage-loan-ammount'
                                value={mortageInterestRate}
                                setFunc={(val) => { setMortageInterestRate(val); }}
                                styling='medium'
                                formatting={'percentage'}
                                rounding={2}
                                min={0}
                                max={null}
                                lock={false}
                            />
                            <InputField
                                textColour='white'
                                headerColour='var(--dark-grey)'
                                backgroundColour='var(--dark-grey)'
                                label={"Loan Term (years)"}
                                id='mortage-loan-ammount'
                                value={mortageTerm}
                                setFunc={(val) => { setMortageTerm(val); }}
                                styling='medium'
                                formatting={'number'}
                                rounding={2}
                                min={0}
                                max={null}
                                lock={false}
                            />
                            <SwitchToggle
                                dropdown={false}
                                label="Accelerated repayments"
                                description={''}
                                setFunc={setMortagePayFreq}
                                infoTag={null}
                            />
                        </div>
                        <MortageRepaymentTable mortageData={mortageData} monthlyPayment={mortagePayFreq} />
                    </div>
                </div>
            </div>

        </div>
    )
}