"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = Home;
const link_1 = __importDefault(require("next/link"));
exports.metadata = {
    title: "Inboot",
    description: "Bootstrap project",
};
async function Home() {
    return <link_1.default href="image-catalog">Image Catalog Example</link_1.default>;
}
