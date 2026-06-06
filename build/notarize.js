const { notarize } = require("@electron/notarize");

async function notarizeApp(appPath) {
  const appleId = process.env.APPLE_ID;
  const appleIdPassword = process.env.APPLE_APP_SPECIFIC_PASSWORD;
  const teamId = process.env.APPLE_TEAM_ID;

  if (!appleId || !appleIdPassword || !teamId) {
    console.log("Skipping notarization: APPLE_ID, APPLE_APP_SPECIFIC_PASSWORD, or APPLE_TEAM_ID is missing.");
    return;
  }

  await notarize({
    appBundleId: "cn.codex.led.widget.mac",
    appPath,
    appleId,
    appleIdPassword,
    teamId
  });
}

exports.default = async function notarizeMacApp(context) {
  const { electronPlatformName, appOutDir } = context;

  if (electronPlatformName !== "darwin") return;

  const appName = context.packager.appInfo.productFilename;
  await notarizeApp(`${appOutDir}/${appName}.app`);
};

if (require.main === module) {
  const appPath = process.env.APP_PATH;
  if (!appPath) {
    console.log("Set APP_PATH=/path/to/Codex LED Widget.app to notarize manually.");
    process.exit(0);
  }
  notarizeApp(appPath).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
