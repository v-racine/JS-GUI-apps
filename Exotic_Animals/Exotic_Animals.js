document.addEventListener("DOMContentLoaded", () => {
  const mainDiv = document.querySelector("#exotic_animals");
  const captions = document.querySelectorAll("figcaption");
  let timer;

  mainDiv.addEventListener(
    "mouseenter",
    (e) => {
      if (e.target.tagName === "IMG") {
        let caption = e.target.nextElementSibling;
        console.log(caption);
        timer = setTimeout(() => {
          caption.classList.add("show");
        }, 2000);
      }
    },
    true
  );

  mainDiv.addEventListener(
    "mouseleave",
    (e) => {
      if (e.target.tagName === "IMG") {
        clearTimeout(timer);
        timer = null;

        captions.forEach((cap) => {
          cap.classList.remove("show");
        });
      }
    },
    true
  );
});
