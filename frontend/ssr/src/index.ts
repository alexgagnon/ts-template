import { html } from "lit";
import express, { Response } from "express";
import { render } from "@lit-labs/ssr";
import { RenderResultReadable } from "@lit-labs/ssr/lib/render-result-readable.js";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.SSR_PORT ?? 8090;

const ssrResult = render(html`
  <html>
    <head>
      <script src="/design-system/dist/design_system.iife.js"></script>
    </head>
    <body>
      <span>Hello</span>
      <wc-button>From another lib</wc-button>

      <script type="module">
        // Hydrate template-shadowroots eagerly after rendering (for browsers without
        // native declarative shadow roots)
        import {
          hasNativeDeclarativeShadowRoots,
          hydrateShadowRoots,
        } from "/@webcomponents/template-shadowroot/template-shadowroot.js";
        if (!hasNativeDeclarativeShadowRoots()) {
          hydrateShadowRoots(document.body);
        }
        // ...
        // Load and hydrate components lazily
        import("/design-system/dist/design_system.js");
      </script>
    </body>
  </html>
`);

const app = express();
app.use(express.static("node_modules"));

app.get("/", (_, res: Response) => {
  const response = RenderResultReadable.from(ssrResult);
  RenderResultReadable.from(ssrResult).pipe(res);
});

app.listen(port, () => {
  console.log(`Listening on port :${port}`);
});
