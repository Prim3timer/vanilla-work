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
        ? `${sec % 60}s`
        : sec < 60
          ? ` ${sec % 60}s`
          : sec % 60 >= 10
            ? `${Math.floor(sec / 60)}min, ${sec % 60}s`
            : sec < 10
              ? `${sec % 60}s`
              : `${Math.floor(sec / 60)}min, ${sec % 60}s`
  }`;
};

function ElementCatcher(pages, mainContainer, guestId) {
  this.shower = async function (e) {
   const roles =  JSON.parse(localStorage.getItem("roles"))
   e.preventDefault();
    console.log(roles)
    console.log(guestId)
    const result = await pages;
    const oneElement = result.map((content) => {
      console.log(content.className);
      if (
        guestId ||
        this.innerHTML == "forgot" ||
        this.innerHTML == "reg-link" ||
        this.innerHTML == "usersettings" 
      ) {
        if (this.id == content.className) {
          console.log(content.className)
          console.log(this.innerHTML, content.className)
          console.log(roles.includes(5150))
          localStorage.setItem("current-page", content.className)
          if (mainContainer.children.length > 0) {
            
            mainContainer.firstElementChild.replaceWith(content);
            console.log(content.firstElementChild.innerHTML);
            return;
          } else {
            mainContainer.appendChild(content);
            return content;
          }
          }
      }
      return content;
    });
}
}

const getSpecificPage = (e, page, mainContainer) => {
    e.preventDefault()
     if (mainContainer.children.length > 0) {
            mainContainer.firstElementChild.replaceWith(page());
            return;
          } else {
            mainContainer.appendChild(page());
          }
  }

  let genId
export { timeClocking, timeClockings, ElementCatcher, getSpecificPage, genId };
