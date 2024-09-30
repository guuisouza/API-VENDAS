import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads')

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(req, file, callback) {
      // determina de qual forma cada arquivo será nomeado pra ser armazenado no servidor
      // e com seu nome único
      const fileHash = crypto.randomBytes(10).toString('hex')

      const fileName = `${fileHash}-${file.originalname}`

      callback(null, fileName)
    }
  })
}
