import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SupportRequest extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_email: string

  @column()
  public request_title: string

  @column()
  public request_text: string

  @column()
  public file_data: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
