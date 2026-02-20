import { PieChart } from '@mui/x-charts/PieChart';
import { IoMdArrowDropup } from "react-icons/io";
// import p5 from 'p5';
import './graphs.css'

type GraphProps = {
    data: any;
};
type TaxBandBarProps = {
    title: string;
    earnings: number;
    barWidth: number;
    lowerLimit: number;
    upperLimit: number;
    taxBands: Record<number, number[]>;
}

const settings = {
    margin: { right: 5, top: 5, left: 5, bottom: 5 },
    width: 300,
    height: 300,
    hideLegend: false,
};

export function DonutChart({ data }: GraphProps) {
    return (
        <PieChart
            series={[{ innerRadius: 60, outerRadius: 120, data }]}
            {...settings}
        />
    );
}

export function TaxBandBar({ title, earnings, barWidth, lowerLimit, upperLimit, taxBands }: TaxBandBarProps) {
    const bandsArray = Object.keys(taxBands).map(k => parseFloat(k)).sort((a, b) => a - b);
    let linePositions: number[] = bandsArray.map(band => ((band - lowerLimit) / (upperLimit - lowerLimit)) * barWidth);

    earnings = earnings > upperLimit ? upperLimit : earnings;
    let scaledEarnings = ((earnings - lowerLimit) / (upperLimit - lowerLimit)) * barWidth;
    scaledEarnings = scaledEarnings < 0 ? 0 : scaledEarnings;

    const gradientStyle: React.CSSProperties = {
        width: barWidth,
        position: 'relative', // Changed from absolute or inherited
        margin: '0 auto',     // Centers the bar within the .tax-band-bar div
        background: `linear-gradient(to right, 
            #f2ba2e ${linePositions[0]}px ${linePositions[1]}px, 
            #eea727 ${linePositions[1]}px ${linePositions[2]}px, 
            #e48f18 ${linePositions[2]}px ${linePositions[3]}px, 
            #e28a15 ${linePositions[3]}px 100%
        )`,
    };

    return (
        <div className='tax-band-bar' style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 className='band-header'>{title}</h2>
            <div className='background-gradient' style={gradientStyle}>
                <div className='overlay-bar' style={{ width: barWidth - scaledEarnings, left: scaledEarnings < 0 ? 0 : scaledEarnings }}></div>
                {linePositions.map((pos, index) => (
                    <div key={index} className='vertical-line' style={{ left: pos }}>
                        <span className='tax-band-info'>${bandsArray[index]}</span>
                        <br />
                        <span className='tax-band-info'>{(taxBands[bandsArray[index]]?.[0]) * 100}%</span>
                    </div>
                ))}
                <div className='tax-band-arrow' style={{ left: (scaledEarnings < 0 ? 0 : scaledEarnings) - 15 }}>
                    <IoMdArrowDropup />{earnings}
                </div>
            </div>
        </div>
    );
}

import { pieArcLabelClasses } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
// 1. Data Structure
export interface SubCategory {
    id: string;
    label: string;
    value: number;
    color: string;
}

export interface MainCategory {
    id: string;
    label: string;
    color: string;
    subCategories: SubCategory[];
}

type PayrollPieProps = {
    data: MainCategory[];
    title: string;
}

export default function PayrollPieChart({ data, title }: PayrollPieProps) {
    // 2. Data Processing
    const totalValue = data.reduce(
        (acc, cat) => acc + cat.subCategories.reduce((sum, sub) => sum + sub.value, 0),
        0
    );

    // Inner Ring: Main Categories
    const mainRingData = data.map((cat) => ({
        id: cat.id,
        label: cat.label,
        value: cat.subCategories.reduce((sum, sub) => sum + sub.value, 0),
        color: cat.color,
    }));

    // Outer Ring: Sub Categories
    const subRingData = data.flatMap((cat) =>
        cat.subCategories.map((sub) => ({
            id: sub.id,
            label: sub.label,
            value: sub.value,
            // Slightly lighten/desaturate the sub-category based on parent color
            color: sub.color, // Using the unique sub-color
        }))
    );
    const innerRadius = 50;
    const middleRadius = 110;
    const outerRadius = 130;

    return (
        <Box sx={{ maxWidth: 350, height: 380, textAlign: 'center' }}>
            <h2 style={{ margin: '20px 10px 0px 10px' }}>{title}</h2>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: 350, height: 350 }}>
                <PieChart
                    series={[
                        {
                            // Inner Ring (Main Categories)
                            data: mainRingData,
                            innerRadius: innerRadius,
                            outerRadius: middleRadius,
                            paddingAngle: 2,
                            cornerRadius: 4,
                            arcLabel: (item) => `${item.label}`,
                            highlightScope: { fade: 'global', highlight: 'item' },
                        },
                        {
                            // Outer Ring (Sub-Categories)
                            data: subRingData,
                            innerRadius: middleRadius + 5,
                            outerRadius: outerRadius,
                            paddingAngle: 1,
                            cornerRadius: 2,
                            arcLabel: (item) => `${((item.value / totalValue) * 100).toFixed(0)}%`,
                            arcLabelRadius: outerRadius + 20, // Move labels outside
                            highlightScope: { fade: 'global', highlight: 'item' },
                        },
                    ]}
                    sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                            fontSize: '12px',
                            fontWeight: 'bold',
                        },
                    }}
                    slotProps={{
                        // legend: {
                        //     direction: 'horizontal' as const,
                        //     position: { vertical: 'bottom', horizontal: 'center' },
                        // },

                    }}
                    slots={{ legend: () => null }}
                >
                </PieChart>
            </Box>
        </Box >
    );
}