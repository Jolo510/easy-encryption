/*
	Functions that are only meant to work on the client side
*/

/**
 * getEmailAccountsFromLocalStorage()
 * - Function gets all of the emails associated with private keys that are in local storage
 * - Returns an array
 **/
let getEmailAccountsFromLocalStorage = function() {
	let emailsArray = [];

	for ( let i = 0, len = localStorage.length; i < len; ++i ) {
		if ( localStorage.key( i ).includes("easyEncodingKey") ) {
			const parts = localStorage.key( i ).split('-');
      		const emailAddress = parts.pop();
			emailsArray.push( emailAddress );
		}
	}

	return emailsArray;
}

EncryptionKeyHelpers = {
	getEmailAccountsFromLocalStorage: getEmailAccountsFromLocalStorage
}
