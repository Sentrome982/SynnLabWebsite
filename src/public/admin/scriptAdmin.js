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

  socket.emit("event_created", eventData);

  setTimeout(() => {
    window.location.reload();
  }, 500);
});

socket.emit("get_events");

function create_element(parent, type, value = null, html_class = null, html_id = null) {
    let new_element = document.createElement(type);
    
    if (html_class != null) {
        new_element.setAttribute("class", html_class);
    }

    if (html_id != null) {
        new_element.setAttribute("id", html_id);
    }

    if (value != null) {
        new_element.textContent = value;
    }

    parent.appendChild(new_element);
}
socket.on("send_events", (events) => {
    let event_parent = document.body;
    for (let i = 0; i < events.events.length; i++) {
        let generated_event = events.events[i];

        let event_div = document.createElement("div");
        event_parent.appendChild(event_div);

        create_element(event_div, "p", generated_event.title, "event_title");
        create_element(event_div, "p", generated_event.description, "event_description");
        create_element(event_div, "p", generated_event.date, "event_date");

        let delete_button = document.createElement("button");
        delete_button.setAttribute("class", "event_delete");
        delete_button.innerHTML = '<i class="fa-solid fa-x"></i>';
        delete_button.setAttribute("onclick", "delete_event(" + i + ");")
        event_div.appendChild(delete_button);
    }
})


function delete_event(id) {
    console.log(id)
    socket.emit("delete_event", id);

    setTimeout(() => {
      window.location.reload();
    }, 500);
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
