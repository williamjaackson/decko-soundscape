const endpoint = 'https://williamjaackson.github.io/api/decko.json';

function takedown(reason) {
    document.body.outerHTML = `<h1>403 - Forbidden</h1><p>You have been blocked due to: '${reason}'</p><strong>If this is a mistake, please contact the website administrator.</strong>`;
    document.head.innerHTML = '<title>403 - Forbidden</title>';
}

document.addEventListener('DOMContentLoaded', () => {
    // update copyright year
    const copyrightYear = document.getElementById('copyright-year')
    copyrightYear.innerHTML = new Date().getFullYear().toString();


    // nocache
    fetch(endpoint, {cache: "no-store"})
        .catch(error => {takedown('Error fetching external resources.');})
        .then(response => response.json())
        .then(data => {
            const websiteURL = data.website;
            const creditsWebsite = document.getElementById('credits-website');
            creditsWebsite.href = websiteURL;

            if (data.takedown) {
                takedown(data.takedown);
            }
        });
});