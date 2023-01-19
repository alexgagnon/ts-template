"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config(); // add variables from `.env` file. NOTE: this does not override OS/User environment variables
const config_1 = require("./config");
const logger_1 = require("./config/logger");
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const middleware_1 = require("./middleware");
const router_1 = __importDefault(require("./routes/book/router"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const app = (0, express_1.default)();
        app.set('trust proxy', 1); // allows cookies to be used despite service having different domain than proxy
        app.use((0, morgan_1.default)(process.env.ENV === 'local' ? 'dev' : 'common')); // http logging
        app.use(middleware_1.healthCheck);
        app.use((0, helmet_1.default)()); // BP: add protective headers and disables 'x-powered-by'
        app.use((0, cors_1.default)({ origin: config_1.CORS_ORIGINS, credentials: true }));
        app.use(express_1.default.json()); // allow json parsing of request bodies that have 'Content-Type': application/json
        app.use(express_1.default.urlencoded({ extended: false })); // allow urlencoded parsing of request bodies
        app.use((0, cookie_parser_1.default)());
        // NOTE: order here matters... requests fall through until a match is found
        app.get('/', (req, res) => {
            res.send('Welcome to the API');
        });
        app.use('/books', router_1.default); // any other request should go to storage account
        app.listen(config_1.PORT, () => {
            logger_1.logger.info(`Server is running on port ${config_1.PORT}`);
        });
    }
    catch (err) {
        console.error(err);
    }
}))();
//# sourceMappingURL=index.js.map