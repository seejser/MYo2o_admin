
import JsEncrypt from 'jsencrypt'


const encrypt = function(text){

	let encrypt = new JsEncrypt()
  	// 公钥
  	encrypt.setPublicKey(
    	'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAicOG/O83NnI9LN08TXTCYyJvcgU4lvlq/Z5EL7/XMIrYCQPeiUFJSq4hoPGq995B80nLQ+Cy2xu4bMIJWW0LK4ZGnRc80VoZ4zOqlE+qvAy80Zvx70wystL5RwR3xy7HKyWRPbiBm24KmGkiRxWYJNunYhyJ7FzW/HpWPGpFwpIPNkmhD1wVbUNLDMrj/Edz4HldOIGLovHgbwHDHtsi5LvWAaZWtRk4KVQrwhEsz11DyTCUnm1GCYWnxhVyUC+9LaG2JENwsZkdLz3lMgmYSb9WtClhjhwoxtEDaWEdvc9D4Fm1dZ9uTqR+IhK2+XA7XHfR5SS7OptVEK4eOHIP/QIDAQAB'
  	)
  	return encrypt.encrypt(text)

}


export default {
	encrypt
}