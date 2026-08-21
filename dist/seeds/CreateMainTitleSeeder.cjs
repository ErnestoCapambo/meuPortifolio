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

// src/seeds/CreateMainTitleSeeder.ts
var CreateMainTitleSeeder_exports = {};
__export(CreateMainTitleSeeder_exports, {
  CreateMainTitleSeeder: () => CreateMainTitleSeeder
});
module.exports = __toCommonJS(CreateMainTitleSeeder_exports);

// src/repository/index.ts
var import_config = require("dotenv/config");
var import_client = require("@prisma/client");
var import_adapter_pg = require("@prisma/adapter-pg");
var adapter = new import_adapter_pg.PrismaPg({ connectionString: process.env.DATABASE_URL });
var prisma = new import_client.PrismaClient({ adapter });
var UserRepository = () => {
  return prisma.user;
};
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

// src/Services/UserServices/GetUserService.ts
var import_http_errors = __toESM(require("http-errors"), 1);
var GetUserService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ user_id }) {
      const userRepo = UserRepository();
      if (user_id) {
        const _user2 = yield userRepo.findUnique({
          where: { id: user_id },
          select: {
            id: true,
            username: true,
            email: true,
            contact: true,
            image_url: true
          }
        });
        if (_user2 == null) {
          throw (0, import_http_errors.default)(404, "Usu\xE1rio n\xE3o encontrado.");
        }
        return _user2;
      }
      const _user = yield userRepo.findMany();
      return _user;
    });
  }
};

// src/helpers/verifyIfMainTitleAlreadyExists.ts
function verifyIfMainTitleAlreadyExists() {
  return __async(this, null, function* () {
    const maintitle = yield MainTitleRepository().count();
    return maintitle;
  });
}

// src/seeds/CreateMainTitleSeeder.ts
var CreateMainTitleSeeder = class {
  execute() {
    return __async(this, null, function* () {
      if ((yield verifyIfMainTitleAlreadyExists()) > 0) {
        return;
      }
      console.log("============================== RODANDO AS MAIN TITLE SEEDS =============================");
      const user = new GetUserService();
      const userResult = yield user.execute({});
      const maintitle = {
        title: "Criando solu\xE7\xF5es para o mercado moderno",
        description: "Primeiro titulo",
        user_id: String(userResult[0].id)
      };
      const mainTitleService = new CreateMAinTitleService();
      yield mainTitleService.execute({ title: maintitle.title, description: maintitle.description, user_id: maintitle.user_id });
      return;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateMainTitleSeeder
});
