/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "ion-next-app",
      removal: "remove", // input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          profile: "sst",
          region: "ca-central-1",
        },
      },
    };
  },
  async run() {
    const bucket = new sst.aws.Bucket("IonNextAppBucket", {
      access: "public",
      cors: {
        allowHeaders: ["*"],
        allowOrigins: ["*"],
        allowMethods: ["GET"],
      },
    });
    new sst.aws.Nextjs("MyWeb", {
      link: [bucket],
    });
  },
});
