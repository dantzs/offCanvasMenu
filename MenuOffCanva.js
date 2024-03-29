'use strict';

window.addEventListener('load', function () {
  toggleOffCanvas(0);
});

function toggleOffCanvas(index) {
  const offCanvas = document.getElementById(`off-canvas${index}`);

  if (offCanvas) {
    const offCanvasButtons = document.querySelectorAll('.menu__item');

    offCanvas.style.right = '0%';

    offCanvasButtons.forEach((button, i) => {
      if (i + 1 !== index) {
        const otherOffCanvas = document.getElementById(`off-canvas${i + 1}`);
        if (otherOffCanvas) {
          otherOffCanvas.style.right = '-100%';
        }
      }
    });
  }
}

const body = document.body;
const menu = body.querySelector('.menu');
const menuItems = menu.querySelectorAll('.menu__item');
const menuBorder = menu.querySelector('.menu__border');
let activeItem = menu.querySelector('.active');

function clickItem(item, index) {
  menu.style.removeProperty('--timeOut');

  if (activeItem == item) return;

  if (activeItem) {
    activeItem.classList.remove('active');
  }

  item.classList.add('active');
  activeItem = item;
  offsetMenuBorder(activeItem, menuBorder);
}

function offsetMenuBorder(element, menuBorder) {
  const offsetActiveItem = element.getBoundingClientRect();
  const left =
    Math.floor(
      offsetActiveItem.left -
        menu.offsetLeft -
        (menuBorder.offsetWidth - offsetActiveItem.width) / 2
    ) + 'px';
  menuBorder.style.transform = `translate3d(${left}, 0 , 0)`;
}

offsetMenuBorder(activeItem, menuBorder);

menuItems.forEach((item, index) => {
  item.addEventListener('click', () => clickItem(item, index));
});

window.addEventListener('resize', () => {
  offsetMenuBorder(activeItem, menuBorder);
  menu.style.setProperty('--timeOut', 'none');
});
