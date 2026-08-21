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

// src/seeds/CreateUserSeeder.ts
var CreateUserSeeder_exports = {};
__export(CreateUserSeeder_exports, {
  CreateUserSeeder: () => CreateUserSeeder
});
module.exports = __toCommonJS(CreateUserSeeder_exports);
var import_config2 = require("dotenv/config");
var import_bcryptjs = __toESM(require("bcryptjs"), 1);

// src/repository/index.ts
var import_config = require("dotenv/config");
var import_client = require("@prisma/client");
var import_adapter_pg = require("@prisma/adapter-pg");
var adapter = new import_adapter_pg.PrismaPg({ connectionString: process.env.DATABASE_URL });
var prisma = new import_client.PrismaClient({ adapter });
var UserRepository = () => {
  return prisma.user;
};

// src/helpers/verifyIfUSerAlreadyExist.ts
function VerifyIfUSerAlreadyExist() {
  return __async(this, null, function* () {
    const userRepo = UserRepository();
    const numberOfUser = yield userRepo.count();
    return numberOfUser;
  });
}

// src/Services/UserServices/CreateUserService.ts
var CreateUserService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ username, email, password, contact, image_url, image_key }) {
      const userRepo = UserRepository();
      yield userRepo.create({
        data: {
          username,
          email,
          password,
          contact,
          image_url,
          image_key
        }
      });
      return;
    });
  }
};

// src/seeds/CreateUserSeeder.ts
var CreateUserSeeder = class {
  execute() {
    return __async(this, null, function* () {
      if ((yield VerifyIfUSerAlreadyExist()) > 0) {
        return;
      }
      console.log("============================== RODANDO AS USER SEEDS =============================");
      const username = "Ernesto Capambo";
      const email = "ernestosikilitacapambo@gmail.com";
      const contact = "957053820";
      const password = String(process.env.DEFAULT_USER_PASSWORD);
      const passwordHash = yield import_bcryptjs.default.hash(password, Number(process.env.HASH_SALT));
      const service = new CreateUserService();
      yield service.execute({
        username,
        email,
        contact,
        password: passwordHash
      });
      console.log("============================== SUCCESSUL USER SEEDS RUNNED ============================");
      return;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateUserSeeder
});
