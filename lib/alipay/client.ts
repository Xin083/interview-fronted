interface AlipayConfig {
  appId: string;
  privateKey: string;
  alipayPublicKey: string;
  gateway: string;
}

const config: AlipayConfig = {
  appId: process.env.ALIPAY_APP_ID || '',
  privateKey: process.env.ALIPAY_PRIVATE_KEY || '',
  alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY || '',
  gateway: process.env.NODE_ENV === 'production'
    ? 'https://openapi.alipay.com/gateway.do'
    : 'https://openapi.alipaydev.com/gateway.do',
};

export { config }; 