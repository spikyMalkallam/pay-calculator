import PayCalculator from './payCalculator'
import MortageCalculator from './mortageCalculator';
import { HashRouter, Routes, Route } from 'react-router-dom';

export default function App() {

    return (
        <HashRouter>
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
        </HashRouter>
    );
}