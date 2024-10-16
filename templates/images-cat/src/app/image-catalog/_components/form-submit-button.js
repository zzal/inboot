"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitButton = void 0;
const react_dom_1 = require("react-dom");
const SubmitButton = ({ hasFile }) => {
    const { pending } = (0, react_dom_1.useFormStatus)();
    return (<button type="submit" style={{ minWidth: "16ch" }} {...(hasFile && !pending ? {} : { "aria-disabled": true })}>
      {pending ? "Uploading…" : "Upload"}
    </button>);
};
exports.SubmitButton = SubmitButton;
