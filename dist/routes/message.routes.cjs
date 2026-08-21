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

// src/routes/message.routes.ts
var message_routes_exports = {};
__export(message_routes_exports, {
  routes: () => routes
});
module.exports = __toCommonJS(message_routes_exports);
var import_express = require("express");

// src/repository/index.ts
var import_config = require("dotenv/config");
var import_client = require("@prisma/client");
var import_adapter_pg = require("@prisma/adapter-pg");
var adapter = new import_adapter_pg.PrismaPg({ connectionString: process.env.DATABASE_URL });
var prisma = new import_client.PrismaClient({ adapter });
var MessageRepository = () => {
  return prisma.message;
};

// src/Services/MessageServices/CreateMessageService.ts
var import_http_errors = __toESM(require("http-errors"), 1);
var CreateMessageService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ costumer_name, costumer_email, costumer_contact, description }) {
      const messageRepo = MessageRepository();
      if (yield messageRepo.findUnique({ where: { costumer_email } })) {
        throw (0, import_http_errors.default)(406, "J\xE1 existe um usu\xE1rio com este email.");
      }
      const newMessage = yield messageRepo.create({
        data: {
          costumer_name,
          costumer_email,
          costumer_contact,
          description
        }
      });
      return newMessage;
    });
  }
};

// src/Controllers/MessageControllers/CreateMessageController.ts
var CreateMessageController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const dados = req.body;
      const service = new CreateMessageService();
      const result = yield service.execute(dados);
      return res.json(result);
    });
  }
};

// src/Services/MessageServices/GetMessageService.ts
var GetMessageService = class {
  execute() {
    return __async(this, null, function* () {
      const allMessages = yield MessageRepository().findMany({
        orderBy: {
          created_at: "desc"
        }
      });
      return allMessages;
    });
  }
};

// src/Controllers/MessageControllers/GetMessageController.ts
var GetMessageController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const service = new GetMessageService();
      const result = yield service.execute();
      return res.json(result);
    });
  }
};

// src/Services/MessageServices/DeleteMessageService.ts
var import_http_errors2 = __toESM(require("http-errors"), 1);
var DeleteMessageService = class {
  execute(message_id) {
    return __async(this, null, function* () {
      if (!(yield MessageRepository().findUnique({ where: { id: message_id } }))) {
        throw (0, import_http_errors2.default)(404, "Mensagem n\xE3o encontrada.");
      }
      yield MessageRepository().delete({
        where: { id: message_id }
      });
      return;
    });
  }
};

// src/Controllers/MessageControllers/DeleteMessageController.ts
var DeleteMessageController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { message_id } = req.params;
      const service = new DeleteMessageService();
      const result = yield service.execute(message_id);
      return res.json(result);
    });
  }
};

// src/routes/message.routes.ts
var routes = (0, import_express.Router)();
routes.post(
  "/create",
  new CreateMessageController().handle
);
routes.get(
  "/",
  new GetMessageController().handle
);
routes.delete(
  "/delete/:message_id",
  new DeleteMessageController().handle
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  routes
});
