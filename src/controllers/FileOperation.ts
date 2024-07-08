import multer from "multer"

const fs = require('fs');

const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, 'src/public/uploads')
	},
	filename: function (req, file, callback) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
		const mimeType = file.mimetype.split('/')[1]
		callback(null, 'file-' + uniqueSuffix + '.' + mimeType)
	}
})

export const fileUpload = multer({
	storage: storage
})