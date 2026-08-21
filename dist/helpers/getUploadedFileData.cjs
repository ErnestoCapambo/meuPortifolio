"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/helpers/getUploadedFileData.ts
var getUploadedFileData_exports = {};
__export(getUploadedFileData_exports, {
  getUploadedFileData: () => getUploadedFileData
});
module.exports = __toCommonJS(getUploadedFileData_exports);
var import_config = require("dotenv/config");
function getUploadedFileData(file) {
  if (!file)
    return {
      url: null,
      mimetype: null,
      key: null,
      size: null
    };
  return {
    url: `${process.env.APP_URL}/${file.filename}`,
    mimetype: file.mimetype,
    key: file.filename,
    size: file.size
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getUploadedFileData
});
