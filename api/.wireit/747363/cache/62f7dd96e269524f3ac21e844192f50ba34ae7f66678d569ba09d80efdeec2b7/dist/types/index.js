"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookSchema = void 0;
const zod_1 = require("zod");
exports.BookSchema = zod_1.z.object({
    author: zod_1.z.string(),
    title: zod_1.z.string(),
    yearPublished: zod_1.z.number().int().lte(2025).gte(-2500),
    id: zod_1.z.number().int().gt(0).optional()
});
//# sourceMappingURL=index.js.map