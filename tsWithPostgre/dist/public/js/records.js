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
const deleteRecord = (btn) => __awaiter(void 0, void 0, void 0, function* () {
    const recordId = btn.parentNode.querySelector('[name=recordId]').value;
    const recordElement = btn.closest('div');
    try {
        const result = yield fetch("http://localhost:3001/deleteRecord?recordId=" + recordId, {
            method: 'DELETE',
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("jwt")
            }
        });
        yield result.json();
        recordElement.remove();
        console.log('record deleted successfully');
    }
    catch (err) {
        console.log(err);
    }
});
