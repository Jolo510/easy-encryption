let decrypt = function(privateKey, encryptedText) {
	if (!encryptedText) {
		return "";
	}

	if ( privateKey ) {
		var key = new RSA();

		key.importKey( privateKey, 'pkcs8' );
		var decryptedSubject = key.decrypt( encryptedText, 'base64' );

		return window.atob( decryptedSubject );
	} else {
		return encryptedText;
	}
}

RSAHelpers = {
  decrypt: decrypt
};