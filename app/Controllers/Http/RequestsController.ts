// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from "@ioc:Adonis/Lucid/Database"
import CreateRequestValidator from "App/Validators/CreateRequestValidator";

export default class RequestsController {

    requestForm ({ view }) {
        return view.render('welcome')
      }

      async submitRequest ({ request, response }) {
        
          const payload = await request.validate(CreateRequestValidator)

          // Check if the user already exists
        let user = await Database.from('users').where('email', payload.email).first()
        
    
        // Save user data to the database
        if(!user){
            await Database.table('users').insert({
                email: payload.email,
                full_name: payload.first_name + ' ' + payload.last_name
            })
        }

        await Database.table('support_requests').insert({
            request_title: payload.request_title,
            request_text: payload.request_text,
            user_email: payload.email,
            file_data: payload.file_data
        })
        
        // Attach file data if provided
    
        return response.redirect().back()
      }

      async getRequest ({params,response}) {        

        const { email } = params

        let user = await Database.from('support_requests').where('user_email', email)
        
        return response.json({user})

      }
}

module.exports = RequestsController
