const avoidDetection = async (page) => {
  const userAgent =
    "Mozilla/5.0 (X11; Linux x86_64)" +
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36";
  await page.setUserAgent(userAgent);

  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, "webdriver", {
      get: () => false,
    });
  });

  await page.evaluateOnNewDocument(() => {
    window.navigator.chrome = {
      app: {
        isInstalled: false,
      },
      webstore: {
        onInstallStageChanged: {},
        onDownloadProgress: {},
      },
      runtime: {
        PlatformOs: {
          MAC: "mac",
          WIN: "win",
          ANDROID: "android",
          CROS: "cros",
          LINUX: "linux",
          OPENBSD: "openbsd",
        },
        PlatformArch: {
          ARM: "arm",
          X86_32: "x86-32",
          X86_64: "x86-64",
        },
        PlatformNaclArch: {
          ARM: "arm",
          X86_32: "x86-32",
          X86_64: "x86-64",
        },
        RequestUpdateCheckStatus: {
          THROTTLED: "throttled",
          NO_UPDATE: "no_update",
          UPDATE_AVAILABLE: "update_available",
        },
        OnInstalledReason: {
          INSTALL: "install",
          UPDATE: "update",
          CHROME_UPDATE: "chrome_update",
          SHARED_MODULE_UPDATE: "shared_module_update",
        },
        OnRestartRequiredReason: {
          APP_UPDATE: "app_update",
          OS_UPDATE: "os_update",
          PERIODIC: "periodic",
        },
      },
    };

    window.chrome = true;
  });

  await page.evaluateOnNewDocument(() => {
    const originalQuery = window.navigator.permissions.query;
    return (window.navigator.permissions.query = (parameters) =>
      parameters.name === "notifications"
        ? Promise.resolve({ state: Notification.permission })
        : originalQuery(parameters));
  });

  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, "plugins", {
      get: () => [1, 2, 3, 4],
    });
  });

  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, "languages", {
      get: () => ["en-US", "en"],
    });
  });
};

module.exports = avoidDetection;
