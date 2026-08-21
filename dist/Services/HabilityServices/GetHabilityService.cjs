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

// src/Services/HabilityServices/GetHabilityService.ts
var GetHabilityService_exports = {};
__export(GetHabilityService_exports, {
  GetHabilityService: () => GetHabilityService
});
module.exports = __toCommonJS(GetHabilityService_exports);

// src/repository/index.ts
var import_config = require("dotenv/config");
var import_client = require("@prisma/client");
var import_adapter_pg = require("@prisma/adapter-pg");
var adapter = new import_adapter_pg.PrismaPg({ connectionString: process.env.DATABASE_URL });
var prisma = new import_client.PrismaClient({ adapter });
var HabilityRepository = () => {
  return prisma.hability;
};

// src/Services/HabilityServices/GetHabilityService.ts
var GetHabilityService = class {
  execute(hability_id) {
    return __async(this, null, function* () {
      if (!hability_id) {
        const habilities = yield HabilityRepository().findMany();
        return habilities;
      }
      const hability = yield HabilityRepository().findUnique({
        where: {
          id: hability_id
        }
      });
      return hability;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetHabilityService
});
