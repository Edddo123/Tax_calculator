const feedbackForm = document.getElementById("feedbackForm")!;

feedbackForm.addEventListener("submit", submitFeedback);

let socket = io();

async function submitFeedback(e: Event) {
  e.preventDefault();
  const content = document.getElementById("content")! as HTMLInputElement;

  const result = await fetch("http://localhost:3001/addFeedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    body: JSON.stringify({
      content: content.value,
    }),
  });

  const data = await result.json();
  // const div = document.createElement("div");
  // div.setAttribute("class", "content-box red float-child");
  // div.innerHTML = `
  // <p>Username: ${data.username} at ${Date.now()}</p>
  //         <p>${content.value}</p>
  //         <input type="hidden" value="${
  //           data.feedId.rows[0].feedback_id
  //         }" name="feedId" id="${data.feedId.rows[0].feedback_id}">
  //         <button
  //           type="submit"
  //           class="deleteButton"
  //           onclick="deleteFeed(this)"
  //         >
  //           Delete Feedback
  //         </button>
  // `;
  // document.getElementsByClassName("float-container")[0].appendChild(div);
}

const deleteFeed = async (btn: any) => {
  const feedId = btn.parentNode.querySelector("[name=feedId]").value;
  const feedElement = btn.closest("div")! as HTMLDivElement;
  try {
    const result = await fetch(
      "http://localhost:3001/deleteFeeback?id=" + feedId,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );
    await result.json();
    // if (data.deletedPostCount) {
    //   feedElement.remove();
    // }
  } catch (error) {
    console.error(error, "here?");
  }
};

socket.on("deleted", (message: any) => {
  const feed = document.getElementById(message.feedId);
  const feedElement = feed?.closest("div");  
  feedElement?.remove();
});

socket.on("added", (message:any) => {
  const div = document.createElement("div");
  div.setAttribute("class", "content-box red float-child");
  div.innerHTML = `
  <p>Username: ${message.username} at ${Date.now()}</p>
          <p>${message.content}</p>
          <input type="hidden" value="${
            message.feedId.rows[0].feedback_id
          }" name="feedId" id="${message.feedId.rows[0].feedback_id}">
          <button
            type="submit"
            class="deleteButton"
            onclick="deleteFeed(this)"
          >
            Delete Feedback
          </button>
  `;
  document.getElementsByClassName("float-container")[0].appendChild(div);
})
