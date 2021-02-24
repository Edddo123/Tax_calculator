const feedbackForm = document.getElementById("feedbackForm")!;

feedbackForm.addEventListener("submit", submitFeedback);

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
    const data = await result.json();
    if (data.deletedPostCount) {
      feedElement.remove();
    }
  } catch (error) {
    console.error(error, "here?");
  }
};
