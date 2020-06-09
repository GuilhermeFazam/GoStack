import jwt from 'jsonwebtoken';
// import promisify from 'util';
import authConfig from '../../config/auth';

export default (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({ error: 'Token not provided' });
	}

	const [, token] = authHeader.split(' ');

	try {
		// const decoded = await promisify(jwt.verify)(token, authConfig.secret);
		const decoded = jwt.verify(token, authConfig.secret, (err, result) => {
			req.userId = result.id;
			return result;
		});

		console.log(req.userId);
		console.log(decoded);

		return next();
	} catch (err) {
		return res.status(401).json({ error: 'Token invalid' });
	}
};
