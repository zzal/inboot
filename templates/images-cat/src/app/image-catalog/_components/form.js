"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
const react_1 = require("react");
const react_2 = require("react");
const image_size_browser_1 = __importDefault(require("image-size-browser"));
const constants_1 = require("@/app/image-catalog/_lib/constants");
const actions_1 = require("@/app/image-catalog/actions");
const form_module_css_1 = __importDefault(require("./form.module.css"));
const form_submit_button_1 = require("./form-submit-button");
const Form = () => {
    const [state, submitAction, isPending] = (0, react_2.useActionState)(actions_1.uploadImage, constants_1.initialUploadImageState, "/image-catalog");
    const inputRef = (0, react_1.useRef)(null);
    const [hasFile, setHasFile] = (0, react_1.useState)(false);
    const [fileType, setFileType] = (0, react_1.useState)("");
    const [fileWidth, setFileWidth] = (0, react_1.useState)(Number.NaN);
    const [fileHeight, setFileHeight] = (0, react_1.useState)(Number.NaN);
    const resetStates = () => {
        setHasFile(false);
        setFileType("");
        setFileWidth(Number.NaN);
        setFileHeight(Number.NaN);
    };
    const onSubmitHandler = (0, react_1.useCallback)((event) => {
        const form = event.target;
        setTimeout(() => {
            form.reset();
            resetStates();
        }, 100);
    }, []);
    (0, react_1.useEffect)(() => {
        if (inputRef.current != null) {
            const form = inputRef.current.form;
            if (form != null) {
                form.removeEventListener("formdata", onSubmitHandler);
                form.addEventListener("formdata", onSubmitHandler);
            }
        }
    }, [onSubmitHandler]);
    return (<form action={submitAction}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div className={form_module_css_1.default.form}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input type="hidden" name="fileName"/>
            <input ref={inputRef} name="file" type="file" accept="image/png, image/jpeg, image/webp" multiple={false} disabled={isPending} onInput={(evt) => {
            const form = evt.target.form;
            if (form != null) {
                const file = form.file.files[0];
                if (file) {
                    setHasFile(true);
                    setFileType(file.type);
                    file.arrayBuffer().then((buffer) => {
                        const size = (0, image_size_browser_1.default)(new Uint8Array(buffer));
                        setFileWidth(() => size.width ?? Number.NaN);
                        setFileHeight(() => size.height ?? Number.NaN);
                    });
                }
            }
        }}/>
            {hasFile ? (<>
                <p>Type: {fileType}</p>
                {Number.isNaN(fileWidth) ? null : <p>Width: {fileWidth}px</p>}
                {Number.isNaN(fileHeight) ? null : (<p>Height: {fileHeight}px</p>)}
              </>) : null}
          </div>
          <form_submit_button_1.SubmitButton hasFile={hasFile}/>
        </div>
        {state.message === "" || hasFile || isPending ? null : (<p style={{ color: "orangered" }}>{state.message}</p>)}
      </div>
    </form>);
};
exports.Form = Form;
