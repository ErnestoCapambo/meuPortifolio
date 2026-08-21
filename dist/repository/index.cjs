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

// src/repository/index.ts
var repository_exports = {};
__export(repository_exports, {
  CertificationRepository: () => CertificationRepository,
  HabilityRepository: () => HabilityRepository,
  MainTitleRepository: () => MainTitleRepository,
  MessageRepository: () => MessageRepository,
  ProjectRepository: () => ProjectRepository,
  UserRepository: () => UserRepository,
  VideoRepository: () => VideoRepository,
  prisma: () => prisma
});
module.exports = __toCommonJS(repository_exports);
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
var VideoRepository = () => {
  return prisma.video;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CertificationRepository,
  HabilityRepository,
  MainTitleRepository,
  MessageRepository,
  ProjectRepository,
  UserRepository,
  VideoRepository,
  prisma
});
