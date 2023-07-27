const modifiers = {
    tabItemActive : 'tabs__item--active',
    tabPanelItemActive: 'tabpanels__item--active',
    accordionItemOpen: 'accordion__item--open'
}


const elsTabsItem = document.querySelectorAll('.tabs__item');
const elsTabLink = document.querySelectorAll('.js-tab-link');
const elsTabsPanel = document.querySelectorAll('.tabpanels__item');

const elAccordion = document.querySelector('.accordion');
const elsAccordionItem = document.querySelectorAll('.accordion__item');

function deactivateTabsItem () {
    elsTabsItem.forEach(function (elTabsItem) {
        elTabsItem.classList.remove(modifiers.tabItemActive);
    })
}

function deactivateTabsPanel () {
    elsTabsPanel.forEach(function (elTabsPanel) {
        elTabsPanel.classList.remove(modifiers.tabPanelItemActive);
    })
}

function closeAccordionItems () {
    elsAccordionItem.forEach(function (elAccordionItem) {
        elAccordionItem.classList.remove(modifiers.accordionItemOpen);
    })
}

elsTabLink.forEach(function (elTabLink) {
    elTabLink.addEventListener('click', function (evt) {
        // Prevent page move
        evt.preventDefault();

        // Remove active class from tabs__item elements
        deactivateTabsItem();
        
        // Add active class to current tabs__item
        elTabLink.parentElement.classList.add(modifiers.tabItemActive);
        
        // Remove active class from tabs__panel elements
        deactivateTabsPanel();

        // Show active tab panel
        // const elTargetPanel = document.querySelector(`#${elTabLink.href.split('#')[1]}`);
        const elTargetPanel = document.querySelector(elTabLink.dataset.tabTarget);

        elTargetPanel.classList.add(modifiers.tabPanelItemActive);
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
                    !elAccordionItem.classList.contains(modifiers.accordionItemOpen) && closeAccordionItems();
                    elAccordionItem.classList.toggle(modifiers.accordionItemOpen);
                }
            })
        }
    })
}

