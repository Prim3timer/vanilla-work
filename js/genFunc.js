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

function ElementCatcher(pages, mainContainer, guestId, motherShip, replyElement) {
 const roles =  JSON.parse(localStorage.getItem("roles"))
 this.shower = async function (e) {
    console.log(roles)
    console.log(guestId)
    e.preventDefault();
    const result = await pages;
    console.log(pages);
    const oneElement = result.map((content) => {
      if (
        guestId ||
        this.innerHTML == "forgot password" ||
        this.innerHTML == "sign up" ||
        this.innerHTML == "user settings" 
      ) {
        // if (content.firstElementChild.innerHTML == "users"){
        //   console.log(content.firstElementChild.innerHTML)
        //   console.log("it is it!")
        // }
        console.log(replyElement)
        if (this.innerHTML == content.firstElementChild.innerHTML) {
          console.log(roles.includes(5150))
          localStorage.setItem("current-page",content.firstElementChild.innerHTML )
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
export { timeClocking, timeClockings, ElementCatcher };
