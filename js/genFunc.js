let sec = 0;
const timeClocking = (sec) => {
  return ` ${
    sec > 3600
      ? `${Math.floor(sec / 3600)}:${Math.floor((sec % 3600) / 60) < 10 ? 0 : ""}${Math.floor((sec % 3600) / 60)}:${Math.floor((sec % 3600) % 60) < 10 ? 0 : ""}${Math.floor((sec % 3600) % 60)} `
      : sec < 10
        ? `:0${sec % 60}`
        : sec < 60
          ? ` :${sec % 60}`
          : sec % 60 >= 10
            ? `${Math.floor(sec / 60)}:${sec % 60}`
            : sec < 10
              ? 0`${sec % 60}`
              : `${Math.floor(sec / 60)}:0${sec % 60}`
  }`;
};

function ElementCatcher(pages, mainContainer) {
  this.shower = async function (e) {
    const result = await pages;
    console.log(pages);
    e.preventDefault();
    const oneElement = result.map((content) => {
      if (this.innerHTML == content.firstElementChild.innerHTML) {
        if (mainContainer.children.length > 0) {
          mainContainer.firstElementChild.replaceWith(content);
          return;
        } else {
          mainContainer.appendChild(content);
          return;
        }
      }
      return pages;
    });
  };
}

export { timeClocking, ElementCatcher };
