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

// src/routes/project.routes.ts
var project_routes_exports = {};
__export(project_routes_exports, {
  routes: () => routes
});
module.exports = __toCommonJS(project_routes_exports);
var import_express = require("express");

// src/Services/ProjectServices/CreateProjectService.ts
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
var ProjectRepository = () => {
  return prisma.project;
};

// src/Services/ProjectServices/CreateProjectService.ts
var CreateProjectService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ user_id, title, description, file_url, file_key }) {
      const projectRepo = ProjectRepository();
      if (!(yield UserRepository().findUnique({ where: { id: user_id } })))
        throw (0, import_http_errors.default)(400, "Usuario n\xE3o existe!");
      const newProject = yield projectRepo.create({
        data: {
          user_id,
          title,
          description,
          file_key,
          file_url
        }
      });
      return newProject;
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

// src/Controllers/ProjectControllers/CreateProjectController.ts
var CreateProjectController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { user_id } = req.params;
      const { title, description } = req.body;
      const service = new CreateProjectService();
      const result = yield service.execute({
        user_id,
        title,
        description,
        file_key: String(getUploadedFileData(req.file).key),
        file_url: String(getUploadedFileData(req.file).url)
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

// src/Services/ProjectServices/UpdateProjectService.ts
var import_http_errors2 = __toESM(require("http-errors"), 1);
var UpdateProjectService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ project_id, title, description, file_url, file_key }) {
      if (!(yield ProjectRepository().findUnique({ where: { id: project_id } })))
        throw (0, import_http_errors2.default)(404, "Projeto n\xE3o encontrado.");
      const updatedProject = yield ProjectRepository().update({
        where: { id: project_id },
        data: {
          title,
          description,
          file_url,
          file_key
        }
      });
      return updatedProject;
    });
  }
};

// src/Controllers/ProjectControllers/UpdateProjectController.ts
var UpdateProjectController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { project_id } = req.params;
      const { title, description } = req.body;
      const service = new UpdateProjectService();
      const result = yield service.execute({
        project_id,
        title,
        description,
        file_key: String(getUploadedFileData(req.file).key),
        file_url: String(getUploadedFileData(req.file).url)
      });
      return res.json(result);
    });
  }
};

// src/Services/ProjectServices/GetProjectService.ts
var GetProjectService = class {
  execute(project_id) {
    return __async(this, null, function* () {
      const projectRepo = ProjectRepository();
      if (!project_id) {
        const allProjects = yield projectRepo.findMany();
        return allProjects;
      }
      const project = yield projectRepo.findUnique({
        where: { id: project_id }
      });
      if (!project)
        return {};
      return project;
    });
  }
};

// src/Controllers/ProjectControllers/GetProjectController.ts
var GetProjectController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { project_id } = req.params;
      const service = new GetProjectService();
      const result = yield service.execute(project_id);
      return res.json(result);
    });
  }
};

// src/Services/ProjectServices/DeleteProjectService.ts
var import_http_errors3 = __toESM(require("http-errors"), 1);
var DeleteProjectService = class {
  execute(project_id, user_id) {
    return __async(this, null, function* () {
      if (!(yield ProjectRepository().findUnique({ where: { id: project_id } })))
        throw (0, import_http_errors3.default)(404, "Projeto n\xE3o encontrado.");
      yield ProjectRepository().delete({
        where: {
          id: project_id,
          user_id
        }
      });
      return;
    });
  }
};

// src/Controllers/ProjectControllers/DeleteProjectController.ts
var DeleteProjectController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { project_id, user_id } = req.params;
      const service = new DeleteProjectService();
      const result = yield service.execute(project_id, user_id);
      return res.json(result);
    });
  }
};

// src/routes/project.routes.ts
var routes = (0, import_express.Router)();
routes.post(
  "/create/:user_id",
  upload.single("file"),
  new CreateProjectController().handle
);
routes.get(
  "/:project_id?",
  new GetProjectController().handle
);
routes.put(
  "/update/:project_id",
  upload.single("file"),
  new UpdateProjectController().handle
);
routes.delete(
  "/delete/:project_id/:user_id",
  new DeleteProjectController().handle
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  routes
});
