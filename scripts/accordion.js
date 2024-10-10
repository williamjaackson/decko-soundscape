function toggle(accordionBody, accordionButton) {
    const accordionBody = document.querySelector(accordionBody);
    accordion.classList.toggle('hidden');

    const accordionButton = document.querySelector(accordionButton);
    
}

window.accordion = {
    toggle,
};