import { useState, useEffect, useMemo } from 'react'
import './App.css'
import { IncomeTable, DropdownSummaryInformation, DropdownTab, ToggleDropdownTab, SummaryTab } from './dropdown'
import useToggle from './hooks/useToggle'
import { AiOutlineCloseSquare, AiOutlinePlusCircle } from "react-icons/ai";
import { InputField, SelectField } from './forms'
import { SwitchToggle } from './buttons'
import { DonutChart, TaxBandBar } from './graphs';
import PayrollPieChart from './graphs';
import type { MainCategory, SubCategory } from './graphs'

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
  const [salary, setSalary] = useState(60000)
  // 0: 1: 2: 3: 4: 5: 6:
  const [payCycle, setPayCycle] = useState('Annual')
  const [fortnightlyWorkHours, setFortnightlyWorkHours] = useState(0)
  const [salaryIncludesSuper, setSalaryIncludesSuper] = useToggle()
  const [hasStudentLoan, setHasStudentLoan] = useToggle()
  const [superPercentage, setSuperPercentage] = useState(12.00)
  const [bonus, setBonus] = useState(0)
  const [bonusFrequency, setBonusFrequency] = useState('Annual')
  const [payFrequency, setPayFrequency] = useState('Annual')
  const [taxYear, setTaxYear] = useState('1819')
  // const [medicareLevy, setMedicareLevy] = useState(0)
  const [payAmount, setPayAmount] = useState(0)
  const [hasBonus, setHasBonus] = useToggle()
  const [bonusTax, setBonusTax] = useState(0)
  const [studentLoanContribution, setStudentLoanContribution] = useState(0)
  // const [incomeTax, setIncomeTax] = useState(0)
  const [hasPartTimeHours, setHasPartTimeHours] = useToggle()
  const twentyTwoTwentySix = { 18200: [0.16, 0], 45000: [0.30, 4288], 135000: [0.37, 31288], 190000: [0.45, 51638] }
  const studentTwentyFiveTwentySix = { 67000: [0.15, 0], 125000: [0.17, 8700], 179286: [0.1, 17928] }
  const taxRates = { "2226": twentyTwoTwentySix }
  const studentRates = { "2526": studentTwentyFiveTwentySix }
  const [payPeriods, setPayPeriods] = useState(1);
  const [dailyHours, setDailyHours] = useState(7.6);
  const [daysPerPeriod, setDaysPerPeriod] = useState(5);
  const [hoursPeriod, setHoursPeriod] = useState('Week');

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
    if (hasPartTimeHours == false) {
      return [7.6, 38, 76, 164.6666, 1976]
    }
    else {
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
    }
    return [dailyHours, weeklyHours, fortnightlyHours, monthlyHours, yearlyHours];
  }
  function splitTax(ammount: number, hours: number[]) {
    let daily = round(ammount / (hours[4] / hours[0]), 2);
    let weekly = round(ammount / (hours[4] / hours[1]), 2);
    let fortnightly = round(ammount / (hours[4] / hours[2]), 2);
    let monthly = round(ammount / (hours[4] / hours[3]), 2);
    return [daily, weekly, fortnightly, monthly, ammount]
  }
  function calculateTax(salary: number, superSum: number, taxBands: Record<number, number[]>, hours: number[]): any {
    let taxAmount = 0;
    let currentTaxRate = 0;
    let currentThreshold = 0;
    let grossEarnings = salary - (hasBonus ? bonus : 0);
    let lito = 0;
    let div293 = 0;
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
    console.log(incomeTaxSplit)
    // Division 293 tax
    if (grossEarnings + superSum > 250000) {
      let taxableAmmount = (grossEarnings + superSum) - 250000 > superSum ? superSum : (grossEarnings + superSum) - 250000;
      div293 = taxableAmmount * .15;
    }

    // Medicare Levy
    let medicareLevy = salary * 0.02
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
    taxAmount += medicareLevy;
    let totalTaxSplit = splitTax(taxAmount, hours);
    // Add LITO
    // totalTaxSplit[4] += lito;
    taxAmount += lito;
    let medicareSplit = splitTax(medicareLevy, hours);
    let litoSplit = null;
    if (lito != 0) {
      litoSplit = ['-', '-', '-', '-', -lito]
    }

    // Calculate bonus tax, using the below page:
    // https://www.ato.gov.au/tax-rates-and-codes/schedule-5-tax-table-for-back-payments-commissions-bonuses-and-similar-payments/working-out-the-withholding-amount
    let bonusTax = 0;
    if (hasBonus) {
      taxAmount += round(bonusTax, 2);
      setBonusTax(bonusTax)
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
      salarySum += bonus;
    }


    // Student Loans
    let currentRepayments = hasStudentLoan ? calculateStudentLoan(salarySum, studentRates['2526']) : 0;
    setStudentLoanContribution(currentRepayments);

    // Tax
    let currentTax = calculateTax(salaryPeriods[4], superSum, taxRates['2226'], yearlyHours);

    currentTax['HECS'] = currentRepayments;
    // currentTax['total'] = (currentTax['total'] as number) + currentRepayments;
    console.log(currentTax)
    // LITO
    currentTax['totalTaxSplit'][4] = Number(currentTax['totalTaxSplit'][4]) - Number(currentTax['LITO']);
    // 293
    currentTax['totalTaxSplit'][4] = Number(currentTax['totalTaxSplit'][4]) + Number(currentTax['div293']);
    let taxSplit = {
      "totalTax": currentTax['totalTaxSplit'],
      "incomeTax": currentTax['incomeTaxSplit'],
      "medicare": currentTax['medicareSplit'],
      "lito": currentTax['litoSplit'],
      '293': currentTax['div293']
    };
    // Remove Tax
    let postTaxPay: number[] = []
    for (let i = 0; i < 5; i++) {
      postTaxPay.push(round(salaryPeriods[i] - taxSplit["totalTax"][i], 2));
    }
    let superSplit = splitTax(superSum, yearlyHours);
    let taxableIncomePeriods = [];
    for (let i = 0; i < 5; i++) {
      taxableIncomePeriods.push(salaryPeriods[i]);
    }
    if (hasBonus) {
      taxableIncomePeriods[4] += bonus;
    }
    //  { id: 'base-pay', label: 'Base Pay', value: 4500, color: '#71972c' },
    // { id: 'bonus', label: 'Bonus', value: 500, color: '#5f7e25' },

    // { id: 'income-tax', label: 'Income Tax', value: 1200, color: '#ea9f21' },
    //     { id: 'medicare', label: 'Medicare', value: 300, color: '#a6e631' },

    //     { id: 'employer-cont', label: 'Employer', color: '#33a2c6', value: 600 },
    // { id: 'voluntary', label: 'Voluntary', value: 200, color: '#226e88' },
    let payrollData = [{
      id: 'take-home',
      label: 'Pay',
      color: '#71972c',
      subCategories: [{ id: 'base-pay', label: 'Base Pay', value: postTaxPay[4] - (hasBonus ? bonus : 0), color: '#71972c' }],
    },
    {
      id: 'tax',
      label: 'Tax',
      color: '#ea9f21',
      subCategories: [{ id: 'income-tax', label: 'Income Tax', value: taxSplit['incomeTax'][4], color: '#ea9f21' }],
    },
    {
      id: 'super',
      label: 'Super',
      color: '#33a2c6',
      subCategories: [{ id: 'employer-cont', label: 'Employer contribution', color: '#33a2c6', value: superSplit[4] }],
    }]
    if (hasBonus) {
      payrollData[0].subCategories.push({ id: 'bonus', label: 'Bonus', value: bonus, color: '#5f7e25' });
    }
    if (taxSplit['293'] > 0) {
      payrollData[1].subCategories.push({ id: '293', label: 'Division 293', value: taxSplit['293'], color: '#ea5a21' });
    }
    if (taxSplit['medicare'][4] > 0) {
      payrollData[1].subCategories.push({ id: 'medicare', label: 'Medicare Levy', value: taxSplit['medicare'][4], color: '#81d100' });
    }
    if (hasStudentLoan && currentTax['HECS'] > 0) {
      payrollData[1].subCategories.push({ id: 'student-loan', label: 'Student Loan', value: currentTax['HECS'], color: '#d100b5' });
    }
    return {
      totalSalary: salaryPeriods[4],
      superAmount: superSum,
      taxValues: currentTax,
      postTax: postTaxPay,
      repayments: currentRepayments,
      yearlyHours: yearlyHours,
      taxableIncomeSplit: taxableIncomePeriods,
      incomeSplit: salaryPeriods,
      taxSplit: taxSplit,
      superSplit: superSplit,
      payrollData: payrollData
      // bonusSplit: bonusPeriods
    };
  }, [salary, payCycle, bonus, hasBonus, superPercentage, salaryIncludesSuper, bonusFrequency, hasStudentLoan, dailyHours, daysPerPeriod, hoursPeriod]);

  return (
    <>
      <div className='global-div'>
        <div id='income-div'>
          <h1>INCOME</h1>
          <table>
            <thead>
              <tr>
                <td>
                  Enter your salary, adjust the settings and see the results in the summary below.
                </td>
                <td>
                  <button id='resetButton'>
                    Reset Calculator
                  </button>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr className='big-table-row'>
                <td className='big-table-cell'>
                  <InputField
                    id='Salary'
                    label='Salary'
                    inputType='number'
                    value={salary}
                    setFunc={(val) => { setSalary(val); }}
                    styling='large-dark'
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
                    styling='large-dark'
                  />
                  {payCycle == "Hourly" ? <a target="_blank" href="https://www.fairwork.gov.au/pay-and-wages/minimum-wages/pay-guides">Check Award rates</a> : <></>}
                  <ToggleDropdownTab
                    label={'Part-time hours'}
                    contents={
                      // Weekly, Fortnightly, Monthly, Annually calculator
                      <table className='dropdown-table'>
                        <tbody>
                          <tr>
                            <td>
                              <InputField
                                label='Hours per day'
                                id='work-hours'
                                inputType='number'
                                value={dailyHours}
                                setFunc={setDailyHours}
                                styling='large-dark'
                              />
                            </td>
                            <td>
                              <InputField
                                label='Days per'
                                id='days-per-period'
                                inputType='number'
                                value={daysPerPeriod}
                                setFunc={setDaysPerPeriod}
                                styling='large-dark'
                              />
                            </td>
                            <td>
                              <SelectField
                                label="period"
                                id="week-or-fortnight"
                                value={hoursPeriod}
                                setFunc={setHoursPeriod}
                                items={{
                                  "Week": "Week",
                                  "Fortnight": "Fortnight",
                                  "Month": "Month",
                                  "Year": "Year",
                                }}
                                styling='large-dark'
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    }
                    toggleFunc={setHasPartTimeHours}
                    expandedVar={hasPartTimeHours}
                  />

                  <ToggleDropdownTab
                    label='Bonus Pay'
                    contents={<table className='dropdown-table'>
                      <tbody>
                        <tr>
                          <td>
                            <InputField
                              label={bonusFrequency + ' bonus'}
                              id='bonus-amount'
                              inputType='number'
                              value={bonus}
                              setFunc={(val) => { setBonus(val); }}
                              styling='large-dark'
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
                              styling='large-dark'
                            />
                          </td>
                        </tr>

                      </tbody>
                    </table>}
                    toggleFunc={setHasBonus}
                    expandedVar={hasBonus}
                  />
                  <div>
                    <SwitchToggle
                      label="Salary includes Superannuation"
                      description={'Super Guarantee of $' + round(financialData['superAmount'], 0) + ' paid on top of your $' + round(financialData['totalSalary'], 0) + ' annual salary'}
                      setFunc={setSalaryIncludesSuper}
                    />
                    <span></span>
                  </div>
                  <br></br>
                  <div><SwitchToggle
                    label="Student loan"
                    description='HELP (HECS), VSL, TSL, SSL, SFSS'
                    setFunc={setHasStudentLoan}
                  /></div>
                </td>
              </tr>

              <tr>

              </tr>
            </tbody>
          </table>
        </div >
        <div id='summary-div'>
          <h1>SUMMARY</h1>
          <table id='summary-table'>
            <tbody>
              <tr>
                <td colSpan={2}>
                  <IncomeTable
                    label=''
                    items={{
                      "#Taxable Income": financialData['taxableIncomeSplit'],
                      "Base salary": financialData['incomeSplit'],
                      "Bonus pay": hasBonus ? ['-', '-', '-', '-', bonus] : null,
                      "#Superannuation": financialData['superSplit'],
                      "#Total Taxes": Array.isArray(financialData['taxSplit']['totalTax']) ? financialData['taxSplit']['totalTax'] : [financialData['taxSplit']['totalTax']],
                      "Income Tax": Array.isArray(financialData['taxSplit']['incomeTax']) ? financialData['taxSplit']['incomeTax'] : [financialData['taxSplit']['incomeTax']],
                      "LITO": financialData['taxSplit']['lito'] != null ? Array.isArray(financialData['taxSplit']['lito']) ? financialData['taxSplit']['lito'] : [financialData['taxSplit']['lito']] : null,
                      "Student Loan": hasStudentLoan ? ['-', '-', '-', '-', studentLoanContribution] : null,
                      "Medicare Levy": Array.isArray(financialData['taxSplit']['medicare']) ? financialData['taxSplit']['medicare'] : [financialData['taxSplit']['medicare']],
                      "Division 293": financialData['taxSplit']['293'] != 0 ? ['-', '-', '-', '-', financialData['taxSplit']['293']] : null,
                    }}
                    totals={financialData['postTax']} />
                </td>
              </tr>
            </tbody>
          </table>
          <div id='chart-section'>
            <PayrollPieChart data={financialData['payrollData']} />
            {/* <DonutChart data={donutIncomeSummary} /> */}
            <TaxBandBar title={'Tax Band'} earnings={financialData['incomeSplit'][4]} barWidth={600} lowerLimit={18200} upperLimit={250000} taxBands={taxRates['2226']} />

          </div>
        </div >

      </div >
    </>
  )
}

export default App
