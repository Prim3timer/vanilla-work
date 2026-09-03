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

// 1. Select the root element containing the target child
const rootElement = document.getElementById('main-page'); 

// 2. Define the callback function to run when a change is detected
const callback = (mutationsList) => {
    for (const mutation of mutationsList) {
        // Check if a child node was added or removed
        if (mutation.type === 'childList') {
            console.log('Child element changed. Reloading page...');
            window.location.reload();
            break; // Stop looping once we trigger the reload
        }
    }
};

// 3. Create the observer instance
const observer = new MutationObserver(callback);


function ElementCatcher(pages, mainContainer, guestId) {
  this.shower = async function (e) {
   const roles =  JSON.parse(localStorage.getItem("roles"))
   e.preventDefault();
    console.log(roles)
    console.log(guestId)
    const result = await pages;
    const oneElement = result.map((content) => {
      if (
        guestId ||
        this.innerHTML == "forgot" ||
        this.innerHTML == "reg-link" ||
        this.innerHTML == "usersettings" 
      ) {
        if (this.id == content.className) {
          if (!roles.includes(5150 ) && this.innerHTML == "users"){
            console.log("unauthorized")
          } else {
            localStorage.setItem("current-page", content.className)
            if (mainContainer.children.length > 0) {
              
              mainContainer.firstElementChild.replaceWith(content);

              return;
            } else {
              mainContainer.appendChild(content);
              
            }
          }
        }
        observer.observe(rootElement, { childList: true,
subtree: false
});
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

export { timeClocking, timeClockings, ElementCatcher, getSpecificPage };
