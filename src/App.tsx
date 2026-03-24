import PayCalculator from './payCalculator'
import MortageCalculator from './mortageCalculator';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {

    return (
        <BrowserRouter>
            {/* Navigation */}
            {/* <nav>
                <Link to="/pay-calculator">Pay Calculator</Link>
                <Link to="/mortage-calculator">Mortage Calculator</Link>
            </nav> */}

            {/* Routes */}
            <Routes>
                <Route path="/pay-calculator" element={<PayCalculator />} />
                <Route path="/mortage-calculator" element={<MortageCalculator />} />
            </Routes>
        </BrowserRouter>
    );
}