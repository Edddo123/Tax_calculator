"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const feedbackForm = document.getElementById("feedbackForm");
feedbackForm.addEventListener("submit", submitFeedback);
function submitFeedback(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const content = document.getElementById("content");
        const result = yield fetch("http://localhost:3001/addFeedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                content: content.value,
            }),
        });
        const data = yield result.json();
    });
}
const deleteFeed = (btn) => __awaiter(void 0, void 0, void 0, function* () {
    const feedId = btn.parentNode.querySelector("[name=feedId]").value;
    const feedElement = btn.closest("div");
    try {
        const result = yield fetch("http://localhost:3001/deleteFeeback?id=" + feedId, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        });
        const data = yield result.json();
        if (data.deletedPostCount) {
            feedElement.remove();
        }
    }
    catch (error) {
        console.error(error, "here?");
    }
});
