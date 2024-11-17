import { networkInterfaces } from "os";
import { appendFileSync } from "fs";

const getLocalIPEnv = () => {
  const interfaces = networkInterfaces();
  let localIP = "";

  for (const interfaceName in interfaces) {
    for (const networkInterface of interfaces[interfaceName]) {
      if (networkInterface.family === "IPv4" && !networkInterface.internal) {
        localIP = networkInterface.address;
        break;
      }
    }
    if (localIP) break;
  }

  const envAppwriteFile = ".env";
  const envData = `EXPO_PUBLIC_APPWRITE_ENDPOINT=http://${localIP}/v1\n`;

  appendFileSync(envAppwriteFile, envData);

  return localIP;
};

getLocalIPEnv();
