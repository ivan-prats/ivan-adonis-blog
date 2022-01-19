import 'reflect-metadata'
import { join } from 'path'
import execa from 'execa'
import getPort from 'get-port'
import { configure } from 'japa'
import sourceMapSupport from 'source-map-support'

process.env.NODE_ENV = 'testing'
process.env.ADONIS_ACE_CWD = join(__dirname)
sourceMapSupport.install({ handleUncaughtExceptions: false })
const TESTING_TYPE = process.env.TESTING_TYPE

async function startHttpServer() {
  const { Ignitor } = await import('@adonisjs/core/build/src/Ignitor')
  process.env.PORT = String(await getPort())
  await new Ignitor(__dirname).httpServer().start()
}

async function runMigrations() {
  await execa.node('ace', ['migration:run'], {
    stdio: 'inherit',
  })
}

async function rollbackMigrations() {
  await execa.node('ace', ['migration:rollback', '--batch', '0'], {
    stdio: 'inherit',
  })
}

/**
 */
async function insertSeeders() {
  await execa.node('ace', ['db:seed'], {
    stdio: 'inherit',
  })
}

async function runFactories() {
  await execa.node('ace', ['db:mongo_factories'], {
    stdio: 'inherit',
  })
}

// async function buildAssets() {
//   await execa.node('ace', ['build', '--assets'], {
//     stdio: 'inherit',
//   })
// }

/**
 * Configure test runner
 */
configure({
  filter(filePath) {
    const inputs = process.argv.slice(2)
    const nonFlagArguments = inputs.filter((input) => !input.includes('--'))
    const treatedNonFlagArguments = nonFlagArguments
      .map((arg) => arg.replace(/\.ts$|\.js$/, '').replace('.spec', ''))
      .filter((arg) => arg !== '')

    // If we ran out of arguments: we accept all files
    if (treatedNonFlagArguments.length === 0) return true
    else {
      let matchesAtLeastOneArgument = false
      for (const argument of treatedNonFlagArguments) {
        if (filePath.includes(argument)) matchesAtLeastOneArgument = true
      }

      return matchesAtLeastOneArgument
    }
  },

  files: ((TEST_MODE: string) => {
    switch (TEST_MODE?.toLowerCase()) {
      case 'unit':
      case 'alpine':
        return ['test/Unit/**/*.spec.ts']

      case 'integration':
        return ['test/Integration/**/*.spec.ts']

      case 'system':
      case 'acceptance':
        return ['test/System/**/*.spec.ts']

      case 'all':
      default:
        return ['test/**/*.spec.ts']
    }
  })(TESTING_TYPE || 'all'),

  before: actionsToRunBeforeTests(process.argv.slice(2)),

  timeout: TESTING_TYPE === 'system' || TESTING_TYPE === 'all' ? 20000 : 10000,
})

function actionsToRunBeforeTests(commandLineArguments: string[]) {
  let actions: any[] = []
  if (undefined === commandLineArguments.find((argument) => argument.startsWith('--'))) {
    // No flags => Do Nothing!
  } else {
    if (commandLineArguments.includes('--no-migrations-rollback')) {
      // Nothing!
    } else {
      actions.push(rollbackMigrations)
      if (commandLineArguments.includes('--no-db')) {
      } else {
        actions.push(runMigrations)

        if (!commandLineArguments.includes('--no-db-seeders')) {
          actions.push(insertSeeders)
        }

        if (!commandLineArguments.includes('--no-db-factories')) {
          actions.push(runFactories)
        }
        // actions.push(buildAssets)
      }
    }
  }
  actions.push(startHttpServer)
  return actions
}
