//
import { system } from './logger'

export default function systemLogger (options) {
  return (err, req, res, next) => {
    system.error(err.message)
    next(err)
  }
}
