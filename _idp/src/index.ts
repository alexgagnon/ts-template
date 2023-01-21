import * as dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import * as jose from "jose";

const host = process.env.IDP_HOST ?? "localhost";
const port = process.env.IDP_PORT ?? "10001";
const secret = new TextEncoder().encode(
  process.env.IDP_SECRET ??
    "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2"
);
const alg = process.env.JWT_ALGORITHM ?? "HS256";
const origin = `http://${host}:${port}`;
const authorization_path = "/authorization";
const authorization_endpoint = getEndpoint(origin, authorization_path);
const token_path = "/token";
const token_endpoint = getEndpoint(origin, token_path);
const introspection_path = "/introspect";
const introspection_endpoint = getEndpoint(origin, introspection_path);
const userinfo_path = "/userinfo";
const userinfo_endpoint = getEndpoint(origin, userinfo_path);
const revocation_path = "/revoke";
const revocation_endpoint = getEndpoint(origin, revocation_path);
const openid_configuration_path = "/.well-known/openid-configuration";
const jwks_path = "/.well-known/jwks.json";
const jwks_uri = getEndpoint(origin, jwks_path);
const endpoint_auth_methods_supported = ["client_secret_post"];
const login_path = "/login";

function getEndpoint(origin: string, path: string) {
  return `${origin}${path};`;
}

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.post(login_path, (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    console.log("valid credentials");
    // res.redirect();
  }
});

app.get(openid_configuration_path, (_, res: Response) => {
  res.json({
    issuer: origin,
    authorization_endpoint,
    token_endpoint,
    token_endpoint_auth_methods_supported: endpoint_auth_methods_supported,
    introspection_endpoint,
    introspection_endpoint_auth_methods_supported:
      endpoint_auth_methods_supported,
    userinfo_endpoint,
    userinfo_endpoint_auth_methods_supported: endpoint_auth_methods_supported,
    revocation_endpoint,
    revocation_endpoint_auth_methods_supported: endpoint_auth_methods_supported,
    jwks_uri,
    response_types_supported: [
      "code",
      "id_token",
      "code id_token",
      "code token",
      "id_token token",
      "code id_token token",
    ],
    response_modes_supported: ["query", "fragment", "form_post"],
    grant_types_supported: ["authorization_code", "refresh_token"],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256"],
    scopes_supported: [
      "openid",
      "profile",
      "email",
      "address",
      "phone",
      "offline_access",
    ],
    claims_supported: [
      "iss",
      "ver",
      "sub",
      "aud",
      "iat",
      "exp",
      "jti",
      "auth_time",
      "amr",
      "idp",
      "nonce",
      "name",
      "nickname",
      "preferred_username",
      "given_name",
      "middle_name",
      "family_name",
      "email",
      "email_verified",
      "profile",
      "zoneinfo",
      "locale",
      "address",
      "phone_number",
      "picture",
      "website",
      "gender",
      "birthdate",
      "updated_at",
      "at_hash",
      "c_hash",
    ],
    code_challenge_methods_supported: ["S256"],
  });
});

app.get(jwks_path, (_, res: Response) => {
  res.json({});
});

app.get(revocation_path, (_, res: Response) => {
  console.log("revoke");
});

app.get(token_path, async (_, res: Response) => {
  res.send(
    await new jose.SignJWT({ "urn:example:claim": true })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer(origin)
      .setAudience("urn:example:audience")
      .setExpirationTime("2h")
      .sign(secret)
  );
});

app.get(introspection_path);

app.listen(port, () => {
  console.log(`Listening on port :${port}`);
});
