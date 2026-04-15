import { round, PMT, NPER } from './functions';
// import useToggle from './hooks/useToggle'
import { useState, useMemo } from 'react'
import { MortageRepaymentTable } from './dropdown'
import { InputField } from './forms'
// import { SwitchToggle } from './buttons'
import './homeLoanCalculator.css'

export default function HomeLoanCalculator() {
    // 1. Define the function to report the height
    const notifyParent = () => {
        // 1. Temporarily allow the body to shrink to 0 to find the 'true' content height
        document.body.style.height = '0px';
        // 2. Measure the height of the actual content wrapper
        // Use a specific wrapper div ID if possible for better accuracy
        const height = document.body.scrollHeight;
        // 3. Reset the body height so it can grow again
        document.body.style.height = 'auto';
        window.parent.postMessage({ frameHeight: height }, '*');
        // console.log("Child: " + height);
    };

    // 2. Create the Observer
    const resizeObserver = new ResizeObserver(() => {
        notifyParent();
    });

    // 3. Start observing the body or a specific wrapper
    resizeObserver.observe(document.body);
    const [mortageLoanAmmount, setMortageLoanAmmount] = useState(1000000);
    const [mortageInterestRate, setMortageInterestRate] = useState(6);
    const [mortageTerm, setMortageTerm] = useState(30);
    const [hourlyRate, setHourlyRate] = useState(100);
    // const [mortagePayFreq, setMortagePayFreq] = useToggle();
    const mortagePayFreq = true;
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

        const yearlyFee = (hourlyRate * 1976) * 0.01;
        const totalFeeSum = yearlyFee * weeklyPayedOffIn;
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
                'weeklyAnnualInterestSavings': weeklyAnnualInterestSavings,
                'yearlyFee': yearlyFee,
                'totalFeeSum': totalFeeSum
            }
        )
    }
    const mortageData = useMemo(() => {
        const mortageData = calculateMortage(mortageLoanAmmount, mortageInterestRate, mortageTerm);
        return mortageData
    }, [mortageLoanAmmount, mortageInterestRate, mortageTerm, mortagePayFreq, hourlyRate])
    return (
        <div id='payroll-options'>
            <div >
                {/* <div style={{ padding: '20px 20px 0px 20px' }}>
                    <p style={{ color: 'black', margin: '0px', fontSize: '20px' }}>Recruitment Hive offers Monthly & Weekly payroll options.</p>
                    <p><a id='payroll-button' href='https://www.recruitmenthive.com.au/payroll-operations/' target='_blank'>View our Payroll Options here</a></p>
                    <p style={{ color: 'black', textAlign: 'left', margin: '0px 20px' }}><b>"Accelerated" repayments</b> allow you to repay your mortage weekly, saving <b>time</b> and <b>money</b>. Hive's Weekly pay option can help you make these weekly repayments. See below how much you can save.</p>
                </div> */}
                <div style={{ padding: '0px 20px 5px 20px' }}>
                    <div id='mortage-dropdown'>
                        <div id='mortage-input'>
                            <InputField
                                textColour='white'
                                headerColour='var(--hive-yellow)'
                                backgroundColour='rgba(151, 151, 151)'
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
                                headerColour='var(--hive-yellow)'
                                backgroundColour='rgba(151, 151, 151)'
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
                            <InputField
                                textColour='white'
                                headerColour='var(--hive-yellow)'
                                backgroundColour='rgba(151, 151, 151)'
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

                            {/* <SwitchToggle
                                dropdown={false}
                                label="Accelerated repayments"
                                description={''}
                                setFunc={setMortagePayFreq}
                                infoTag={null}
                            /> */}
                        </div>
                        <br></br>
                        <div id='salary-box'>
                            <InputField
                                textColour='white'
                                headerColour='var(--hive-yellow)'
                                backgroundColour='rgba(151, 151, 151)'
                                label={"Hourly Rate (including super)"}
                                id='hourly-rate'
                                value={hourlyRate}
                                setFunc={(val) => { setHourlyRate(val); }}
                                styling='medium'
                                formatting={'monetary'}
                                rounding={2}
                                min={0}
                                max={null}
                                lock={false}
                            />
                            <p style={{ fontSize: '17px' }}><i>Recruitment Hive's weekly pay has a 1% fee (Monthly Pay has no fee)</i></p>

                        </div>
                        <MortageRepaymentTable mortageData={mortageData} monthlyPayment={mortagePayFreq} />
                        <br></br>

                    </div>
                </div>
            </div>

        </div>
    )
}