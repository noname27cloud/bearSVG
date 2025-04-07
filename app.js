const info = document.getElementById("info");

document.querySelectorAll(".star-1").forEach((element) => {
  element.addEventListener("mouseover", (event) => {
    const lessonName = event.target.getAttribute("lesson-name") || "No date";
    const level = event.target.getAttribute("level") || "No date";
    const status = event.target.getAttribute("status") || "No date";
    const xp = event.target.getAttribute("xp") || "No date";

    info.innerHTML = `<strong>${lessonName}</strong> </br> <strong>Level:</strong>  ${level} </br> <strong>Status:</strong>  ${status} </br> <strong>XP:</strong>  ${xp}`;
    info.style.display = "block";
    info.style.left = event.pageX + 10 + "px";
    info.style.top = event.pageY + 10 + "px";
    if (status === "inactive") {
      info.style.opacity = "0.5";
      event.target.style.opacity = "0.5";
    } else {
      info.style.opacity = "1";
      event.target.style.opacity = "1";
    }
  });

  element.addEventListener("mouseout", () => {
    info.style.display = "none";
    element.style.opacity = "1";
  });
});
