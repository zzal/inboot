"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ImageCatalogPage;
const form_1 = require("@/app/image-catalog/_components/form");
const images_grid_view_1 = __importDefault(require("@/app/image-catalog/_components/images-grid-view"));
const layout_module_css_1 = __importDefault(require("@/app/layout.module.css"));
const react_1 = require("react");
async function ImageCatalogPage() {
    return (<div className={layout_module_css_1.default.vStack}>
      <react_1.Suspense fallback={<p>Getting images…</p>}>
        <images_grid_view_1.default />
      </react_1.Suspense>
      <form_1.Form />
    </div>);
}
