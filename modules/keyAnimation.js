const keyAnimation = {
  keyDown: function animationMouseDown(b, tl, tr, bl, br) {
    const button = b;
    button.style.borderTopLeftRadius = `${tl}%`;
    button.style.borderTopRightRadius = `${tr}%`;
    button.style.borderBottomLeftRadius = `${bl}%`;
    button.style.borderBottomRightRadius = `${br}%`;
  },
  keyUp: function animationMouseUp(b, tl, tr, bl, br) {
    const button = b;
    button.style.borderTopLeftRadius = `${tl}px`;
    button.style.borderTopRightRadius = `${tr}px`;
    button.style.borderBottomLeftRadius = `${bl}px`;
    button.style.borderBottomRightRadius = `${br}px`;
  },
};

module.exports = keyAnimation;
