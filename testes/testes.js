document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const paragraph = document.getElementById('p');

    input.addEventListener('input', () => {
        paragraph.textContent = input.value;
    });
});
