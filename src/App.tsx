import { useState } from 'react'
import './App.css'
import DropdownInformation from './dropdown'
import useToggle from './hooks/useToggle'

function App() {
  const [salary, setSalary] = useState(60000)
  // 0: 1: 2: 3: 4: 5: 6:
  const [payCycle, setPayCycle] = useState('Annual')
  const [fortnightlyWorkHours, setFortnightlyWorkHours] = useState(0)
  const [salaryIncludesSuper, setSalaryIncludesSuper] = useToggle()
  const [studentLoan, setStudentLoan] = useToggle()
  const [bonus, setBonus] = useState(0)
  const [bonusFrequency, setBonusFrequency] = useState('')
  const [payFrequency, setPayFrequency] = useState('Annual')
  const [taxYear, setTaxYear] = useState('1819')
  const [payAmount, setPayAmount] = useState(0)
  const [hasBonus, setHasBonus] = useToggle()

  return (
    <>
      <div id='income-div'>
        <h1>INCOME</h1>
        <table>
          <thead>
            <tr>
              <td>
                Enter your salary, adjust the settings and see the results in the summary below.
              </td>
              <td>
                <button>
                  Reset Calculator
                </button>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td id="salary-box">
                <p>{payCycle} Salary</p>
                <input
                  type="number"
                  id="salary-input"
                  value={salary}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setSalary(val);
                  }}
                />
                <br></br>

              </td>
              <td>
                {payCycle == "Hourly" ? <a href="https://www.fairwork.gov.au/pay-and-wages/minimum-wages/pay-guides">Check Award rates</a> : <></>}
                <p>{payCycle == "Daily" || payCycle == "Hourly" ? "Casual" : "Pro-rata"}  or Part-time hours</p>
              </td>
            </tr>
            <tr>
              <td id="cycle-box">
                <p>Pay Cycle</p>
                <select
                  id="pay-cycle-input"
                  // value={frequency}
                  onChange={(e) => setPayCycle(e.target.value)}
                >
                  <option value="Annual">Annually</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Fortnightly">Fortnightly</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Daily">Daily</option>
                  <option value="Hourly">Hourly</option>
                </select>
              </td>

              <td rowSpan={2}>
                <table>
                  <tbody>
                    <tr>
                      <td colSpan={2}>
                        <button onClick={setHasBonus}>Bonus Pay</button>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <p>{hasBonus ? bonusFrequency + "Bonus" : ""}</p>
                      </td>
                      <td>
                        <p>{hasBonus ? 'Frequency' : ''}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>{hasBonus ?
                        <input
                          type="number"
                          id="bonus-amount-input"
                          value={bonus}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setBonus(val);
                          }}
                        /> : ''}
                      </td>
                      <td>{hasBonus ?
                        <select
                          id="bonus-frequency-input"
                          value={bonusFrequency}
                          onChange={(e) => setBonusFrequency(e.target.value)}
                        >
                          <option value="Annual">Annually</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Fortnightly">Fortnightly</option>
                          <option value="Weekly">Weekly</option>
                          <option value="Percent">Percent</option>
                        </select> : ''}
                      </td>
                    </tr>


                    <tr>

                      <td colSpan={2}>
                        <button onClick={setSalaryIncludesSuper}>Salary includes Superannuation</button>
                        <span> Super Guarantee of $[SUPER AMMOUNT] is paid on top of your ${salary} [CONVERT TO ANNUAL SALARY] annual salary</span>
                      </td>
                    </tr>
                    <tr>

                      <td colSpan={2}>
                        <button onClick={setStudentLoan}>Student loan</button>
                        <span>HELP (HECS), VSL, TSL, SSL, SFSS</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <p>
                  OVERTIME
                </p>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                EXTRA SETTINGS
              </td>
            </tr>
          </tbody>
        </table>
      </div >
      <div id='summary-div'>
        <h1>SUMMARY</h1>
        <table id='summary-table'>
          <tbody>
            <tr>
              <td>
                <p>Tax Year</p>
                <select
                  id="tax-year-input"
                  value={taxYear}
                  onChange={(e) => setTaxYear(e.target.value)}
                >
                  <option value="1819">2018 - 19</option>
                  <option value="1920">2019 - 20</option>
                  <option value="2021">2020 - 21</option>
                  <option value="2122">2021 - 22</option>
                  <option value="2223">2022 - 23</option>
                  <option value="2324">2023 - 24</option>
                  <option value="2425">2024 - 25</option>
                  <option value="2526">2025 - 26</option>
                  <option value="2627">2026 - 27</option>
                  <option value="2728">2027 - 28</option>
                </select>
              </td>
              <td>
                <p>Pay Frequency</p>
                <select
                  id="pay-frequency-input"
                  value={payFrequency}
                  onChange={(e) => setPayFrequency(e.target.value)}
                >
                  <option value="Annual">Annually</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Fortnightly">Fortnightly</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Daily">Daily</option>
                  <option value="Hourly">Hourly</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <span>
                  {payFrequency} Pay
                </span>
              </td>
              <td>
                <span>
                  ${payAmount}
                </span>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <DropdownInformation
                  label="Taxable Income"
                  total={salary}
                  items={{ "Base salary": salary, "Bonus pay": salary }}
                />
                <DropdownInformation
                  label="Superannuation"
                  total={salary}
                  items={{ "Super Guarantee": salary, "Tax": salary }}
                />
                <DropdownInformation
                  label="Tax"
                  total={salary}
                  items={{ "Income tax": salary, "LITO": salary }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
