import JSEncrypt from "jsencrypt/bin/jsencrypt.min.js";

const privateKey =
  "MIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT0wggE5AgEAAkEApPIA1EPdMU4NJ+Q4PqZ1aZlfxlakAMSkfPkep5HYdvsoCx91Q2Ipc/Q0eJsEtfxq+cFUG9kygmZ2g7lkol9tSQIDAQABAkBkxrr89W2qVx6wlb5LgNZRq3SZsIvJMFuzQ12YUgJoRnH1HBjaZUDg0SQB8sJjpapSedjSreW3La9CDiPUxfJRAiEA9gotDSpOe0akzXaK1uSSMThkG/SYfpLxBKDUZlArrvUCIQCrn2h7JbQIXMzx+bcAQxpVUq4BSa1GG7fRn5nW1fJohQIgeHzXPyE+ucQIpM2uhDn/FbeF3uLTYvjWquuP2GLeYZkCIHpJ6f7lzLSwu3AoSVeseNUXRtmwEAGGuqJpoQrOBB6pAiA7Ex5SPFT24ykCuMN1MHFgpyyPJW5OIiNor9o5m3862Q==";
const publicKey =
  "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKTyANRD3TFODSfkOD6mdWmZX8ZWpADEpHz5HqeR2Hb7KAsfdUNiKXP0NHibBLX8avnBVBvZMoJmdoO5ZKJfbUkCAwEAAQ==";

//rsa加密
export function encryptedData(data) {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(
    `-----BEGIN PUBLIC KEY-----${publicKey}-----END PUBLIC KEY-----`
  );
  return encrypt.encrypt(JSON.stringify(data));
}

//rsa解密
export function decryptedData(data) {
  const decrypt = new JSEncrypt();
  decrypt.setPrivateKey(
    `-----BEGIN RSA PRIVATE KEY-----${privateKey}-----END RSA PRIVATE KEY-----`
  );
  data = decrypt.decrypt(JSON.stringify(data));
  return data;
}
