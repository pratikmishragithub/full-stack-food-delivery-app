import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({success:false,message:'Not Authorized Login Again'});
    }
    try {
        const token_decode =  jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;  //take token and convert into userid with this user id we can remove or add data from user id.
        next();
    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}

export default authMiddleware;