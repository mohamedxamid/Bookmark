const elsTabsItem = document.querySelectorAll('.tabs__item');
const elsTabLink = document.querySelectorAll('.js-tab-link');
const elsTabsPanel = document.querySelectorAll('.tabpanels__item');
const elAccordion = document.querySelector('.accordion');
const elsAccordionItem = document.querySelectorAll('.accordion__item');

function deactivateTabsItem () {
    elsTabsItem.forEach(function (elTabsItem) {
        elTabsItem.classList.remove('tabs__item--active');
    })
}

function deactivateTabsPanel () {
    elsTabsPanel.forEach(function (elTabsPanel) {
        elTabsPanel.classList.remove('tabpanels__item--active');
    })
}

function closeAccordionItems () {
    elsAccordionItem.forEach(function (elAccordionItem) {
        elAccordionItem.classList.remove('accordion__item--open');
    })
}

elsTabLink.forEach(function (elTabLink) {
    elTabLink.addEventListener('click', function (evt) {
        // Prevent page move
        evt.preventDefault();

        // Remove active class from tabs__item elements
        deactivateTabsItem();
        
        // Add active class to current tabs__item
        elTabLink.parentElement.classList.add('tabs__item--active');
        
        // Remove active class from tabs__panel elements
        deactivateTabsPanel();

        // Show active tab panel
        // const elTargetPanel = document.querySelector(`#${elTabLink.href.split('#')[1]}`);
        const elTargetPanel = document.querySelector(elTabLink.dataset.tabTarget);

        elTargetPanel.classList.add('tabpanels__item--active');
    })
})

// Accordion
// knopkani event deligation orqali olaman olib kevolaman
if (elAccordion) {
    elAccordion.addEventListener('click', function (evt) {
        if(evt.target.matches('.accordion__item-toggler')) {
            // item sectionni olib kevolaman
            elsAccordionItem.forEach(function (elAccordionItem) {
                if(elAccordionItem === evt.target.closest('.accordion__item')) {
                    !elAccordionItem.classList.contains('accordion__item--open') && closeAccordionItems();
                    elAccordionItem.classList.toggle('accordion__item--open');
                }
            })
        }
    })
}

