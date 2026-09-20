document.addEventListener('DOMContentLoaded', () => {
    // update copyright year
    const copyrightYear = document.getElementById('copyright-year')
    copyrightYear.innerHTML = new Date().getFullYear().toString();
});
