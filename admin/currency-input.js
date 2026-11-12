function formatCurrencyInput(input) {
    const rawValue = input.value;
    const cursorPosition = input.selectionStart === null ? rawValue.length : input.selectionStart;
    const formatValue = value => value
        .replace(/\./g, '')
        .replace(/\d+/g, digits => digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
    const formattedValue = formatValue(rawValue);
    const nextCursorPosition = formatValue(rawValue.slice(0, cursorPosition)).length;

    input.value = formattedValue;
    input.setSelectionRange(nextCursorPosition, nextCursorPosition);
}

document.querySelectorAll('[data-currency-input]').forEach(input => {
    input.addEventListener('input', () => formatCurrencyInput(input));
});
