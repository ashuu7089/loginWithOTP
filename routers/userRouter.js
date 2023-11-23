const router = require('express').Router()

const user = require('../controllers/userController')
const { upload } = require('../middlewares/fileUploader')
const  checkAuth  = require('../middlewares/authMiddlware')

router.post('/login', user.userLogin);
router.post('/verify-otp', user.verifyUserOtp)
router.post('/upload-file', checkAuth ,upload.single('file'), user.uploadFile)

module.exports = router;