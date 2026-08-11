import myUrl from "./myUrl.js";

const usersPage = () => {
  const main = document.createElement("div");
  main.className = "performance";
  const usersHeader = document.createElement("h3");
  //   usersHeader.className = "usersPage-header";
  //   usersHeader.style.marginTop = "4rem";
  usersHeader.innerHTML = "users";
  main.appendChild(usersHeader);

  return main;
};

export { usersPage };
