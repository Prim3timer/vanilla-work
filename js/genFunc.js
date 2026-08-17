import myUrl from "./myUrl.js";

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
const timeClockings = (sec) => {
  return ` ${
    // if sec is greater than an hour
    sec > 3600
      ? `${Math.floor(sec / 3600)}hrs, ${Math.floor((sec % 3600) / 60)}min, ${Math.floor((sec % 3600) % 60) < 10 ? 0 : ""}${Math.floor((sec % 3600) % 60)}s `
      : sec < 10
        ? `:${sec % 60}s`
        : sec < 60
          ? ` ${sec % 60}s`
          : sec % 60 >= 10
            ? `${Math.floor(sec / 60)}min, ${sec % 60}s`
            : sec < 10
              ? `${sec % 60}s`
              : `${Math.floor(sec / 60)}min, ${sec % 60}s`
  }`;
};

function ElementCatcher(pages, mainContainer) {
  this.shower = async function (e) {
    e.preventDefault();
    const result = await pages;
    console.log(pages);
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

export { timeClocking, timeClockings, ElementCatcher };
