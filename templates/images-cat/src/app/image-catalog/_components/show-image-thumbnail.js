"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowImageThumbnail = void 0;
const actions_1 = require("@/app/image-catalog/actions");
const images_grid_view_module_css_1 = __importDefault(require("./images-grid-view.module.css"));
const ShowImageThumbnail = ({ imageKey, url, alt, width, height, }) => {
    const imageName = decodeURI(alt);
    const clickHandler = (evt) => {
        evt.preventDefault();
        if (window.confirm(`Delete image: ${imageName}?`)) {
            void (0, actions_1.deleteS3Object)(imageKey);
        }
    };
    /* eslint-disable @next/next/no-img-element */
    return (<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <img src={url} title={imageName} alt={imageName} className={images_grid_view_module_css_1.default.thumbnail} width={120} height={120}/>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ fontSize: "x-small", margin: 0 }}>
            width: {width ?? "? "}px
            <br />
            height: {height ?? "? "}px
          </p>
        </div>
        <button type="button" className={images_grid_view_module_css_1.default.deleteBtn} onClick={clickHandler}>
          ␡
        </button>
      </div>
    </div>);
    /* eslint-enable @next/next/no-img-element */
};
exports.ShowImageThumbnail = ShowImageThumbnail;
