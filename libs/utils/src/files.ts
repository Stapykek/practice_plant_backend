import { STATIC_SERVE_ROUTE, UPLOAD_FOLDER_PATH } from '@app/constants'
import fs from 'node:fs'
import path from 'node:path'
import { BadRequestException, ParseFilePipe, ParseFilePipeBuilder } from '@nestjs/common'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { diskStorage } from 'multer'

export function generateRelativeUrl(filename: string): string {
  return `${STATIC_SERVE_ROUTE}/${filename}`
}

export function retrievePathFromRelativeUrl(url: string): string {
  if (!url.startsWith(`${STATIC_SERVE_ROUTE}/`)) {
    throw new Error(`Invalid Relative URL for static serve: ${url}`)
  }

  const relativeFilePath = url.slice(`${STATIC_SERVE_ROUTE}/`.length)

  return UPLOAD_FOLDER_PATH + '/' + relativeFilePath
}

export function deleteFileByRelativeUrl(url: string) {
  try{
    const filePath = retrievePathFromRelativeUrl(url)
    console.log(`Retrieved ${filePath}`)
    if (fs.existsSync(filePath)) {
      fs.rm(filePath, (err) => {})
    }
  } catch(error) {
    console.log(error)
  }
}

export function generateFileName(originalFileName: string) {
  const ext = path.extname(originalFileName)
  const uuid = crypto.randomUUID()
  const currentDate = new Date(Date.now())
  return `${uuid}-${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}${ext}`
}

const globalFilePipe = new ParseFilePipeBuilder()
  .addMaxSizeValidator({
    maxSize: 10 * 1024 * 1024,
  })
  .build({
    fileIsRequired: false,
  })

const globalMulterOptions: MulterOptions = {
  storage: diskStorage({
    destination: `${UPLOAD_FOLDER_PATH}`,
    filename: (req, file, cb) => {
      cb(null, generateFileName(file.originalname))
    },
  }),
  fileFilter(
    req: any,
    file: {
      fieldname: string
      originalname: string
      encoding: string
      mimetype: string
      size: number
      destination: string
      filename: string
      path: string
      buffer: Buffer
    },
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp']
    const allowedExts = /jpeg|jpg|jfif|png|webp/

    const mimeType = allowedMimes.includes(file.mimetype)
    const extName = allowedExts.test(path.extname(file.originalname).toLowerCase())

    if (mimeType && extName) {
      return callback(null, true)
    }

    callback(new BadRequestException(`Invalid file type. Only ${allowedMimes.join(', ')} are allowed.`), false)
  },
}

export function getImageUploadMulterOptions(): MulterOptions {
  return globalMulterOptions
}

export function getImageUploadPipe(): ParseFilePipe{
  return globalFilePipe
}