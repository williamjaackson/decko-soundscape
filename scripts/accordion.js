function toggle(accordionBody, accordionButton) {
    accordionBody = document.querySelector(accordionBody);
    accordionBody.classList.toggle('hidden');

    accordionButton = document.querySelector(accordionButton);
    accordionButton.classList.toggle('rotate-180');

}

window.accordion = {
    toggle,
};