const performance = () => {
  const aboutCont = document.createElement("div");
  aboutCont.className = "performance";
  const secondContent = document.createElement("h3");
  //   secondContent.className = "performance-header";
  //   secondContent.style.marginTop = "4rem";
  secondContent.innerHTML = "performance";
  aboutCont.appendChild(secondContent);
  return aboutCont;
};

export { performance };
