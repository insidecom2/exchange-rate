export function convertSymbolLower(symbol: any): string{
    if (symbol) {
        return symbol.replace('/', '_').toLowerCase().trim();  
    }
    return symbol;
}

export function convertSymbolUpper(symbol: any) {
    if (symbol) {
        return symbol.replace('_','/').toUpperCase().trim();  
    }
    return symbol;
}

export function moneyFormat(number: number): string {
    if (number) {
        return Number(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');        
    }
    return '';
}