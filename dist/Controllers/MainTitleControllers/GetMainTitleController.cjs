"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// src/Controllers/MainTitleControllers/GetMainTitleController.ts
var GetMainTitleController_exports = {};
__export(GetMainTitleController_exports, {
  GetMainTitleController: () => GetMainTitleController
});
module.exports = __toCommonJS(GetMainTitleController_exports);

// src/Services/MainTitleServices/GetMAinTitleService.ts
var import_http_errors = __toESM(require("http-errors"), 1);

// src/repository/index.ts
var import_config = require("dotenv/config");
var import_client = require("@prisma/client");
var import_adapter_pg = require("@prisma/adapter-pg");
var adapter = new import_adapter_pg.PrismaPg({ connectionString: process.env.DATABASE_URL });
var prisma = new import_client.PrismaClient({ adapter });
var MainTitleRepository = () => {
  return prisma.maintitle;
};

// src/Services/MainTitleServices/GetMAinTitleService.ts
var GetMAinTitleService = class {
  execute() {
    return __async(this, null, function* () {
      const mainTitleRepo = yield MainTitleRepository().findFirst();
      if (mainTitleRepo !== null) {
        return mainTitleRepo;
      } else {
        throw (0, import_http_errors.default)(404, "Sem titulo cadastrado");
      }
    });
  }
};

// src/Controllers/MainTitleControllers/GetMainTitleController.ts
var GetMainTitleController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const service = new GetMAinTitleService();
      const result = yield service.execute();
      return res.json(result);
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetMainTitleController
});
