this.isBlured = this.isBlured || false;

document.getElementById("hello").innerHTML =
  "Blur filter : " + (this.isBlured ? "On" : "Off");

const button = document.getElementById("btn");

button.addEventListener("click", () => {
  if (this.isBlured === false) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: blurImages,
      });
    });
    isBlured = true;
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: unblurImages,
      });
    });
    isBlured = false;
  }
  button.innerHTML=(this.isBlured)?'<b>Unblur images</b>':'<b>Blur images</b>'
  document.getElementById("hello").innerHTML =
    "Blur filter : " + (this.isBlured ? "On" : "Off");
});

function blurImages() {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.style.filter = "blur(10px)";
  });
}

function unblurImages() {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.style.filter = "blur(0px)";
  });
}
