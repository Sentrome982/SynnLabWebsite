const socket = io();

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
    }
})