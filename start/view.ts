/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import View from '@ioc:Adonis/Core/View'
import Env from '@ioc:Adonis/Core/Env'
import Environment from 'App/Domains/Shared/Environment'

View.global('currentEnvironment', Environment.newFromEnv(Env.get('NODE_ENV')))
