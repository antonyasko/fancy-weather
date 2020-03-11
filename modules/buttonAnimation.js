const animation = {
  mouseDown: function animationMouseDown(e, tl, tr, bl, br) {
    const button = e.target;
    button.style.borderTopLeftRadius = `${tl}%`;
    button.style.borderTopRightRadius = `${tr}%`;
    button.style.borderBottomLeftRadius = `${bl}%`;
    button.style.borderBottomRightRadius = `${br}%`;
  },
  mouseUp: function animationMouseUp(e, tl, tr, bl, br) {
    const button = e.target;
    button.style.borderTopLeftRadius = `${tl}px`;
    button.style.borderTopRightRadius = `${tr}px`;
    button.style.borderBottomLeftRadius = `${bl}px`;
    button.style.borderBottomRightRadius = `${br}px`;
  },
  mouseOver: function animationMouseOver(e, unit) {
    const button = e.target;
    if (button.classList.contains('celsius') && unit === 'fahrenheit') {
      button.style.backgroundColor = '#20b2aa';
      button.style.color = '#ffffff';
    }
    if (button.classList.contains('fahrenheit') && unit === 'celsius') {
      button.style.backgroundColor = '#20b2aa';
      button.style.color = '#ffffff';
    }
  },

  mouseOut: function animationMouseOut(e, unit) {
    const button = e.target;
    if (button.classList.contains('celsius') && unit === 'fahrenheit') {
      button.style.backgroundColor = '#4c5255';
      button.style.color = '#ffffff66';
    }
    if (button.classList.contains('fahrenheit') && unit === 'celsius') {
      button.style.backgroundColor = '#4c5255';
      button.style.color = '#ffffff66';
    }
  },
};

module.exports = animation;
