// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RequestsController {

    requestForm ({ view }) {
        return view.render('welcome')
      }
}

module.exports = RequestsController
