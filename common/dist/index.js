"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostInput = exports.createPostInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string(),
    contact: zod_1.default.number().min(10)
});
exports.signinInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
exports.createPostInput = zod_1.default.object({
    type: zod_1.default.string(),
    rooms: zod_1.default.string(),
    bathrooms: zod_1.default.string(),
    description: zod_1.default.string(),
    gender: zod_1.default.string(),
    price: zod_1.default.number().min(1),
    location: zod_1.default.string(),
    category: zod_1.default.string(),
    photos: zod_1.default.array(zod_1.default.string().url()),
});
exports.updatePostInput = zod_1.default.object({
    type: zod_1.default.string(),
    rooms: zod_1.default.string(),
    bathrooms: zod_1.default.string(),
    description: zod_1.default.string(),
    gender: zod_1.default.string(),
    price: zod_1.default.number().min(1),
    location: zod_1.default.string(),
    category: zod_1.default.string(),
    photos: zod_1.default.array(zod_1.default.string().url()),
});
