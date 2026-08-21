"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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

// src/routes/index.ts
var routes_exports = {};
__export(routes_exports, {
  routes: () => routes9
});
module.exports = __toCommonJS(routes_exports);
var import_express9 = require("express");

// src/routes/user.routes.ts
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
var MessageRepository = () => {
  return prisma.message;
};
var MainTitleRepository = () => {
  return prisma.maintitle;
};
var ProjectRepository = () => {
  return prisma.project;
};
var HabilityRepository = () => {
  return prisma.hability;
};
var CertificationRepository = () => {
  return prisma.certifications;
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

// src/routes/maintitle.routes.ts
var import_express2 = require("express");

// src/Services/MainTitleServices/GetMAinTitleService.ts
var import_http_errors2 = __toESM(require("http-errors"), 1);
var GetMAinTitleService = class {
  execute() {
    return __async(this, null, function* () {
      const mainTitleRepo = yield MainTitleRepository().findFirst();
      if (mainTitleRepo !== null) {
        return mainTitleRepo;
      } else {
        throw (0, import_http_errors2.default)(404, "Sem titulo cadastrado");
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

// src/Services/MainTitleServices/UpdateMainTitleService.ts
var import_http_errors3 = __toESM(require("http-errors"), 1);
var UpdateMainTitleService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ user_id, main_title_id, dados }) {
      try {
        const mainTitleRepo = yield MainTitleRepository().update({
          where: { id: main_title_id, user_id },
          data: dados
        });
        return mainTitleRepo;
      } catch (err) {
        throw (0, import_http_errors3.default)(500, err);
      }
    });
  }
};

// src/Controllers/MainTitleControllers/UpdateMainTitleController.ts
var UpdateMainTitleController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { user_id, main_title_id } = req.params;
      const data = req.body;
      const service = new UpdateMainTitleService();
      const result = yield service.execute({ user_id, main_title_id, dados: data });
      return res.json(result);
    });
  }
};

// src/routes/maintitle.routes.ts
var routes2 = (0, import_express2.Router)();
routes2.get(
  "/",
  new GetMainTitleController().handle
);
routes2.put(
  "/update/:user_id/:main_title_id",
  new UpdateMainTitleController().handle
);

// src/routes/project.routes.ts
var import_express3 = require("express");

// src/Services/ProjectServices/CreateProjectService.ts
var import_http_errors4 = __toESM(require("http-errors"), 1);
var CreateProjectService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ user_id, title, description, file_url, file_key }) {
      const projectRepo = ProjectRepository();
      if (!(yield UserRepository().findUnique({ where: { id: user_id } })))
        throw (0, import_http_errors4.default)(400, "Usuario n\xE3o existe!");
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

// src/Services/ProjectServices/UpdateProjectService.ts
var import_http_errors5 = __toESM(require("http-errors"), 1);
var UpdateProjectService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ project_id, title, description, file_url, file_key }) {
      if (!(yield ProjectRepository().findUnique({ where: { id: project_id } })))
        throw (0, import_http_errors5.default)(404, "Projeto n\xE3o encontrado.");
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
var import_http_errors6 = __toESM(require("http-errors"), 1);
var DeleteProjectService = class {
  execute(project_id, user_id) {
    return __async(this, null, function* () {
      if (!(yield ProjectRepository().findUnique({ where: { id: project_id } })))
        throw (0, import_http_errors6.default)(404, "Projeto n\xE3o encontrado.");
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
var routes3 = (0, import_express3.Router)();
routes3.post(
  "/create/:user_id",
  upload.single("file"),
  new CreateProjectController().handle
);
routes3.get(
  "/:project_id?",
  new GetProjectController().handle
);
routes3.put(
  "/update/:project_id",
  upload.single("file"),
  new UpdateProjectController().handle
);
routes3.delete(
  "/delete/:project_id/:user_id",
  new DeleteProjectController().handle
);

// src/routes/hability.routes.ts
var import_express4 = require("express");

// src/Services/HabilityServices/CreateHabilityService.ts
var import_http_errors7 = __toESM(require("http-errors"), 1);
var CreateHabilityService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ user_id, name, description, image_key, image_url }) {
      if (!(yield UserRepository().findUnique({ where: { id: user_id } }))) {
        throw (0, import_http_errors7.default)(404, "Usu\xE1rio n\xE3o encontrado.");
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
var import_http_errors8 = __toESM(require("http-errors"), 1);
var UpdateHabilityService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ hability_id, name, description, image_url, image_key }) {
      if (!(yield HabilityRepository().findUnique({ where: { id: hability_id } }))) {
        throw (0, import_http_errors8.default)(404, "Habilidade n\xE3o encontrada.");
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
var import_http_errors9 = __toESM(require("http-errors"), 1);
var DeleteHabilityService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ hability_id, user_id }) {
      if (!(yield HabilityRepository().findUnique({ where: { id: hability_id } }))) {
        throw (0, import_http_errors9.default)(404, "Habilidade n\xE3o encontrada.");
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
var routes4 = (0, import_express4.Router)();
routes4.post(
  "/create/:user_id",
  upload.single("file"),
  new CreateHabilityController().handle
);
routes4.put(
  "/update/:hability_id",
  upload.single("file"),
  new UpdateHabilityController().handle
);
routes4.get(
  "/:hability_id?",
  new GetHabilityController().handle
);
routes4.delete(
  "/delete/:hability_id/:user_id",
  new DeleteHabilityController().handle
);

// src/routes/certification.routes.ts
var import_express5 = require("express");

// src/Services/CertificationServices/CreateCertificationService.ts
var import_http_errors10 = __toESM(require("http-errors"), 1);
var CreateCertificationService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ user_id, name, link, file_url, file_key }) {
      if (!(yield UserRepository().findUnique({ where: { id: user_id } }))) {
        throw (0, import_http_errors10.default)(404, "Usu\xE1rio n\xE3o encontrado.");
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
var import_http_errors11 = __toESM(require("http-errors"), 1);
var UpdateCertificationService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ certification_id, name, link, file_url, file_key }) {
      if (!(yield CertificationRepository().findUnique({ where: { id: certification_id } }))) {
        throw (0, import_http_errors11.default)(404, "Certifica\xE7\xE3o n\xE3o encontrada.");
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
var import_http_errors12 = __toESM(require("http-errors"), 1);
var DeleteCertificationService = class {
  execute(certification_id, user_id) {
    return __async(this, null, function* () {
      if (!certification_id || !user_id) {
        throw (0, import_http_errors12.default)(400, "Id is required!");
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
var routes5 = (0, import_express5.Router)();
routes5.post(
  "/create/:user_id",
  upload.single("file"),
  new CreateCertificationController().handle
);
routes5.put(
  "/update/:certification_id",
  upload.single("file"),
  new UpdateCertificationController().handle
);
routes5.get(
  "/:certification_id?",
  new GetCertificationController().handle
);
routes5.delete(
  "/:certification_id/:user_id",
  new DeleteCertificationController().handle
);

// src/routes/message.routes.ts
var import_express6 = require("express");

// src/Services/MessageServices/CreateMessageService.ts
var import_http_errors13 = __toESM(require("http-errors"), 1);
var CreateMessageService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ costumer_name, costumer_email, costumer_contact, description }) {
      const messageRepo = MessageRepository();
      if (yield messageRepo.findUnique({ where: { costumer_email } })) {
        throw (0, import_http_errors13.default)(406, "J\xE1 existe um usu\xE1rio com este email.");
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
var import_http_errors14 = __toESM(require("http-errors"), 1);
var DeleteMessageService = class {
  execute(message_id) {
    return __async(this, null, function* () {
      if (!(yield MessageRepository().findUnique({ where: { id: message_id } }))) {
        throw (0, import_http_errors14.default)(404, "Mensagem n\xE3o encontrada.");
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
var routes6 = (0, import_express6.Router)();
routes6.post(
  "/create",
  new CreateMessageController().handle
);
routes6.get(
  "/",
  new GetMessageController().handle
);
routes6.delete(
  "/delete/:message_id",
  new DeleteMessageController().handle
);

// src/routes/auth.routes.ts
var import_express7 = require("express");
var import_bcryptjs = __toESM(require("bcryptjs"), 1);

// src/Config/auth.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);
var JWT_SECRET = process.env.JWT_SECRET || "portfolio-secret-key-change-in-production";
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Access token required" });
    return;
  }
  try {
    const decoded = import_jsonwebtoken.default.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (e) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
}
function generateToken(userId) {
  return import_jsonwebtoken.default.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

// src/routes/auth.routes.ts
var routes7 = (0, import_express7.Router)();
routes7.post("/login", (req, res) => __async(void 0, null, function* () {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }
    const user = yield prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    const validPassword = yield import_bcryptjs.default.compare(password, user.password);
    if (!validPassword) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    const token = generateToken(user.id);
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}));
routes7.get("/verify", authenticateToken, (req, res) => __async(void 0, null, function* () {
  try {
    const user = yield prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, username: true, email: true }
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json({ user });
  } catch (error) {
    console.error("Verify error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}));

// src/routes/video.routes.ts
var import_express8 = require("express");
var import_multer6 = __toESM(require("multer"), 1);
var import_fs2 = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var routes8 = (0, import_express8.Router)();
var videoStorage = import_multer6.default.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "./uploads/videos";
    import_fs2.default.mkdir(uploadDir, { recursive: true }, (err) => {
      cb(null, uploadDir);
    });
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + import_path.default.extname(file.originalname));
  }
});
var videoUpload = (0, import_multer6.default)({
  storage: videoStorage,
  limits: {
    fileSize: 100 * 1024 * 1024
    // 100MB max
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["video/mp4", "video/webm", "video/ogg", "video/quicktime"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only video files are allowed."));
    }
  }
});
routes8.get("/", (req, res) => __async(void 0, null, function* () {
  try {
    const videos = yield prisma.video.findMany({
      where: { published: true },
      orderBy: { created_at: "desc" }
    });
    res.json(videos);
  } catch (error) {
    console.error("Get videos error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}));
routes8.get("/admin", authenticateToken, (req, res) => __async(void 0, null, function* () {
  try {
    const videos = yield prisma.video.findMany({
      orderBy: { created_at: "desc" }
    });
    res.json(videos);
  } catch (error) {
    console.error("Get admin videos error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}));
routes8.post("/upload", authenticateToken, videoUpload.single("video"), (req, res) => __async(void 0, null, function* () {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No video file provided" });
      return;
    }
    const { title, description, project_id, experience_id } = req.body;
    const video = yield prisma.video.create({
      data: {
        title: title || req.file.originalname,
        description: description || null,
        file_url: `/uploads/videos/${req.file.filename}`,
        file_key: req.file.filename,
        file_size: req.file.size,
        mime_type: req.file.mimetype,
        project_id: project_id || null,
        experience_id: experience_id || null,
        user_id: req.userId,
        published: false
      }
    });
    res.status(201).json(video);
  } catch (error) {
    console.error("Upload video error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}));
routes8.put("/:video_id", authenticateToken, (req, res) => __async(void 0, null, function* () {
  try {
    const { video_id } = req.params;
    const { title, description, published, project_id, experience_id } = req.body;
    const video = yield prisma.video.update({
      where: { id: video_id },
      data: __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, title !== void 0 && { title }), description !== void 0 && { description }), published !== void 0 && { published }), project_id !== void 0 && { project_id }), experience_id !== void 0 && { experience_id })
    });
    res.json(video);
  } catch (error) {
    console.error("Update video error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}));
routes8.delete("/:video_id", authenticateToken, (req, res) => __async(void 0, null, function* () {
  try {
    const { video_id } = req.params;
    const video = yield prisma.video.findUnique({ where: { id: video_id } });
    if (!video) {
      res.status(404).json({ error: "Video not found" });
      return;
    }
    if (video.file_url) {
      const filePath = import_path.default.join(".", video.file_url);
      if (import_fs2.default.existsSync(filePath)) {
        import_fs2.default.unlinkSync(filePath);
      }
    }
    yield prisma.video.delete({ where: { id: video_id } });
    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Delete video error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}));

// src/routes/index.ts
var routes9 = (0, import_express9.Router)();
routes9.use("/auth", routes7);
routes9.use("/user", routes);
routes9.use("/main_title", routes2);
routes9.use("/projects", routes3);
routes9.use("/hability", routes4);
routes9.use("/certification", routes5);
routes9.use("/message", routes6);
routes9.use("/videos", routes8);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  routes
});
