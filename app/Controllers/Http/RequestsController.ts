// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from "@ioc:Adonis/Lucid/Database"

export default class RequestsController {

    requestForm ({ view }) {
        return view.render('welcome')
      }

      async submitRequest ({ request, response }) {
        
        const data = request.only(['first_name', 'last_name', 'email', 'request_title', 'request_text'])
        const fileData = request.file('file_data')
        console.log(data);
        

          // Check if the user already exists
        let user = await Database.from('users').where('email', data.email).first()
        console.log(user);
        
    
        // Save user data to the database
        if(!user){
            await Database.table('users').insert({
                email: data.email,
                full_name: data.first_name + ' ' + data.last_name
            })
        }

        await Database.table('support_requests').insert({
            request_title: data.request_title,
            request_text: data.request_text,
            user_email: data.email
        })
        
        // Attach file data if provided
    
        return response.redirect().back()
      }
}

module.exports = RequestsController
