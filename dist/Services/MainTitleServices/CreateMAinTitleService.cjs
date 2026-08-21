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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/Services/MainTitleServices/CreateMAinTitleService.ts
var CreateMAinTitleService_exports = {};
__export(CreateMAinTitleService_exports, {
  CreateMAinTitleService: () => CreateMAinTitleService
});
module.exports = __toCommonJS(CreateMAinTitleService_exports);

// src/repository/index.ts
var import_config = require("dotenv/config");
var import_client = require("@prisma/client");
var import_adapter_pg = require("@prisma/adapter-pg");
var adapter = new import_adapter_pg.PrismaPg({ connectionString: process.env.DATABASE_URL });
var prisma = new import_client.PrismaClient({ adapter });
var MainTitleRepository = () => {
  return prisma.maintitle;
};

// src/Services/MainTitleServices/CreateMAinTitleService.ts
var CreateMAinTitleService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ title, description, user_id }) {
      yield MainTitleRepository().create({
        data: {
          title,
          description,
          user_id
        }
      });
      return;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateMAinTitleService
});
