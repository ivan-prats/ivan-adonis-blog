export const POSSIBLE_ENVS = ['development', 'production', 'testing', 'staging'] as const
export type PossibleEnv = typeof POSSIBLE_ENVS[number]

export default class Environment {
  public static POSSIBLE_ENVS = POSSIBLE_ENVS
  private constructor(private readonly _NODE_ENV: PossibleEnv, private readonly config: ConfigI) {
    if (!this._NODE_ENV || false === POSSIBLE_ENVS.includes(this._NODE_ENV))
      throw new Error(`Unrecognized NODE_ENV: "${this._NODE_ENV}"`)

    if (!config.publicCdnBaseUrl || typeof config.publicCdnBaseUrl !== 'string')
      throw new Error(
        `"publicCdnBaseUrl" needs to be a valid non-empty string. Instead we got: <${config.publicCdnBaseUrl}>`
      )
    else if (config.publicCdnBaseUrl.trim().endsWith('/'))
      throw new Error(
        `"publicCdnBaseUrl" cannot end with a "/". We got: <${config.publicCdnBaseUrl}>`
      )
  }

  public get trackingPageAnalytics(): boolean {
    return this._NODE_ENV === 'production'
  }

  public get NODE_ENV(): PossibleEnv {
    return this._NODE_ENV
  }

  public get assetsBaseUrl(): string {
    switch (this._NODE_ENV) {
      case 'production':
      case 'staging':
        return this.config.publicCdnBaseUrl.trim()

      default:
        return ''
    }
  }

  public static newFromEnv(NODE_ENV: PossibleEnv, config: ConfigI): Environment {
    return new Environment(NODE_ENV, config)
  }
}

interface ConfigI {
  publicCdnBaseUrl: string
}
