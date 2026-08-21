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

// src/routes/hability.routes.ts
var hability_routes_exports = {};
__export(hability_routes_exports, {
  routes: () => routes
});
module.exports = __toCommonJS(hability_routes_exports);
var import_express = require("express");

// src/Services/HabilityServices/CreateHabilityService.ts
var import_http_errors = __toESM(require("http-errors"), 1);

// src/repository/index.ts
var import_config = require("dotenv/config");
var import_client = require("@prisma/client");
var import_adapter_pg = require("@prisma/adapter-pg");
var adapter = new import_adapter_pg.PrismaPg({ connectionString: process.env.DATABASE_URL });
var prisma = new import_client.PrismaClient({ adapter });
var UserRepository = () => {
  return prisma.user;
};
var HabilityRepository = () => {
  return prisma.hability;
};

// src/Services/HabilityServices/CreateHabilityService.ts
var CreateHabilityService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ user_id, name, description, image_key, image_url }) {
      if (!(yield UserRepository().findUnique({ where: { id: user_id } }))) {
        throw (0, import_http_errors.default)(404, "Usu\xE1rio n\xE3o encontrado.");
      }
      const habilityRepo = HabilityRepository();
      const newHability = yield habilityRepo.create({
        data: {
          user_id,
          name,
          description,
          image_url,
          image_key
        }
      });
      return newHability;
    });
  }
};

// src/helpers/getUploadedFileData.ts
var import_config2 = require("dotenv/config");
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

// src/Controllers/HabilityControllers/CreateHabilityController.ts
var CreateHabilityController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { user_id } = req.params;
      const { name, description } = req.body;
      const service = new CreateHabilityService();
      const result = yield service.execute({
        user_id,
        name,
        description,
        image_key: String(getUploadedFileData(req.file).key),
        image_url: String(getUploadedFileData(req.file).url)
      });
      return res.json(result);
    });
  }
};

// src/Config/multer.ts
var import_multer = __toESM(require("multer"), 1);
var import_fs = __toESM(require("fs"), 1);
var storage = import_multer.default.diskStorage({
  destination: (req, file, cb) => {
    import_fs.default.mkdir("./uploads", (err) => {
      if (err) {
        cb(null, "./uploads");
        return;
      } else {
        cb(null, "./uploads");
      }
    });
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = (0, import_multer.default)({ storage });

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

// src/Controllers/HabilityControllers/GetHabilityController.ts
var GetHabilityController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { hability_id } = req.params;
      const service = new GetHabilityService();
      const result = yield service.execute(hability_id);
      return res.json(result);
    });
  }
};

// src/Services/HabilityServices/UpdateHabilityService.ts
var import_http_errors2 = __toESM(require("http-errors"), 1);
var UpdateHabilityService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ hability_id, name, description, image_url, image_key }) {
      if (!(yield HabilityRepository().findUnique({ where: { id: hability_id } }))) {
        throw (0, import_http_errors2.default)(404, "Habilidade n\xE3o encontrada.");
      }
      const updatedHability = yield HabilityRepository().update({
        where: { id: hability_id },
        data: {
          name,
          description,
          image_url,
          image_key
        }
      });
      return updatedHability;
    });
  }
};

// src/Controllers/HabilityControllers/UpdateHabilityController.ts
var UpdateHabilityController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { hability_id } = req.params;
      const { name, description } = req.body;
      const service = new UpdateHabilityService();
      const result = yield service.execute({
        hability_id,
        name,
        description
      });
      return res.json(result);
    });
  }
};

// src/Services/HabilityServices/DeleteHabilityService.ts
var import_http_errors3 = __toESM(require("http-errors"), 1);
var DeleteHabilityService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ hability_id, user_id }) {
      if (!(yield HabilityRepository().findUnique({ where: { id: hability_id } }))) {
        throw (0, import_http_errors3.default)(404, "Habilidade n\xE3o encontrada.");
      }
      yield HabilityRepository().delete({
        where: { id: hability_id, user_id }
      });
      return;
    });
  }
};

// src/Controllers/HabilityControllers/DeleteHabilityController.ts
var DeleteHabilityController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { hability_id, user_id } = req.params;
      const service = new DeleteHabilityService();
      const result = yield service.execute({ hability_id, user_id });
      return res.json(result);
    });
  }
};

// src/routes/hability.routes.ts
var routes = (0, import_express.Router)();
routes.post(
  "/create/:user_id",
  upload.single("file"),
  new CreateHabilityController().handle
);
routes.put(
  "/update/:hability_id",
  upload.single("file"),
  new UpdateHabilityController().handle
);
routes.get(
  "/:hability_id?",
  new GetHabilityController().handle
);
routes.delete(
  "/delete/:hability_id/:user_id",
  new DeleteHabilityController().handle
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  routes
});
