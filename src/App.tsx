import { useState, useMemo } from 'react'
import './App.css'
import { IncomeTable, ToggleExpandVerticalTab, MortageRepaymentTable, DropdownTab } from './dropdown'
import useToggle from './hooks/useToggle'
import { InputField, SelectField } from './forms'
import { SwitchToggle } from './buttons'
// import { TaxBandBar } from './graphs';
import PayrollPieChart from './graphs';
import { displayMoney, round, PMT, NPER, HtmlTooltip } from './functions';
import { AiFillInfoCircle } from "react-icons/ai";

// type IncomeTableRowProps = {
//   values: number[];
//   subrow: any[];
// }

function App() {

  // function stringToNumFreq(freq: string): number {
  //   switch (freq) {
  //     case "Annual": {
  //       return 1;
  //     }
  //     case "Year": {
  //       return 1;
  //     }
  //     case "Monthly": {
  //       return 12;
  //     }
  //     case "Month": {
  //       return 12;
  //     }
  //     case "Fortnightly": {
  //       return 26;
  //     }
  //     case "Fortnight": {
  //       return 26;
  //     }
  //     case "Weekly": {
  //       return 52;
  //     }
  //     case "Week": {
  //       return 52;
  //     }
  //     case "Daily": {
  //       return 365;
  //     }
  //     default: {
  //       return 0
  //     }

  //   }
  // }
  // const novatedLeaseExamples: Record<string, number[][]> = {
  //   "Toyota Corolla": [[], []],
  //   "Polestar 2": [[], []],
  //   "Telsa Model 3": [[], []],
  //   "Audi A1": [[], []]
  // }
  const [salary, setSalary] = useState(40.00)
  // 0: 1: 2: 3: 4: 5: 6:
  const [payCycle, setPayCycle] = useState('Hourly')
  // const [salaryIncludesSuper, setSalaryIncludesSuper] = useToggle()
  const salaryIncludesSuper = true;
  // const [hasStudentLoan, setHasStudentLoan] = useToggle()
  const hasStudentLoan = false;
  // const [bonus, setBonus] = useState(0)
  // const [bonusFrequency, setBonusFrequency] = useState('Annual')
  // const [medicareLevy, setMedicareLevy] = useState(0)
  // const [hasPretaxDeduction, setHasPretaxDeduction] = useToggle()
  // const [pretaxDeductionAmount, setPretaxDeductionAmount] = useState(0)
  // const [hasBonus, setHasBonus] = useToggle()
  const [pretaxSavings, setPretaxSavings] = useState<string[]>([])
  const [hasNovatedLease, setHasNovatedLease] = useToggle()
  const [novatedLeaseExample, setNovatedLeaseExample] = useState('Toyota Rav 4')
  const [hasSuperSalarySacrifise, setHasSuperSalarySacrifise] = useToggle()
  const [voluntarySuperAmmount, setVoluntarySuperAmmount] = useState(0)
  const [hasWorkDeductions, setHasWorkDeductions] = useToggle()
  const [workDeductablesAmount, setWorkDeductablesAmount] = useState(0)
  const [maximiseSuper, setMaximiseSuper] = useToggle()
  // const [bonusTax, setBonusTax] = useState(0)
  // const [incomeTax, setIncomeTax] = useState(0)
  // const [hasPartTimeHours, setHasPartTimeHours] = useToggle()
  const twentyTwoTwentySix = { 18200: [0.16, 0], 45000: [0.30, 4288], 135000: [0.37, 31288], 190000: [0.45, 51638] }
  const studentTwentyFiveTwentySix = { 67000: [0.15, 0], 125000: [0.17, 8700], 179286: [0.1, 17928] }
  const taxRates = { "2226": twentyTwoTwentySix }
  const studentRates = { "2526": studentTwentyFiveTwentySix }
  const [dailyHours, setDailyHours] = useState(7.6);
  const [daysPerPeriod, setDaysPerPeriod] = useState('5');
  const [hoursPeriod, setHoursPeriod] = useState('Week');

  const [mortageLoanAmmount, setMortageLoanAmmount] = useState(500000);
  const [mortageInterestRate, setMortageInterestRate] = useState(5.25);
  const [mortageTerm, setMortageTerm] = useState(20);
  const [mortagePayFreq, setMortagePayFreq] = useToggle();
  const [hasMortage, setHasMortage] = useToggle();


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
  function calculateTax(salary: number, superSum: number, taxBands: Record<number, number[]>, hours: number[]): any {
    let taxAmount = 0;
    let currentTaxRate = 0;
    let currentThreshold = 0;
    let grossEarnings = salary - 0//(hasBonus ? bonus : 0); // Apply pre-tax here no seperate variable for pre-tax so we can compare with and without
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
    // if (hasBonus) {
    //   taxAmount += round(bonusTax, 2);
    //   // setBonusTax(bonusTax)
    // }
    let adjustedSalary = grossEarnings// + round(bonus / stringToNumFreq(bonusFrequency), 0)
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
    //let taxDiff = (bonusTax - taxAmount) * stringToNumFreq(bonusFrequency);
    // Select the lesser
    //bonus * 0.47 > taxDiff ? bonusTax = taxDiff : bonusTax = bonus * 0.47;
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
  // const ResidualValues: Record<number, number> = { 1: 0.6563, 2: 0.5625, 3: 0.4688, 4: 0.3750, 5: 0.2813 }
  // function calculateNovatedLease(purchasePrice: number, isEV: boolean, leaseDuration: number) {
  //   // const AnnualTravel = 10000;
  //   console.log(isEV);
  //   const AnnualLeaseInterestRate = 0.08;
  //   const DealerDeliveryCharges = 1722.73;
  //   const gst = (purchasePrice + DealerDeliveryCharges) * 0.1;
  //   const PurchaseStampDuty = 1179; // Figure out formula
  //   const CarBaseValueForFBT = purchasePrice + DealerDeliveryCharges + gst;
  //   const AmountFinanced = purchasePrice + DealerDeliveryCharges + PurchaseStampDuty;
  //   const LeaseTerm = leaseDuration;
  //   // const InitialDeposit = AmountFinanced * 0.2;
  //   const ResidualValue = AmountFinanced * ResidualValues[leaseDuration];
  //   const MonthlyFinanceRepayment = PMT((AnnualLeaseInterestRate) / 12, (LeaseTerm) * 12, ((AmountFinanced) - (ResidualValue))) + ResidualValue * (AnnualLeaseInterestRate / 12);
  //   const MonthlyRunningCosts = 339.45; // Calculate later
  //   const LoanManagementFees = 20;
  //   const MonthlyTotalCosts = LoanManagementFees + MonthlyRunningCosts + MonthlyFinanceRepayment;
  //   const AnnualTotalCosts = MonthlyTotalCosts * 12;
  //   const FBTTaxableValue = CarBaseValueForFBT * 0.2;
  //   // const FBT = FBTTaxableValue * 2.0802 * 0.49; // Maybe?
  //   const EmployeeContributionPostTax = FBTTaxableValue;

  //   const TotalAnnualVehicleCosts = AnnualTotalCosts;
  //   const SalarySacrifise = TotalAnnualVehicleCosts - EmployeeContributionPostTax;
  //   //const TaxableIncome = salary - SalarySacrifise;

  //   return [SalarySacrifise, EmployeeContributionPostTax];
  // }

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
  let optionsActive: string[] = [];
  if (hasMortage) { optionsActive.push('Mortage, '); }
  if (hasNovatedLease) { optionsActive.push('Novated Lease, '); }
  if (hasWorkDeductions) { optionsActive.push('Work Deductables, '); }
  if (hasSuperSalarySacrifise) { optionsActive.push('Super Salary Sacrifice, '); }
  if (optionsActive.length > 0) {
    optionsActive[optionsActive.length - 1] = optionsActive[optionsActive.length - 1].substring(0, optionsActive[optionsActive.length - 1].length - 2);
  }
  // const mortageData = useMemo(() => {
  //   return calculateMortage(mortageLoanAmmount, mortageInterestRate, mortageTerm);
  // }, [mortageLoanAmmount, mortageInterestRate, mortageTerm])
  // Add all components of the salary together
  const financialData = useMemo(() => {
    let yearlyHours = calculateYearlyHours(dailyHours, parseFloat(daysPerPeriod), hoursPeriod);
    let salaryPeriods = calculateSalaryPeriods(salary, payCycle, yearlyHours);
    let salarySum = salaryPeriods[4];
    let superSum = 0;
    let superSalary = salaryPeriods[4];
    // let payrollFeeSum = salarySum * payrollFee
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
    let employerContribution = splitTax(superSum, yearlyHours);
    let pretaxDeductionAmount = 0;
    // Voluntary Super
    let superContribution = 0;
    let concessional = 0;
    let nonConcessional = 0;
    if (hasSuperSalarySacrifise) {
      if (maximiseSuper) {
        superContribution = 30000 - superSum;
        setVoluntarySuperAmmount(superContribution)
      }
      else {
        superContribution = voluntarySuperAmmount;
      }
      superSum += superContribution;
      if (superSum - 30000 >= 0) {
        concessional = round(-((superSum - 30000) - superContribution), 2)
        nonConcessional = round(-((superSum - concessional) - superContribution), 2)
        // console.log(nonConcessional);
        // console.log(concessional);
        // console.log(superContribution);
      }
      else {
        concessional = superContribution;
      }
    }
    else { concessional = 0; }
    pretaxDeductionAmount += concessional;
    // Add bonus
    // if (hasBonus) {
    //   salarySum += Number(bonus);
    // }
    // Student Loans
    let currentRepayments = hasStudentLoan ? calculateStudentLoan(salarySum, studentRates['2526']) : 0;
    let studentLoanContribution = [0, 0, 0, 0, currentRepayments];
    // setStudentLoanContribution(currentRepayments);

    // Calculate Pre-Tax Savings
    if (hasWorkDeductions) {
      pretaxDeductionAmount += workDeductablesAmount;
    }
    let novatedLeasePreTax = [0, 0, 0, 0, 0];
    let novatedLeasePostTax = [0, 0, 0, 0, 0];
    // Calculation Novated Lease
    if (hasNovatedLease) {
      let novatedLeaseContributions = [0, 0];
      if (novatedLeaseExample == "Toyota Rav 4") {
        novatedLeaseContributions = [534 * 12, 888 * 12]; // Montly 534 Pre-Tax 888 Post-Tax
      }
      else if (novatedLeaseExample == "Tesla Model Y") {
        novatedLeaseContributions = [1513 * 12, 0]; // Montly 1513 Pre-Tax 0 Post-Tax
      }
      novatedLeasePreTax = splitTax(-novatedLeaseContributions[0], yearlyHours);
      novatedLeasePostTax = splitTax(-novatedLeaseContributions[1], yearlyHours);
      // console.log(novatedLeaseContributions);
      pretaxDeductionAmount += novatedLeaseContributions[0];
    }
    // Pre-Tax Deductions
    let currentTax = calculateTax(salaryPeriods[4] - pretaxDeductionAmount, superSum, taxRates['2226'], yearlyHours);
    let numUndeductedTax: number[] = [];
    let undeductedTax: string[] = [];
    let taxDeductionDiff = [];

    if (pretaxDeductionAmount > 0) {
      numUndeductedTax = calculateTax(salaryPeriods[4], superSum, taxRates['2226'], yearlyHours)['totalTaxSplit'];
      taxDeductionDiff = currentTax['totalTaxSplit'].map((val: number, i: number) =>
        round(numUndeductedTax[i] - val, 2)
      );
      if (!taxDeductionDiff.every((item: number) => item === 0)) {
        undeductedTax = numUndeductedTax.map(displayMoney);
      }
      taxDeductionDiff = taxDeductionDiff.map(displayMoney);
      setPretaxSavings(taxDeductionDiff);

    }
    else {
      undeductedTax = [];
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
    // Mortage
    const mortageData = calculateMortage(mortageLoanAmmount, mortageInterestRate, mortageTerm);
    const mortageAnnualPayments = mortagePayFreq ? mortageData['weeklyRepaymentAmmount'] * 52 : mortageData['montlyRepaymentAmmount'] * 12;
    const annualMortageSplit = splitTax(mortageAnnualPayments, yearlyHours);

    // Remove mortage
    const mortageSplit = splitTax(mortageAnnualPayments, yearlyHours)
    // Remove pretax
    const pretaxDeductionSplit = splitTax(pretaxDeductionAmount, yearlyHours);
    // Remove Tax and mortage
    let grossSalary: any[] = []
    for (let i = 0; i < 5; i++) {
      grossSalary.push((round(salaryPeriods[i] - taxSplit["totalTax"][i] - pretaxDeductionSplit[i], 2)));
    }
    grossSalary[4] -= (hasSuperSalarySacrifise ? nonConcessional : 0)

    // Gross Pay
    let grossPay: any[] = []
    for (let i = 0; i < 5; i++) {
      grossPay.push(grossSalary[i]);
    }
    // console.log(grossSalary)
    // // Subtract cost of novated lease
    // console.log(novatedLeasePostTax)
    // Takehome pay
    for (let i = 0; i < 5; i++) {

      if (hasNovatedLease) {
        grossSalary[i] += novatedLeasePostTax[i];
        // console.log(grossSalary)
        // console.log('--------')
      }
      if (hasMortage) {
        grossSalary[i] -= mortageSplit[i];
      }
      // if (i == 4) {
      //   console.log(pretaxDeductionSplit[i])
      // }
    }
    let superSplit = splitTax(superSum, yearlyHours);
    let taxableIncomePeriods = [];
    for (let i = 0; i < 5; i++) {
      taxableIncomePeriods.push(salaryPeriods[i] - pretaxDeductionSplit[i]);
    }// TODO Fix taxable income
    // taxableIncomePeriods[4] = taxableIncomePeriods[4] - pretaxDeductionAmount;
    // if (hasBonus) {
    //   taxableIncomePeriods[4] += Number(bonus);
    // }
    const basePay = grossSalary[4] //- (hasBonus ? Number(bonus) : 0);
    let payrollData = [{
      id: 'take-home',
      label: 'Pay',
      color: '#71972c',
      subCategories: [{ id: 'base-pay', label: 'Take-home pay', value: Number(basePay), color: '#71972c' }],
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
      subCategories: [{ id: 'employer-cont', label: 'Employer contribution', color: '#35a0c4', value: Number(employerContribution[4]) }],
    }]
    // if (hasBonus) {
    //   payrollData[0].subCategories.push({ id: 'bonus', label: 'Bonus', value: Number(bonus), color: '#5f7e25' });
    // }
    if (taxSplit['293'][4] > 0) {
      payrollData[1].subCategories.push({ id: '293', label: 'Division 293', value: Number(taxSplit['293'][4]), color: '#ea5a21' });
    }
    if (taxSplit['medicare'][4] > 0 && Number(taxSplit['incomeTax'][4]) - adjustedLITO > 0) {
      payrollData[1].subCategories.push({ id: 'medicare', label: 'Medicare Levy', value: Number(taxSplit['medicare'][4]), color: '#81d100' });
    }
    if (hasStudentLoan && currentTax['HECS'] > 0) {
      payrollData[1].subCategories.push({ id: 'student-loan', label: 'Student Loan', value: Number(currentTax['HECS']), color: '#d100b5' });
    }
    if (superContribution > 0) {
      payrollData[2].subCategories.push({ id: 'voluntary', label: 'Voluntary Contribution', value: Number(superContribution), color: '#256f88' });
    }
    if (hasMortage) {
      payrollData[0].subCategories.push({ id: 'mortage', label: 'Mortage Repayments', value: Number(mortageAnnualPayments), color: '#a30101' });
    }
    if (hasNovatedLease) {
      if (-novatedLeasePostTax[4] > 0) {
        payrollData[0].subCategories.push({ id: 'novatedLease', label: 'Novated Lease Post-Tax', value: Number(-novatedLeasePostTax[4]), color: '#ff7300' });
      }
    }
    let concessionalSplit = [0, 0, 0, 0, concessional];
    let nonConcessionalSplit = [0, 0, 0, 0, nonConcessional];
    return {
      totalSalary: salaryPeriods[4],
      superAmount: superSum,
      taxValues: currentTax,
      postTax: grossSalary,
      repayments: currentRepayments,
      yearlyHours: yearlyHours,
      taxablebaseSalarySplit: taxableIncomePeriods,
      baseSalarySplit: salaryPeriods,
      taxSplit: taxSplit,
      superSplit: superSplit,
      payrollData: payrollData,
      studentLoanContribution: studentLoanContribution,
      undeductedTax: undeductedTax,
      fringeBenefitsTax: currentTax['fringe-benefits-tax'],
      pretaxDeductionAmount: pretaxDeductionAmount,
      employerContribution: employerContribution,
      voluntaryContribution: [0, 0, 0, 0, superContribution],
      novatedPayments: [novatedLeasePreTax, novatedLeasePostTax],
      mortageData: mortageData,
      grossSalary: grossPay,
      annualMortageSplit: annualMortageSplit,
      workDeductablesAmount: [0, 0, 0, 0, -workDeductablesAmount],
      voluntarySuperCon: [concessionalSplit, nonConcessionalSplit]
      // bonusSplit: bonusPeriods
    };
  }, [salary, payCycle, superPercentage, salaryIncludesSuper, , hasStudentLoan, dailyHours, daysPerPeriod, hoursPeriod, hasNovatedLease, novatedLeaseExample, hasWorkDeductions, workDeductablesAmount, hasSuperSalarySacrifise, voluntarySuperAmmount, maximiseSuper, hasNovatedLease, mortageLoanAmmount, mortageInterestRate, mortageTerm, mortagePayFreq, hasMortage]);
  //bonus hasBonus bonusFrequency hasPretaxDeduction pretaxDeductionAmount
  return (
    <>
      <div className='global-div'>
        <div id='income-div'>
          <div className='flex-cell'>
            {/* <td className='big-table-cell'> */}
            <InputField
              textColour='white'
              headerColour='var(--hive-yellow)'
              backgroundColour='var(--yellow-tone-5)'
              id='Salary'
              label='Salary'
              value={salary}
              setFunc={(val) => { setSalary(val); }}
              styling='large'
              formatting={'monetary'}
              rounding={2}
              min={0}
              max={null}
            />
          </div>
          <div className='flex-cell'>
            <table className='dropdown-table'>
              <tbody>
                <tr>
                  <td>
                    <SelectField
                      textColour='white'
                      headerColour='var(--hive-yellow)'
                      backgroundColour='var(--yellow-tone-5)'
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
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {payCycle == 'Hourly' ?
            <div className='flex-cell'>
              <table className='dropdown-table'>
                <tbody>
                  <tr>
                    <td>
                      <InputField
                        textColour='white'
                        headerColour='var(--hive-yellow)'
                        backgroundColour='var(--yellow-tone-5)'
                        label='Hours'
                        id='work-hours'
                        value={dailyHours}
                        setFunc={setDailyHours}
                        styling='large'
                        formatting={'number'}
                        rounding={2}
                        min={0}
                        max={24}
                      />
                    </td>
                    <td>
                      <InputField
                        textColour='white'
                        headerColour='var(--hive-yellow)'
                        backgroundColour='var(--yellow-tone-5)'
                        label='Days'
                        id='days-per-period'
                        value={daysPerPeriod}
                        setFunc={setDaysPerPeriod}
                        styling='large'
                        formatting={'number'}
                        rounding={1}
                        min={0}
                        // max={null}
                        max={hoursPeriod == 'Week' ? 5 : (hoursPeriod == 'Fortnight' ? 10 : (hoursPeriod == 'Month' ? 23 : 276))}
                      />
                    </td>
                    <td>
                      <SelectField
                        textColour='white'
                        headerColour='var(--hive-yellow)'
                        backgroundColour='var(--yellow-tone-5)'
                        label="each"
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
            </div>
            : <div className='flex-cell'></div>}

          {/* <tr className='big-table-row'>
                <td className='big-table-cell'>
                  <SwitchToggle
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
                  />
                </td>
                <td colSpan={1} className='big-table-cell'>
                  <SwitchToggle
                    label="Salary includes Superannuation"
                    description={'Super Guarantee of $' + round(financialData['employerContribution'][4], 0) + (salaryIncludesSuper ? ' is included in your $' : ' paid on top of your $') + round(financialData['totalSalary'], 0) + ' annual salary'}
                    setFunc={setSalaryIncludesSuper}
                    infoTag={null}
                  />
                </td>
                <td colSpan={1} className='big-table-cell'></td>
              </tr> */}

        </div >
        <div id='payroll-options'>
          <DropdownTab
            colour='black'
            label={'Payroll'}
            contents={
              <div className='hive-benefits-div'>
                <h2 className='payroll-options' style={{ display: 'flex', justifyContent: 'center' }}>
                  Hive Payroll Options
                </h2>
                {/* <span className='hive-subheader'>Our accounts team can offer you</span> */}
              </div>
            }
            subContents={<>
              <table style={{ backgroundColor: 'black' }}>
                <tbody>
                  <tr className='benefits-table-row' style={{ width: '80%' }}>
                    {/* <td className='benefits-table-cell'>
                      <table className='dropdown-table'>
                        <tbody>
                          <tr>
                            <td style={{ color: 'var(--hive-yellow)', fontWeight: 'bold' }}>
                              <p>Recruitment Hive offers Monthly & Weekly payroll options.</p>

                              <a href='https://www.recruitmenthive.com.au/payroll-operations/' target='_blank'>View our Payroll Options here</a><br></br>

                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td> */}
                    <td className='benefits-table-cell' style={{ padding: '20px' }}>
                      <p style={{ color: 'var(--hive-yellow)', margin: '0px' }}>Recruitment Hive offers Monthly & Weekly payroll options.</p>

                      <p style={{ color: 'var(--hive-yellow)' }}>View our Payroll Options <a style={{ color: 'var(--hive-yellow)', fontWeight: 'bold' }} href='https://www.recruitmenthive.com.au/payroll-operations/' target='_blank'>here</a></p>
                      <p style={{ color: 'var(--hive-yellow)', textAlign: 'left' }}><b>"Accelerated" repayments</b> allow you to repay your mortage weekly, saving <b>time</b> and <b>money</b>. Hive's Weekly pay option can help you make these weekly repayments. See below how much you can save.</p>
                      <ToggleExpandVerticalTab
                        label='Mortage Repayments'
                        desc='See the difference between weekly and monthly mortage repayments'
                        contents={<div id='mortage-dropdown'>
                          <table className='dropdown-table'>
                            <tbody>
                              <tr>
                                <td style={{ backgroundColor: 'var(--dark-grey)' }} colSpan={2}>
                                  <SwitchToggle
                                    dropdown={false}
                                    label="Accelerated repayments"
                                    description={''}
                                    setFunc={setMortagePayFreq}
                                    infoTag={null}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={2}>
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
                                  />
                                </td>

                              </tr>
                              <tr>
                                <td colSpan={1}>
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
                                  />
                                </td>
                                <td colSpan={1}>
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
                                  />
                                </td>
                              </tr>

                            </tbody>
                          </table>
                          <MortageRepaymentTable mortageData={financialData['mortageData']} monthlyPayment={mortagePayFreq} />
                        </div>}
                        toggleFunc={setHasMortage}
                        expandedVar={hasMortage}
                        infoTag={null}
                      />
                    </td>
                    <td className='benefits-table-cell'>

                    </td>
                  </tr>
                </tbody>
              </table>
            </>}
          />
        </div>
        <div id='hive-benefits'>
          <DropdownTab
            colour='black'
            label={'Benefits'}
            contents={
              <table id='benefits-table'>
                <tbody>
                  <tr>
                    <td>
                    </td>
                    <td>
                      <div className='hive-benefits-div'>
                        <h2 className='hive-shine' style={{ display: 'flex', justifyContent: 'center' }}>
                          <img src='https://www.recruitmenthive.com.au/wp-content/uploads/2026/02/cropped-recruitmentHive_H_small.png' id="hive_logo" alt="Recruitment Hive logo" />
                          Hive Benefits
                        </h2>
                        <span className='hive-subheader'>Our accounts team can offer you</span>
                      </div>
                    </td>
                    <td id='savings-cell'>
                      <div className='pretax-savings'>
                        {financialData['undeductedTax'].length > 0 ? (pretaxSavings[4] + ' in income tax savings') : null}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            }
            subContents={<>
              <div id='hive-benefits-cell'>
                {/* <table style={{ backgroundColor: 'black', width: '100%' }}>
                <tbody>
                  <tr className='benefits-table-row' style={{ width: '80%' }}>
                    <td className='benefits-table-cell'> */}
                <div className='flex-cell'>
                  <ToggleExpandVerticalTab
                    label='Novated Lease'
                    desc='Lease a car and pay it off partially before tax'
                    contents={<><table className='dropdown-table'>
                      <tbody>
                        <tr></tr>
                        <tr>
                          <td>

                            <SelectField
                              textColour='white'
                              label="Vehicle to Lease"
                              id="week-or-fortnight"
                              headerColour='var(--dark-grey)'
                              backgroundColour='var(--dark-grey)'
                              value={novatedLeaseExample}
                              setFunc={setNovatedLeaseExample}
                              items={{
                                "Toyota Rav 4": "Toyota Rav 4",
                                "Tesla Model Y": "Tesla Model Y",
                              }}
                              styling='medium'
                            />
                            <p style={{ margin: '0px' }}><i>These estimates are from our partner <a href='https://www.allianceleasing.com.au/' target='_blank' style={{ color: 'rgb(0, 184, 0)' }}>Alliance Leasing</a>.</i></p>
                            <a href='https://www.recruitmenthive.com.au/novated-lease-form/' target='_blank' style={{ color: 'var(--hive-yellow)' }}>Learn more here</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    </>}
                    toggleFunc={setHasNovatedLease}
                    expandedVar={hasNovatedLease}
                    infoTag={<HtmlTooltip
                      title={
                        <>
                          <b>Novated Leasing</b> is salary packaging benefit through your employer. We highly recommend our leasing partners <a href="https://www.allianceleasing.com.au/" target="_blank">Alliance Leasing</a> and <a href="https://www.easifleet.com.au/" target='_blank'> Easi</a>. The below examples are estimates from Alliance.
                        </>
                      }
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: 'offset',
                              options: {
                                offset: [160, -60],
                              },
                            },
                          ],
                        },
                      }}
                    >
                      <AiFillInfoCircle />
                    </HtmlTooltip>}
                  />
                </div>
                {/* </td>
                    <td className='benefits-table-cell'> */}
                <div className='flex-cell'>
                  <ToggleExpandVerticalTab
                    label='Super Salary Sacrifice'
                    desc='Lower your income tax with voluntary super contributions'
                    contents={<><table className='dropdown-table'>
                      <tbody>
                        <tr>
                          <td style={{ background: 'var(--dark-grey)' }}>
                            <SwitchToggle
                              dropdown={false}
                              label="Contribute up to concessional cap"
                              description={''}
                              setFunc={setMaximiseSuper}
                              infoTag={null}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <InputField
                              textColour='white'
                              headerColour='var(--dark-grey)'
                              backgroundColour='var(--dark-grey)'
                              label={"Voluntary Super contribution"}
                              id='super-sacrifice--amount'
                              value={voluntarySuperAmmount}
                              setFunc={(val) => { setVoluntarySuperAmmount(val); }}
                              styling='medium'
                              formatting={'monetary'}
                              rounding={2}
                              min={0}
                              max={null}
                            />
                          </td>
                        </tr>

                      </tbody>
                    </table>

                    </>}
                    toggleFunc={setHasSuperSalarySacrifise}
                    expandedVar={hasSuperSalarySacrifise}
                    infoTag={null}
                  />
                </div >
                {/* </td>
                    <td className='benefits-table-cell'> */}
                <div className='flex-cell'>
                  <ToggleExpandVerticalTab
                    label='Work Deductables'
                    desc='Subtract your work expenses from your taxable income'
                    contents={<>
                      <table className='dropdown-table'>
                        <tbody>
                          <tr>
                            <td>
                              <InputField
                                textColour='white'
                                headerColour='var(--dark-grey)'
                                backgroundColour='var(--dark-grey)'
                                label={"Deductable amount"}
                                id='work-deductables-amount'
                                value={workDeductablesAmount}
                                setFunc={(val) => { setWorkDeductablesAmount(val); }}
                                styling='medium'
                                formatting={'monetary'}
                                rounding={2}
                                min={0}
                                max={null}
                              />
                            </td>
                          </tr>

                        </tbody>
                      </table>
                    </>
                    }
                    toggleFunc={setHasWorkDeductions}
                    expandedVar={hasWorkDeductions}
                    infoTag={<HtmlTooltip
                      title={
                        <>
                          <b>Work Deductables</b> include:
                          <ul>
                            <li>Tools for work (computers, stationery)</li>
                            <li>Travel expenses for work</li>
                            <li>Education and training for work</li>
                          </ul>
                          A comprehensive list can be found
                          <a href="https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/work-related-deductions" target="_blank"> here</a>
                        </>
                      }
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: 'offset',
                              options: {
                                offset: [160, -60],
                              },
                            },
                          ],
                        },
                      }}
                    >
                      <AiFillInfoCircle />
                    </HtmlTooltip>}
                  />
                </div>
                {/* </td>
                  </tr>
                  <tr> */}

                {/* </tr>
                </tbody>
              </table> */}
              </div>
              <div>
                <p style={{ color: 'var(--hive-yellow)' }}><i>We also offer Living Away From Home Allowance (LAFHA), Banked Pay, and Banking Benefits. Learn more <a href='https://www.recruitmenthive.com.au/payroll-operations/' target='_blank' style={{ color: 'var(--hive-yellow)', fontWeight: 'bold' }}>here</a></i></p>
              </div>
            </>}

          />
        </div>
        <div id='summary-section'>
          {/* <div id='summary-div'> */}

          <table id='summary-table'>
            <tbody>
              <tr>
                <td colSpan={2}>
                  <IncomeTable
                    label=''
                    items={{
                      "#Taxable Income": [financialData['taxablebaseSalarySplit'].map(displayMoney), {
                        "Base salary": financialData['baseSalarySplit'].map(displayMoney),
                        "Concessional Voluntary Super": hasSuperSalarySacrifise ? financialData['voluntarySuperCon'][0].map((x) => displayMoney(-x)) : null,
                        "Work Deductables": hasWorkDeductions ? financialData['workDeductablesAmount'].map(displayMoney) : null,
                        "Novated Lease Pre-Tax Payment": financialData['novatedPayments'][0][0] != 0 ? financialData['novatedPayments'][0].map(displayMoney) : null,
                      }],
                      "#Superannuation": [financialData['superSplit'].map(displayMoney), {
                        "Employer Contribution": financialData['employerContribution'].map(displayMoney),
                        "Voluntary Contribution": financialData['voluntaryContribution'][4] != 0 ? financialData['voluntaryContribution'].map(displayMoney) : null
                      }],
                      "#Total Taxes": [financialData['taxSplit']['totalTax'].map(displayMoney), {
                        "Income Tax": financialData['taxSplit']['incomeTax'].map(displayMoney),
                        "LITO": financialData['taxSplit']['lito'] != null ? financialData['taxSplit']['lito'].map(displayMoney) : null,
                        "Student Loan": hasStudentLoan ? financialData['studentLoanContribution'].map(displayMoney) : null,
                        "Medicare Levy": financialData['taxSplit']['medicare'][4] != 0 ? financialData['taxSplit']['medicare'].map(displayMoney) : null,
                        "Division 293": financialData['taxSplit']['293'][4] != 0 ? financialData['taxSplit']['293'].map(displayMoney) : null,
                      }],

                    }}
                    oldTax={financialData['undeductedTax']}
                    totals={financialData['postTax'].map(displayMoney)}
                    totalItems={{
                      "Net Salary": financialData['grossSalary'].map(displayMoney),
                      "Non-concessional Voluntary Super": hasSuperSalarySacrifise ? financialData['voluntarySuperCon'][1].map((x) => displayMoney(-x)) : null,
                      "Mortage Repayments": hasMortage ? financialData['annualMortageSplit'].map((x) => displayMoney(-x)) : null,
                      "Novated Lease Post-Tax Payment": financialData['novatedPayments'][1][0] != 0 ? financialData['novatedPayments'][1].map(displayMoney) : null,
                    }} />
                  {optionsActive.length > 0 ?
                    <p style={{ color: 'var(--hive-yellow)', fontWeight: 'bold' }}>
                      Options Active: {optionsActive.map((option) => {
                        return (
                          <span style={{ color: 'black', fontWeight: 'bold' }}>
                            {option}
                          </span>
                        )

                      })}
                    </p>
                    :
                    null}
                </td>
              </tr>
            </tbody>
          </table>

          <div className='chart-block'>
            <PayrollPieChart title={'Salary Breakdown'} data={financialData['payrollData']} />
          </div>
        </div>

      </div >
    </>
  )
}

export default App

{/* <TaxBandBar title={'Tax Bands'} earnings={financialData['taxablebaseSalarySplit'][4]} barWidth={(600)} lowerLimit={18200} upperLimit={250000} taxBands={taxRates['2226']} /> */ }
{/* <DonutChart data={donutIncomeSummary} /> */ }


{/* <div style={{ textAlign: 'center', fontStyle: 'italic' }}>This calculator is an estimate</div> */ }
{/* </div > */ }
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
                              formatting={'monetary'}
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
{/* </td> */ }