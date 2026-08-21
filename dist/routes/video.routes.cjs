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

// src/routes/video.routes.ts
var video_routes_exports = {};
__export(video_routes_exports, {
  videoRoutes: () => routes
});
module.exports = __toCommonJS(video_routes_exports);
var import_express = require("express");
var import_multer = __toESM(require("multer"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);

// src/repository/index.ts
var import_config = require("dotenv/config");
var import_client = require("@prisma/client");
var import_adapter_pg = require("@prisma/adapter-pg");
var adapter = new import_adapter_pg.PrismaPg({ connectionString: process.env.DATABASE_URL });
var prisma = new import_client.PrismaClient({ adapter });

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

// src/routes/video.routes.ts
var routes = (0, import_express.Router)();
var videoStorage = import_multer.default.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "./uploads/videos";
    import_fs.default.mkdir(uploadDir, { recursive: true }, (err) => {
      cb(null, uploadDir);
    });
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + import_path.default.extname(file.originalname));
  }
});
var videoUpload = (0, import_multer.default)({
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
routes.get("/", (req, res) => __async(void 0, null, function* () {
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
routes.get("/admin", authenticateToken, (req, res) => __async(void 0, null, function* () {
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
routes.post("/upload", authenticateToken, videoUpload.single("video"), (req, res) => __async(void 0, null, function* () {
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
routes.put("/:video_id", authenticateToken, (req, res) => __async(void 0, null, function* () {
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
routes.delete("/:video_id", authenticateToken, (req, res) => __async(void 0, null, function* () {
  try {
    const { video_id } = req.params;
    const video = yield prisma.video.findUnique({ where: { id: video_id } });
    if (!video) {
      res.status(404).json({ error: "Video not found" });
      return;
    }
    if (video.file_url) {
      const filePath = import_path.default.join(".", video.file_url);
      if (import_fs.default.existsSync(filePath)) {
        import_fs.default.unlinkSync(filePath);
      }
    }
    yield prisma.video.delete({ where: { id: video_id } });
    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Delete video error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  videoRoutes
});
