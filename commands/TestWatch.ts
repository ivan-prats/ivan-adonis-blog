import { args, BaseCommand, flags } from '@adonisjs/core/build/standalone'
// More info @https://github.com/remy/nodemon/blob/HEAD/doc/requireable.md

export default class TestWatch extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'test:watch'

  /**
   * Command description is displayed in the "help" output
   */
  public static description =
    'Used nodemon to run "npm run test:all" command on test or application file changes.'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command
     */
    loadApp: false,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process
     */
    stayAlive: true,
  }

  @args.string({
    description:
      'Input argument to use for filtering the test file names. Leave empty to not filter',
    required: false,
  })
  public filter: string

  @flags.boolean({
    description:
      'Load the database configuration, with migration rollbacks and runs. This takes longer to do, but is necessary depending on the tests. Defaults to "true".',
  })
  public loadDB: boolean

  @flags.boolean({
    description:
      'Load the database seeders. This flag can only be true if the "loadDB" flag is true',
  })
  public loadSeeders: boolean

  @flags.boolean({
    description:
      'Load the database default factories with the command "node ace db:mongo_factories". This flag can only be true if the "loadDB" flag is true',
  })
  public loadFactories: boolean

  public async run() {
    this.logger.info('Starting custom command test:watch')

    const filter = this.filter || (await this.askFilter())
    const loadDB = await this.getLoadDBFlag(this.loadDB)
    const { loadSeeders, loadFactories } = await (async (loadDB) => {
      if (loadDB === false) return { loadSeeders: false, loadFactories: false }
      else return await this.getLoadSeedersAndFactoriesFlags()
    })(loadDB)

    const nodemonExecCommand = buildNodemonCommand(
      'npm run test:raw --silent',
      filter,
      loadDB,
      loadSeeders,
      loadFactories
    )
    const fullNodemonCommand = `--config nodemon.json --exec "${nodemonExecCommand}"`
    this.logger.info(`Starting nodemon with the command: 'nodemon ${fullNodemonCommand}'`)

    // More info @https://github.com/remy/nodemon/blob/HEAD/doc/requireable.md
    require('nodemon')(fullNodemonCommand)
  }

  private getLoadDBFlag = async (initialLoadDBFlag: undefined | boolean) => {
    const errorDueToFlagNotRecognized = new Error(
      `The flag "loadDB" should be boolean. We did not recognize the value: ${initialLoadDBFlag}`
    )

    switch (typeof initialLoadDBFlag) {
      case 'undefined':
        return await this.prompt.confirm('Do you want to load the DB?', {
          default: true,
          hint: 'This will load all migrations. It is required if we make database queries for tests, but it takes longer.',
        })

      case 'boolean':
        return initialLoadDBFlag

      case 'string':
        switch (initialLoadDBFlag) {
          case 'true':
          case '1':
            return true
          case 'false':
          case '0':
            return false

          default:
            throw errorDueToFlagNotRecognized
        }

      default:
        throw errorDueToFlagNotRecognized
    }
  }

  private askFilter = async () => {
    return await this.prompt.ask(
      'Enter an optional test-namefile filter. Leave empty to not apply any.'
    )
  }

  private getLoadSeedersAndFactoriesFlags = async () => {
    const possibleChoices = [
      'Load seeders only',
      'Load factories only',
      'Load seeders and factories',
    ] as const

    const choice = await this.prompt.choice(
      'Do you want to load seeders and/or default factories?',
      possibleChoices
    )

    switch (choice) {
      case 'Load factories only':
        return { loadSeeders: false, loadFactories: true }
      case 'Load seeders only':
        return { loadSeeders: true, loadFactories: false }
      case 'Load seeders and factories':
        return { loadSeeders: true, loadFactories: true }

      default:
        throw new Error(`This choice (${choice}) needs a case first`)
    }
  }
}

const buildNodemonCommand = (
  baseCommand: string,
  filter: string | undefined,
  loadDBFlag: boolean,
  loadSeeders: boolean,
  loadFactories: boolean
) => {
  let nodemonCommand = baseCommand
  if (filter) nodemonCommand += ` -- ${filter}`
  if (loadDBFlag === false) nodemonCommand += ` -- --no-migrations-rollback`
  if (loadSeeders === false) nodemonCommand += ` -- --no-db-seeders`
  if (loadFactories === false) nodemonCommand += ` -- --no-db-factories`
  // console.log(nodemonCommand)
  return nodemonCommand
}
