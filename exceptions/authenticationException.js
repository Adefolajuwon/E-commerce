class AuthenticationException extends Error {
	constructor() {
		super('User in not authnticated');
		this.name = 'AuthenticationException';
	}
}
module.exports = { AuthenticationException };
