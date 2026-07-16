import { Request } from 'express'

export function extractHost(req: Request): string {
  return `${req.protocol}://${req.get('host')}`
}