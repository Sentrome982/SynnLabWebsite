const socket = io();

const eventParent = document.getElementById("events");

let createEventForm = document.getElementById("addEvent");

createEventForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let title = document.getElementById("Event").value;
  let description = document.getElementById("Description").value;
  let date = document.getElementById("Date").value;

  let eventData = {
    title: title,
    description: description,
    date: date,
  };

  add_event(eventData.title, eventData.description, eventData.date);

  socket.emit("event_created", eventData);
});

function add_event(title, description, date) {
  let eventDiv = document.createElement("div");
  eventDiv.setAttribute("class", "event_div");
  eventParent.appendChild(eventDiv);

  let eventTitle = create_element(eventDiv, "p", title, "event_title");
  let eventDescription = create_element(
    eventDiv,
    "p",
    description,
    "event_description"
  );
  let eventDate = create_element(eventDiv, "p", date, "event_date");
}

function create_element(parent, type, value, HTMLClass) {
  let element = document.createElement(type);
  element.textContent = value;
  element.setAttribute("class", HTMLClass);
  parent.appendChild(element);

  return element;
}

// image upload stuffs
const fileUpload = document.querySelector(".fileUpload");
const fileUploadSubmit = document.querySelector(".fileUploadSubmit");

fileUploadSubmit.onclick = () => {
  let file = fileUpload.files[0];
  if (file === undefined) {
    console.log("No File Uploaded");
    return;
  }
  let fileName = file.name;

  let data = {
    fileName: fileName,
    fileData: file,
  };

  console.log(data);

  socket.emit("file-upload", data);
};
