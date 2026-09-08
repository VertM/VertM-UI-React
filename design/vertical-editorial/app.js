const titleField = document.querySelector('#title-field');
const bodyField = document.querySelector('#body-field');

function bindCounter(field, output) {
  const update = () => {
    output.textContent = `${field.value.length} / ${field.maxLength}`;
  };
  field.addEventListener('input', update);
  update();
}

bindCounter(titleField, document.querySelector('#title-count'));
bindCounter(bodyField, document.querySelector('#body-count'));

const select = document.querySelector('[data-select]');
const selectTrigger = select.querySelector('.vm-select__trigger');
const selectValue = select.querySelector('.vm-select__value');
const selectOptions = [...select.querySelectorAll('[role="option"]')];

function setSelectOpen(open) {
  select.classList.toggle('is-open', open);
  selectTrigger.setAttribute('aria-expanded', String(open));
  if (open) selectOptions[0]?.focus();
}

function chooseOption(option) {
  selectOptions.forEach((item) => item.setAttribute('aria-selected', String(item === option)));
  selectValue.textContent = option.dataset.value;
  setSelectOpen(false);
  selectTrigger.focus();
}

selectTrigger.addEventListener('click', () => {
  setSelectOpen(!select.classList.contains('is-open'));
});

selectOptions.forEach((option, index) => {
  option.addEventListener('click', () => chooseOption(option));
  option.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      selectOptions[(index + 1) % selectOptions.length].focus();
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      selectOptions[(index - 1 + selectOptions.length) % selectOptions.length].focus();
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      chooseOption(option);
    }
    if (event.key === 'Escape') {
      setSelectOpen(false);
      selectTrigger.focus();
    }
  });
});

document.addEventListener('pointerdown', (event) => {
  if (!select.contains(event.target)) setSelectOpen(false);
});

const menuItems = [...document.querySelectorAll('.vm-column-menu__item')];
menuItems.forEach((item) => {
  item.addEventListener('click', () => {
    menuItems.forEach((candidate) => {
      const active = candidate === item;
      candidate.classList.toggle('is-active', active);
      candidate.setAttribute('aria-pressed', String(active));
    });
  });
});

const tabs = document.querySelector('[data-tabs]');
const tabButtons = [...tabs.querySelectorAll('[role="tab"]')];
const tabPanels = [...tabs.querySelectorAll('[role="tabpanel"]')];

function activateTab(target) {
  tabButtons.forEach((button) => {
    button.setAttribute('aria-selected', String(button === target));
  });
  tabPanels.forEach((panel) => {
    panel.hidden = panel.dataset.panel !== target.dataset.tab;
  });
}

tabButtons.forEach((button, index) => {
  button.addEventListener('click', () => activateTab(button));
  button.addEventListener('keydown', (event) => {
    if (!['ArrowRight', 'ArrowLeft'].includes(event.key)) return;
    event.preventDefault();
    const delta = event.key === 'ArrowRight' ? 1 : -1;
    const next = tabButtons[(index + delta + tabButtons.length) % tabButtons.length];
    activateTab(next);
    next.focus();
  });
});

const form = document.querySelector('#profile-form');
const formResult = document.querySelector('#form-result');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let valid = true;

  form.querySelectorAll('[required]').forEach((field) => {
    const column = field.closest('.vm-form-column');
    const error = column.querySelector('.vm-form-column__error');
    const invalid = !field.value.trim();
    column.classList.toggle('is-invalid', invalid);
    field.setAttribute('aria-invalid', String(invalid));
    if (error) error.textContent = invalid ? 'Required field' : '';
    if (invalid) valid = false;
  });

  formResult.textContent = valid ? 'Form state: ready' : '';
});
