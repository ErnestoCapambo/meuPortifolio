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

// src/routes/user.routes.ts
var user_routes_exports = {};
__export(user_routes_exports, {
  routes: () => routes
});
module.exports = __toCommonJS(user_routes_exports);
var import_express = require("express");

// src/repository/index.ts
var import_config = require("dotenv/config");
var import_client = require("@prisma/client");
var import_adapter_pg = require("@prisma/adapter-pg");
var adapter = new import_adapter_pg.PrismaPg({ connectionString: process.env.DATABASE_URL });
var prisma = new import_client.PrismaClient({ adapter });
var UserRepository = () => {
  return prisma.user;
};

// src/Services/UserServices/UpdateUserService.ts
var UpdateUserService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ username, email, password, contact }) {
      const user = yield UserRepository().update({
        where: { email },
        data: {
          username,
          email,
          password,
          contact
        }
      });
      return user;
    });
  }
};

// src/Controllers/UserControllers/UpdateUserController.ts
var UpdateUserController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { username, email, password, contact } = req.body;
      const service = new UpdateUserService();
      const result = yield service.execute({
        username,
        email,
        password,
        contact
      });
      return res.json(result);
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

// src/Controllers/UserControllers/GetUserController.ts
var GetUserController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { user_id } = req.params;
      const service = new GetUserService();
      const result = yield service.execute({ user_id });
      return res.json(result);
    });
  }
};

// src/Services/UserServices/UpdateUserImageService.ts
var UpdateUserImageService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ user_id, image_key, image_url }) {
      const user = UserRepository();
      const updatedUser = yield user.update({
        where: { id: user_id },
        data: {
          image_key,
          image_url
        }
      });
      return updatedUser;
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

// src/Controllers/UserControllers/UpdateUserImageController.ts
var UpdateUserImageController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { user_id } = req.params;
      const service = new UpdateUserImageService();
      const result = yield service.execute({
        user_id,
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

// src/routes/user.routes.ts
var routes = (0, import_express.Router)();
routes.get(
  "/:user_id?",
  new GetUserController().handle
);
routes.put(
  "/update/:userId",
  new UpdateUserController().handle
);
routes.put(
  "/update-image/:user_id",
  upload.single("file"),
  new UpdateUserImageController().handle
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  routes
});
