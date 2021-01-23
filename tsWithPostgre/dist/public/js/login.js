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
const loginForm = document.getElementById('loginBtn');
loginForm.addEventListener("click", loggedIn);
function loggedIn(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const loginEmail = document.getElementById('loginEmail');
        const loginPwd = document.getElementById('loginPwd');
        const result = yield fetch("http://localhost:3001/postlogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ loginEmail: loginEmail.value, loginPwd: loginPwd.value })
        });
        const data = yield result.json();
        if (data.token) {
            localStorage.setItem("jwt", data.token);
        }
        else
            console.log(data.message);
    });
}
