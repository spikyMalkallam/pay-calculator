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