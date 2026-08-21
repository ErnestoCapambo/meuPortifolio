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

// src/routes/certification.routes.ts
var certification_routes_exports = {};
__export(certification_routes_exports, {
  routes: () => routes
});
module.exports = __toCommonJS(certification_routes_exports);
var import_express = require("express");

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

// src/Services/CertificationServices/CreateCertificationService.ts
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
var CertificationRepository = () => {
  return prisma.certifications;
};

// src/Services/CertificationServices/CreateCertificationService.ts
var CreateCertificationService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ user_id, name, link, file_url, file_key }) {
      if (!(yield UserRepository().findUnique({ where: { id: user_id } }))) {
        throw (0, import_http_errors.default)(404, "Usu\xE1rio n\xE3o encontrado.");
      }
      const certificationRepo = CertificationRepository();
      const newCertification = yield certificationRepo.create({
        data: {
          user_id,
          name,
          link,
          file_url,
          file_key
        }
      });
      return newCertification;
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

// src/Controllers/CertificationController/CreateCertificationController.ts
var CreateCertificationController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { user_id } = req.params;
      const { name, link } = req.body;
      const service = new CreateCertificationService();
      const result = yield service.execute({
        user_id,
        name,
        link,
        file_url: String(getUploadedFileData(req.file).url),
        file_key: String(getUploadedFileData(req.file).key)
      });
      return res.json(result);
    });
  }
};

// src/Services/CertificationServices/UpdateCertificationService.ts
var import_http_errors2 = __toESM(require("http-errors"), 1);
var UpdateCertificationService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ certification_id, name, link, file_url, file_key }) {
      if (!(yield CertificationRepository().findUnique({ where: { id: certification_id } }))) {
        throw (0, import_http_errors2.default)(404, "Certifica\xE7\xE3o n\xE3o encontrada.");
      }
      const certificationRepo = CertificationRepository();
      const updatedCertification = yield certificationRepo.update({
        where: { id: certification_id },
        data: {
          name,
          link,
          file_url,
          file_key
        }
      });
      return updatedCertification;
    });
  }
};

// src/Controllers/CertificationController/UpdateCertificationController.ts
var UpdateCertificationController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { certification_id } = req.params;
      const { name, link } = req.body;
      const service = new UpdateCertificationService();
      const result = yield service.execute({
        certification_id,
        name,
        link,
        file_key: String(getUploadedFileData(req.file).key),
        file_url: String(getUploadedFileData(req.file).url)
      });
      return res.json(result);
    });
  }
};

// src/Services/CertificationServices/GetCertificationService.ts
var GetCertificationService = class {
  execute(certification_id) {
    return __async(this, null, function* () {
      if (!certification_id) {
        const allCertifications = yield CertificationRepository().findMany();
        return allCertifications;
      }
      const certification = yield CertificationRepository().findUnique({ where: { id: certification_id } });
      if (certification == null) {
        return {};
      } else {
        return certification;
      }
    });
  }
};

// src/Controllers/CertificationController/GetCertificationController.ts
var GetCertificationController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { certification_id } = req.params;
      const service = new GetCertificationService();
      const result = yield service.execute(certification_id);
      return res.json(result);
    });
  }
};

// src/Services/CertificationServices/DeleteCertificationService.ts
var import_http_errors3 = __toESM(require("http-errors"), 1);
var DeleteCertificationService = class {
  execute(certification_id, user_id) {
    return __async(this, null, function* () {
      if (!certification_id || !user_id) {
        throw (0, import_http_errors3.default)(400, "Id is required!");
      }
      yield CertificationRepository().delete({
        where: { id: certification_id, user_id }
      });
      return;
    });
  }
};

// src/Controllers/CertificationController/DeleteCertificationController.ts
var DeleteCertificationController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { certification_id, user_id } = req.params;
      const service = new DeleteCertificationService();
      const result = yield service.execute(certification_id, user_id);
      return res.json(result);
    });
  }
};

// src/routes/certification.routes.ts
var routes = (0, import_express.Router)();
routes.post(
  "/create/:user_id",
  upload.single("file"),
  new CreateCertificationController().handle
);
routes.put(
  "/update/:certification_id",
  upload.single("file"),
  new UpdateCertificationController().handle
);
routes.get(
  "/:certification_id?",
  new GetCertificationController().handle
);
routes.delete(
  "/:certification_id/:user_id",
  new DeleteCertificationController().handle
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  routes
});
