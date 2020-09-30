const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#msg-1");
const messageTwo = document.querySelector("#msg-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading ...";
  messageTwo.textContent = "";

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageOne.style.color = "red";
      } else {
        messageOne.style.color = "blue";
        messageTwo.style.color = "blue";
        messageOne.textContent = "Location: " + data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
