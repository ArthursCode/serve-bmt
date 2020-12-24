export const scrollTop = () => {
  const scrollToTop = window.setInterval(() => {
    const pos = window.pageYOffset;
    if (pos > 0) {
      window.scrollTo(0, pos - 20); // how far to scroll on each step
    } else {
      window.clearInterval(scrollToTop);
    }
  }, 12);
};

export const scrollBottom = (target) => {
  setTimeout(() => {
    target.parentElement.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
  });
};
