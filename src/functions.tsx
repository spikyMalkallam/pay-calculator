import Tooltip from '@mui/material/Tooltip';
import { type TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

export function displayMoney(num: number): string {
    if (num == 0) {
        return '-';
    }
    let output = Intl.NumberFormat().format(Number(num)).split('.')
    if (output.length < 2) {
        output.push('00');
    }
    else if (output.length == 2) {
        output[1] = output[1].length == 1 ? output[1] + '0' : output[1];
    }

    return '$' + output[0] + '.' + output[1]
}

export function displayPercentage(num: number): string {
    if (num == 0) {
        return '-';
    }
    let output = Intl.NumberFormat().format(Number(num)).split('.')
    if (output.length < 2) {
        output.push('00');
    }
    else if (output.length == 2) {
        output[1] = output[1].length == 1 ? output[1] + '0' : output[1];
    }

    return output[0] + '.' + output[1] + '%'
}

export function round(num: number, fractionDigits: number): number {
    return Number(num.toFixed(fractionDigits));
}

export const PMT = (rate: number, nper: number, pv: number) => (rate * pv) / (1 - Math.pow(1 + rate, -nper));

export const NPER = (rate: number, pmt: number, pv: number, fv: number = 0): number => Math.log((pmt - fv * rate) / (pmt + pv * rate)) / Math.log(1 + rate);

export const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />))
    (({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 300,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
        },
    }));
