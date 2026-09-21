import "dotenv/config";
import express from "express";
import { listen } from "listhen";

import {
  createIPX,
  ipxFSStorage,
  createIPXNodeServer,
  ipxHttpStorage
} from "ipx";

const app = express()


app.get("/healthcheck", (req, res) => {
  res.send("OK")
});

// R2 objects are only reachable via short-lived signed GET URLs (the bucket
// stays private) — ipx just needs the hostname allow-listed to fetch them.
// The SDK signs virtual-hosted-style URLs ({bucket}.{endpoint-host}), not the
// bare endpoint host, so the bucket name has to be part of the allow-listed host.
const r2Hostname = `${process.env.R2_BUCKET_NAME}.${new URL(process.env.R2_S3_ENDPOINT).hostname}`;
console.log({ r2Hostname })
const ipx = createIPX({
  storage : ipxFSStorage({ dir : './static'}),
  httpStorage : ipxHttpStorage({ domains : ["picsum.photos", r2Hostname]})
})


app.use("/_ipx", createIPXNodeServer(ipx));

listen(app, { port: process.env.IPX_PORT ?? 3001 })
