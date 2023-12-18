const modifiers = {
    siteHeaderActive: "site-header--active",
    sitenavActive: "site-header__sitenav-toggler--active",
    tabItemActive : 'tabs__item--active',
    tabPanelItemActive: 'tabpanels__item--active',
    accordionItemOpen: 'accordion__item--open'
}

const form = document.querySelector('form.subscription__form')

if (form) {
    form.addEventListener('submit', (evt) => {
        evt.preventDefault()

        const formData = new FormData(form)
        const json = JSON.stringify(Object.fromEntries(formData.entries()))

        fetch('http://localhost:3000/requests', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: json,
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
        .finally(() => form.reset())
    })
}


const elSiteHeader = document.querySelector('.site-header');
const elSitenavToggler = elSiteHeader.querySelector('.site-header__sitenav-toggler');
const elSitenavTogglerClose = elSiteHeader.querySelector('.sitenav-menu__close');

if (elSitenavToggler) {
    elSitenavToggler.addEventListener('click', function () {
        elSitenavToggler.classList.toggle(modifiers.sitenavActive);
        elSiteHeader.classList.add(modifiers.siteHeaderActive);
        document.body.style.overflow = 'hidden'
    })
}

if (elSitenavTogglerClose) {
    elSitenavTogglerClose.addEventListener('click', function () {
        elSitenavToggler.classList.toggle(modifiers.sitenavActive);
        elSiteHeader.classList.remove(modifiers.siteHeaderActive);
        document.body.style.overflow = ''
    })
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
        elAccordionItem.querySelector('.accordion__item-content').style.height = 0;
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
                    if(elAccordionItem.classList.contains(modifiers.accordionItemOpen)) {
                        elAccordionItem.querySelector('.accordion__item-content').style.height = `${elAccordionItem.querySelector('.accordion__item-content').scrollHeight}px`
                    } else {
                        elAccordionItem.querySelector('.accordion__item-content').style.height = 0
                    }
                }
            })
        }
    })
}

