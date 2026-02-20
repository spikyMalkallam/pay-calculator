import { useState, useMemo } from 'react'
import './App.css'
import { IncomeTable, ToggleDropdownTab } from './dropdown'
import useToggle from './hooks/useToggle'
import { InputField, SelectField } from './forms'
import { SwitchToggle } from './buttons'
import { TaxBandBar } from './graphs';
import PayrollPieChart from './graphs';
import { displayMoney } from './functions';
import Tooltip, { type TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { AiFillInfoCircle } from "react-icons/ai";

function App() {
  function round(num: number, fractionDigits: number): number {
    return Number(num.toFixed(fractionDigits));
  }
  function stringToNumFreq(freq: string): number {
    switch (freq) {
      case "Annual": {
        return 1;
      }
      case "Monthly": {
        return 12;
      }
      case "Fortnightly": {
        return 26;
      }
      case "Weekly": {
        return 52;
      }
      case "Daily": {
        return 365;
      }
      default: {
        return 0
      }

    }
  }
  const [salary, setSalary] = useState(40.00)
  // 0: 1: 2: 3: 4: 5: 6:
  const [payCycle, setPayCycle] = useState('Hourly')
  const [salaryIncludesSuper, setSalaryIncludesSuper] = useToggle()
  const [hasStudentLoan, setHasStudentLoan] = useToggle()
  const [bonus, setBonus] = useState(0)
  const [bonusFrequency, setBonusFrequency] = useState('Annual')
  // const [medicareLevy, setMedicareLevy] = useState(0)
  const [hasPretaxDeduction, setHasPretaxDeduction] = useToggle()
  const [pretaxDeductionAmount, setPretaxDeductionAmount] = useState(0)
  const [hasBonus, setHasBonus] = useToggle()
  const [pretaxSavings, setPretaxSavings] = useState('')
  // const [bonusTax, setBonusTax] = useState(0)
  // const [incomeTax, setIncomeTax] = useState(0)
  // const [hasPartTimeHours, setHasPartTimeHours] = useToggle()
  const twentyTwoTwentySix = { 18200: [0.16, 0], 45000: [0.30, 4288], 135000: [0.37, 31288], 190000: [0.45, 51638] }
  const studentTwentyFiveTwentySix = { 67000: [0.15, 0], 125000: [0.17, 8700], 179286: [0.1, 17928] }
  const taxRates = { "2226": twentyTwoTwentySix }
  const studentRates = { "2526": studentTwentyFiveTwentySix }
  const [dailyHours, setDailyHours] = useState(7.6);
  const [daysPerPeriod, setDaysPerPeriod] = useState(5);
  const [hoursPeriod, setHoursPeriod] = useState('Week');
  let superPercentage = 12.00;
  function calculateSalaryPeriods(rate: number, period: string, hours: number[]) {
    let hourlyRate = 0;
    let dailyRate = 0;

    let weeklyRate = 0;
    let fortnightlyRate = 0;
    let monthlyRate = 0;
    let annualRate = 0;
    if (period == 'Hourly') {
      hourlyRate = rate;
    }
    if (period == 'Daily') {
      hourlyRate = rate / hours[0];
    }
    if (period == 'Weekly') {
      hourlyRate = rate / hours[1];
    }
    else if (period == 'Fortnightly') {
      hourlyRate = rate / hours[2];
    }
    else if (period == 'Monthly') {
      hourlyRate = rate / hours[3];
    }
    else if (period == 'Annual') {
      hourlyRate = rate / hours[4];
    }
    dailyRate = round(hourlyRate * hours[0], 2);
    weeklyRate = round(hourlyRate * hours[1], 2);
    fortnightlyRate = round(hourlyRate * hours[2], 2);
    monthlyRate = round(hourlyRate * hours[3], 2);
    annualRate = round(hourlyRate * hours[4], 2);
    return [dailyRate, weeklyRate, fortnightlyRate, monthlyRate, annualRate];
  }

  function calculateYearlyHours(perDay: number, daysPer: number, period: string): number[] {
    let dailyHours = 0;
    let weeklyHours = 0;
    let fortnightlyHours = 0;
    let monthlyHours = 0;
    let yearlyHours = 0;
    // if (hasPartTimeHours == false) {
    //   return [7.6, 38, 76, 164.6666, 1976]
    // }
    if (period == 'Week') {
      dailyHours = perDay;
      weeklyHours = perDay * daysPer;
      fortnightlyHours = (perDay * daysPer) * 2;
      monthlyHours = (perDay * daysPer) * 4.3333;
      yearlyHours = (perDay * daysPer) * 52;
    }
    else if (period == 'Fortnight') {
      dailyHours = perDay;
      weeklyHours = (perDay * daysPer) / 2;
      fortnightlyHours = perDay * daysPer;
      monthlyHours = (perDay * daysPer) * 2.16665;
      yearlyHours = (perDay * daysPer) * 26;
    }
    else if (period == 'Month') {
      dailyHours = perDay;
      weeklyHours = (perDay * daysPer) / 4.3333;
      fortnightlyHours = (perDay * daysPer) / 2.16665;
      monthlyHours = perDay * daysPer;
      yearlyHours = (perDay * daysPer) * 12;
    }
    else if (period == 'Year') {
      dailyHours = perDay;
      weeklyHours = (perDay * daysPer) / 52;
      fortnightlyHours = (perDay * daysPer) / 26;
      monthlyHours = (perDay * daysPer) / 12;
      yearlyHours = perDay * daysPer;
    }

    return [dailyHours, weeklyHours, fortnightlyHours, monthlyHours, yearlyHours];
  }
  function splitTax(ammount: number, hours: number[]): number[] {
    let daily = round(ammount / (hours[4] / hours[0]), 2);
    daily = Number.isNaN(daily) ? 0 : daily;
    let weekly = round(ammount / (hours[4] / hours[1]), 2);
    weekly = Number.isNaN(weekly) ? 0 : weekly;
    let fortnightly = round(ammount / (hours[4] / hours[2]), 2);
    fortnightly = Number.isNaN(fortnightly) ? 0 : fortnightly;
    let monthly = round(ammount / (hours[4] / hours[3]), 2);
    monthly = Number.isNaN(monthly) ? 0 : monthly;
    return [daily, weekly, fortnightly, monthly, round(ammount, 2)]
  }
  function calculateTax(salary: number, superSum: number, taxBands: Record<number, number[]>, hours: number[]): any {
    let taxAmount = 0;
    let currentTaxRate = 0;
    let currentThreshold = 0;
    let grossEarnings = salary - (hasBonus ? bonus : 0); // Apply pre-tax here no seperate variable for pre-tax so we can compare with and without
    let lito = 0;
    let div293 = [0, 0, 0, 0, 0];
    let bandCount = 0;
    let incomeTax = 0;
    // Find the relevant band and calculate tax
    for (const [threshold, value] of Object.entries(taxBands)) {
      if (grossEarnings >= Number(threshold)) {
        // Add tax from lower brackets
        taxAmount = Number(value[1]);
        currentTaxRate = Number(value[0]);
        currentThreshold = Number(threshold);
        bandCount++;
        continue;
      }
      break;
    }
    // Calculate tax in current bracket
    taxAmount += (grossEarnings - currentThreshold) * currentTaxRate
    incomeTax = taxAmount;
    let incomeTaxSplit = splitTax(incomeTax, hours);
    // Division 293 tax
    if (grossEarnings + superSum > 250000) {
      let taxableAmmount = (grossEarnings + superSum) - 250000 > superSum ? superSum : (grossEarnings + superSum) - 250000;
      div293 = [0, 0, 0, 0, round(taxableAmmount * .15, 2)];
    }
    let medicareLevy = 0;
    // Medicare Levy
    if (grossEarnings > 18200) {
      medicareLevy = salary * 0.02
    }
    if (grossEarnings > 18200) {
      // Low Income Tax Offset
      // maximum offset of $700
      if (salary <= 37500) {
        lito = 700
      }
      // $700 minus 5 cents for every $1 above $37,500
      else if (salary > 37500 && salary <= 45000) {
        lito = 700 - ((salary - 37500) * 0.05);
      }
      // $325 minus 1.5 cents for every $1 above $45,000 
      else if (salary > 45000 && salary <= 66667) {
        lito = 325 - ((salary - 45000) * 0.015);
      }
    }
    taxAmount += medicareLevy;
    let totalTaxSplit = splitTax(taxAmount, hours);
    // Add LITO
    taxAmount += lito;
    let medicareSplit = splitTax(medicareLevy, hours);
    let litoSplit = null;
    if (lito != 0) {
      lito = round(lito, 2);
      litoSplit = [0, 0, 0, 0, -lito]
    }

    // Calculate bonus tax, using the below page:
    // https://www.ato.gov.au/tax-rates-and-codes/schedule-5-tax-table-for-back-payments-commissions-bonuses-and-similar-payments/working-out-the-withholding-amount
    let bonusTax = 0;
    if (hasBonus) {
      taxAmount += round(bonusTax, 2);
      // setBonusTax(bonusTax)
    }
    let adjustedSalary = grossEarnings + round(bonus / stringToNumFreq(bonusFrequency), 0)
    for (const [threshold, value] of Object.entries(taxBands)) {
      if (adjustedSalary >= Number(threshold)) {
        // Add tax from lower brackets
        bonusTax += Number(value[1]);
        currentTaxRate = Number(value[0]);
        currentThreshold = Number(threshold);
        continue;
      }

      // Calculate tax in current bracket
      bonusTax += (adjustedSalary - currentThreshold) * currentTaxRate
      break;
    }
    let taxDiff = (bonusTax - taxAmount) * stringToNumFreq(bonusFrequency);
    // Select the lesser
    bonus * 0.47 > taxDiff ? bonusTax = taxDiff : bonusTax = bonus * 0.47;

    // return taxAmount;
    return {
      'incomeTax': incomeTax,
      'LITO': lito,
      'medicare': medicareLevy,
      'HECS': 0,
      'div293': div293,
      'total': taxAmount,
      'totalTaxSplit': totalTaxSplit,
      'incomeTaxSplit': incomeTaxSplit,
      'medicareSplit': medicareSplit,
      'litoSplit': litoSplit

    }
  }
  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />))
    (({ theme }) => ({
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 550,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
      },
    }));
  function calculateStudentLoan(repaymentIncome: number, loanYear: Record<number, number[]>): number {
    let repaymentAmount = 0;
    let currentRepaymentRate = 0;
    let currentThreshold = 0;
    // Find the relevant band and calculate repayments
    // Highest bracket
    if (repaymentIncome >= 179286) {

      return repaymentIncome * 0.10;
    }
    for (const [threshold, value] of Object.entries(loanYear)) {
      if (repaymentIncome >= Number(threshold)) {
        // Add repayment from lower brackets
        repaymentAmount += Number(value[1]);
        currentRepaymentRate = Number(value[0]);
        currentThreshold = Number(threshold);
        continue;
      }

      // Calculate repayment in current bracket
      repaymentAmount += (repaymentIncome - currentThreshold) * currentRepaymentRate
      break;
    }
    return repaymentAmount;
  }

  // Add all components of the salary together
  const financialData = useMemo(() => {
    let yearlyHours = calculateYearlyHours(dailyHours, daysPerPeriod, hoursPeriod);
    let salaryPeriods = calculateSalaryPeriods(salary, payCycle, yearlyHours);
    let salarySum = salaryPeriods[4];
    let superSum = 0;
    let superSalary = salaryPeriods[4];
    // Calculate super ammount
    if (salaryIncludesSuper) {
      superSalary = round(superSalary / (1 + (superPercentage / 100)), 2);

      superSum = round(superSalary * (superPercentage / 100), 2);
      // Cap to concessional limit
      if (superSum > 30000) {
        superSum = 30000
        superSalary = salarySum - superSum;
      }
    }
    else {
      superSum = round((salarySum * (superPercentage / 100)), 2);

      // Cap to concessional limits
      if (superSum > 30000) {
        superSum = 30000
      }
    }
    // Add bonus
    if (hasBonus) {
      salarySum += Number(bonus);
    }
    // Student Loans
    let currentRepayments = hasStudentLoan ? calculateStudentLoan(salarySum, studentRates['2526']) : 0;
    let studentLoanContribution = [0, 0, 0, 0, currentRepayments];
    // setStudentLoanContribution(currentRepayments);

    // Tax
    let preTaxDeduct: number = hasPretaxDeduction ? Number(pretaxDeductionAmount) : 0;
    let currentTax = calculateTax(salaryPeriods[4] - preTaxDeduct, superSum, taxRates['2226'], yearlyHours);
    let undeductedTax: number[] = [];
    let taxDeductionDiff = [];
    if (hasPretaxDeduction) {
      undeductedTax = calculateTax(salaryPeriods[4], superSum, taxRates['2226'], yearlyHours)['totalTaxSplit'];
      taxDeductionDiff = currentTax['totalTaxSplit'].map((val: number, i: number) =>
        round(undeductedTax[i] - val, 2)
      );
      setPretaxSavings(displayMoney(taxDeductionDiff[4]))
      // console.log(pretaxSavings)
    }
    currentTax['HECS'] = currentRepayments;
    // LITO
    const adjustedLITO = Number(currentTax['LITO']) > Number(currentTax['totalTaxSplit'][4]) ? Number(currentTax['totalTaxSplit'][4]) : Number(currentTax['LITO']);

    currentTax['totalTaxSplit'][4] = Number(currentTax['totalTaxSplit'][4]) - adjustedLITO;
    // 293
    currentTax['totalTaxSplit'][4] = Number(currentTax['totalTaxSplit'][4]) + Number(currentTax['div293'][4]);
    let taxSplit: Record<string, number[]> = {
      "totalTax": currentTax['totalTaxSplit'],
      "incomeTax": currentTax['incomeTaxSplit'],
      "medicare": currentTax['medicareSplit'],
      "lito": currentTax['litoSplit'],
      '293': currentTax['div293']
    };
    // Remove Tax
    let postTaxPay: any[] = []
    for (let i = 0; i < 5; i++) {
      postTaxPay.push((round(salaryPeriods[i] - taxSplit["totalTax"][i], 2)).toFixed(2));
    }
    postTaxPay[4] = postTaxPay[4] - (hasPretaxDeduction ? pretaxDeductionAmount : 0);
    let superSplit = splitTax(superSum, yearlyHours);
    let taxableIncomePeriods = [];
    for (let i = 0; i < 5; i++) {
      taxableIncomePeriods.push(salaryPeriods[i]);
    }
    taxableIncomePeriods[4] = taxableIncomePeriods[4] - preTaxDeduct;
    if (hasBonus) {
      taxableIncomePeriods[4] += Number(bonus);
    }
    const basePay = postTaxPay[4] - (hasBonus ? Number(bonus) : 0);
    let payrollData = [{
      id: 'take-home',
      label: 'Pay',
      color: '#71972c',
      subCategories: [{ id: 'base-pay', label: 'Base Pay', value: Number(basePay), color: '#71972c' }],
    },
    {
      id: 'tax',
      label: 'Tax',
      color: '#ea9f21',
      subCategories: [{ id: 'income-tax', label: 'Income Tax', value: Number(taxSplit['incomeTax'][4]), color: '#ea9f21' }],
    },
    {
      id: 'super',
      label: 'Super',
      color: '#33a2c6',
      subCategories: [{ id: 'employer-cont', label: 'Employer contribution', color: '#33a2c6', value: Number(superSplit[4]) }],
    }]
    if (hasBonus) {
      payrollData[0].subCategories.push({ id: 'bonus', label: 'Bonus', value: Number(bonus), color: '#5f7e25' });
    }
    if (taxSplit['293'][4] > 0) {
      payrollData[1].subCategories.push({ id: '293', label: 'Division 293', value: Number(taxSplit['293'][4]), color: '#ea5a21' });
    }
    if (taxSplit['medicare'][4] > 0 && Number(taxSplit['incomeTax'][4]) - adjustedLITO > 0) {
      payrollData[1].subCategories.push({ id: 'medicare', label: 'Medicare Levy', value: Number(taxSplit['medicare'][4]), color: '#81d100' });
    }
    if (hasStudentLoan && currentTax['HECS'] > 0) {
      payrollData[1].subCategories.push({ id: 'student-loan', label: 'Student Loan', value: Number(currentTax['HECS']), color: '#d100b5' });
    }
    return {
      totalSalary: salaryPeriods[4],
      superAmount: superSum,
      taxValues: currentTax,
      postTax: postTaxPay,
      repayments: currentRepayments,
      yearlyHours: yearlyHours,
      taxablebaseSalarySplit: taxableIncomePeriods,
      baseSalarySplit: salaryPeriods,
      taxSplit: taxSplit,
      superSplit: superSplit,
      payrollData: payrollData,
      studentLoanContribution: studentLoanContribution,
      // bonusSplit: bonusPeriods
    };
  }, [salary, payCycle, bonus, hasBonus, superPercentage, salaryIncludesSuper, bonusFrequency, hasStudentLoan, dailyHours, daysPerPeriod, hoursPeriod, hasPretaxDeduction, pretaxDeductionAmount]);

  return (
    <>
      <div className='global-div'>
        <div id='income-div'>

          <table>
            {/* <thead>
              <tr>
                <td>
                  <div style={{ textAlign: 'center' }}>Enter your salary, adjust the settings and see the results in the summary below.</div>
                  <div style={{ textAlign: 'center', fontStyle: 'italic' }}>This calculator is an estimate</div>
                </td>
              </tr>
            </thead> */}
            <tbody>
              <tr className='big-table-row'>
                <td className='big-table-cell'>
                  <InputField
                    id='Salary'
                    label='Salary'
                    value={salary}
                    setFunc={(val) => { setSalary(val); }}
                    styling='large'
                    monetary={true}
                    rounding={2}
                    min={0}
                    max={null}
                  />
                  <SelectField
                    id="pay-cycle"
                    label="Pay Cycle"
                    value={payCycle}
                    setFunc={setPayCycle}
                    items={{
                      "Annually": "Annual",
                      "Monthly": "Monthly",
                      "Fortnightly": "Fortnightly",
                      "Weekly": "Weekly",
                      "Daily": "Daily",
                      "Hourly": "Hourly"
                    }}
                    styling='large'
                  />
                  {payCycle == 'Hourly' ?
                    <table className='dropdown-table'>
                      <tbody>
                        <tr>
                          <td>
                            <InputField
                              label='Hours per day'
                              id='work-hours'
                              value={dailyHours}
                              setFunc={setDailyHours}
                              styling='large'
                              monetary={false}
                              rounding={2}
                              min={0}
                              max={24}
                            />
                          </td>
                          <td>
                            <InputField
                              label='Days per'
                              id='days-per-period'
                              value={daysPerPeriod}
                              setFunc={setDaysPerPeriod}
                              styling='large'
                              monetary={false}
                              rounding={1}
                              min={0}
                              // max={null}
                              max={hoursPeriod == 'Week' ? 5 : (hoursPeriod == 'Fortnight' ? 10 : (hoursPeriod == 'Month' ? 23 : 276))}
                            />
                          </td>
                          <td>
                            <SelectField
                              label="Period"
                              id="week-or-fortnight"
                              value={hoursPeriod}
                              setFunc={setHoursPeriod}
                              items={{
                                "Week": "Week",
                                "Fortnight": "Fortnight",
                                "Month": "Month",
                                "Year": "Year",
                              }}
                              styling='large'
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    : null}
                  <div><SwitchToggle
                    label="Student loan"
                    description='HELP (HECS), VSL, TSL, SSL, SFSS'
                    setFunc={setHasStudentLoan}
                    infoTag={<HtmlTooltip
                      title={
                        <>
                          <b>Repayment brackets</b>
                          <ul style={{ 'textAlign': 'left' }}>
                            <li><b>$0 - $67,000:</b> Nil</li>
                            <li><b>$67,001 - $125,000:</b> 15c for each $1 over $67,000</li>
                            <li><b>$125,001 -$179,285:</b> $8,700 plus 17c for each $1 over $125,000</li>
                            <li><b>$179,286 and over:</b> 10% of your total repayment income</li>
                          </ul>
                        </>
                      }
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: 'offset',
                              options: {
                                offset: [210, -90],
                              },
                            },
                          ],
                        },
                      }}
                    >
                      <AiFillInfoCircle />
                    </HtmlTooltip>}
                  /></div>
                  <br></br>
                  <div>
                    <SwitchToggle
                      label="Salary includes Superannuation"
                      description={'Super Guarantee of $' + round(financialData['superAmount'], 0) + (salaryIncludesSuper ? ' is included in your $' : ' paid on top of your $') + round(financialData['totalSalary'], 0) + ' annual salary (12%)'}
                      setFunc={setSalaryIncludesSuper}
                      infoTag={null}
                    />

                  </div>
                  <h2 style={{ display: 'flex', justifyContent: 'center' }}><img src='https://www.recruitmenthive.com.au/wp-content/uploads/2026/01/recruitmentHive_H_small.svg' id="hive_logo" alt="Recruitment Hive logo" /> Hive Benefits</h2>
                  <ToggleDropdownTab
                    label='Novated Lease'
                    desc='Lease a car and pay it off before tax'
                    contents={<><table className='dropdown-table'>
                      <tbody>
                        <tr>
                          <td>
                            <InputField
                              label={"Deduction amount"}
                              id='pretax-deduction-amount'
                              value={pretaxDeductionAmount}
                              setFunc={(val) => { setPretaxDeductionAmount(val); }}
                              styling='large'
                              monetary={true}
                              rounding={2}
                              min={0}
                              max={null}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className='pretax-savings'>
                              {pretaxSavings} in income tax savings
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    </>}
                    toggleFunc={setHasPretaxDeduction}
                    expandedVar={hasPretaxDeduction}
                    infoTag={null}
                  />
                  <ToggleDropdownTab
                    label='Super Salary Sacrifice'
                    desc='Lower your income tax by making voluntary super contributions'
                    contents={<><table className='dropdown-table'>
                      <tbody>
                        <tr>
                          <td>
                            <InputField
                              label={"Deduction amount"}
                              id='pretax-deduction-amount'
                              value={pretaxDeductionAmount}
                              setFunc={(val) => { setPretaxDeductionAmount(val); }}
                              styling='large'
                              monetary={true}
                              rounding={2}
                              min={0}
                              max={null}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className='pretax-savings'>
                              {pretaxSavings} in income tax savings
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    </>}
                    toggleFunc={setHasPretaxDeduction}
                    expandedVar={hasPretaxDeduction}
                    infoTag={null}
                  />
                  <ToggleDropdownTab
                    label='Work deductables'
                    desc='Subtract your work expenses from your taxable income'
                    contents={<><table className='dropdown-table'>
                      <tbody>
                        <tr>
                          <td>
                            <InputField
                              label={"Deduction amount"}
                              id='pretax-deduction-amount'
                              value={pretaxDeductionAmount}
                              setFunc={(val) => { setPretaxDeductionAmount(val); }}
                              styling='large'
                              monetary={true}
                              rounding={2}
                              min={0}
                              max={null}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className='pretax-savings'>
                              {pretaxSavings} in income tax savings
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    </>}
                    toggleFunc={setHasPretaxDeduction}
                    expandedVar={hasPretaxDeduction}
                    infoTag={null}
                  />
                  {/* <ToggleDropdownTab
                    label='Bonus Pay'
                    contents={<table className='dropdown-table'>
                      <tbody>
                        <tr>
                          <td>
                            <InputField
                              label={bonusFrequency + ' bonus'}
                              id='bonus-amount'
                              value={bonus}
                              setFunc={(val) => { setBonus(val); }}
                              styling='large'
                              monetary={true}
                              rounding={2}
                              min={0}
                              max={null}
                            />
                          </td>

                          <td>
                            <SelectField
                              label="Bonus Frequency"
                              id="bonus-frequency"
                              value={bonusFrequency}
                              setFunc={setBonusFrequency}
                              items={{
                                "Annually": "Annual"
                              }}
                              styling='large'
                            />
                          </td>
                        </tr>

                      </tbody>
                    </table>}
                    toggleFunc={setHasBonus}
                    expandedVar={hasBonus}
                  /> */}
                  {/* <ToggleDropdownTab
                    label={'Part-time hours'}
                    contents={
                      // Weekly, Fortnightly, Monthly, Annually calculator
                      
                    }
                    toggleFunc={setHasPartTimeHours}
                    expandedVar={hasPartTimeHours}
                  /> */}
                </td>
              </tr>

              <tr>
                <td>

                  {/* {financialData['taxSplit']['293'][4] > 0 ? (<div style={{ textAlign: 'center', fontStyle: 'italic' }}>Division 293 tax applies when taxable income + super contribution exceeds $250,000</div>) : (<></>)} */}
                </td>
              </tr>
            </tbody>
          </table>
        </div >
        <div id='summary-div'>
          <div>
            <table id='summary-table'>
              <tbody>
                <tr>
                  <td colSpan={2}>
                    <IncomeTable
                      label=''
                      items={{
                        "#Taxable Income": financialData['taxablebaseSalarySplit'].map(displayMoney),
                        // "Base salary": financialData['baseSalarySplit'].map(displayMoney),
                        // "Bonus pay": hasBonus ? ['-', '-', '-', '-', displayMoney(bonus)] : null,
                        "#Superannuation": financialData['superSplit'].map(displayMoney),
                        "#Total Taxes": financialData['taxSplit']['totalTax'].map(displayMoney),
                        // "Income Tax": financialData['taxSplit']['incomeTax'].map(displayMoney),
                        // "LITO": financialData['taxSplit']['lito'] != null ? financialData['taxSplit']['lito'].map(displayMoney) : null,
                        // "Student Loan": hasStudentLoan ? financialData['studentLoanContribution'].map(displayMoney) : null,
                        // "Medicare Levy": Array.isArray(financialData['taxSplit']['medicare']) ? financialData['taxSplit']['medicare'] : [financialData['taxSplit']['medicare']],
                        // "Division 293": financialData['taxSplit']['293'][4] != 0 ? financialData['taxSplit']['293'].map(displayMoney) : null,
                      }}
                      totals={financialData['postTax'].map(displayMoney)} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id='chart-section'>
            <div className='chart-block'>
              <PayrollPieChart title={'Salary Breakdown'} data={financialData['payrollData']} />
            </div>
            {/* <DonutChart data={donutIncomeSummary} /> */}
            <div className='chart-block'>
              <TaxBandBar title={'Tax Bands'} earnings={financialData['taxablebaseSalarySplit'][4]} barWidth={(600)} lowerLimit={18200} upperLimit={250000} taxBands={taxRates['2226']} />
            </div>
          </div>
          <div style={{ textAlign: 'center', fontStyle: 'italic' }}>This calculator is an estimate</div>
        </div >

      </div >
    </>
  )
}

export default App
