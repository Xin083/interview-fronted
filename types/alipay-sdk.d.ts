declare module 'alipay-sdk' {
  interface AlipayConfig {
    appId: string;
    privateKey: string;
    alipayPublicKey: string;
    gateway: string;
  }

  class AlipaySdk {
    constructor(config: AlipayConfig);
    exec(method: string, params: any): Promise<string>;
  }

  export = AlipaySdk;
} 