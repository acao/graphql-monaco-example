/* global BrowserFS */
import { loadConfig } from "graphql-config";
import fs from "fs";

const AppEl = document.getElementById("graphql-config");

// @ts-ignore
BrowserFS.configure({ fs: "LocalStorage" }, e => {
  if (e) throw e;
  // @ts-ignore
  window.fs = require("fs");
});

const config = `schema: "https://localhost:8080"
extensions:
  graphiql:
    docExplorerOpen: false
`;

const loadBrowserConfig = () => {
  try {
    fs.writeFile("./graphql-config.yml", config, err => {
      if (err) console.error(err);
    });
    return loadConfig({
      filepath: "./graphql-config.yml",
      rootDir: "project",
      extensions: [
        () => ({
          name: "graphiql"
        })
      ]
    });
  } catch (err) {
    console.error(err);

    throw err;
  }
};

loadBrowserConfig()
  .then(c => {
    AppEl.innerText = JSON.stringify(c, null, 2);
    c.getProject("default");
    c.projects.default.extensions.graphiql = { null: true };
    // console.log(c.projects);
  })
  .catch(err => console.error(err));
