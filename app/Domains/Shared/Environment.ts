export const POSSIBLE_ENVS = ['development', 'production', 'testing', 'staging'] as const
export type PossibleEnv = typeof POSSIBLE_ENVS[number]

export default class Environment {
  public static POSSIBLE_ENVS = POSSIBLE_ENVS
  private constructor(private readonly _NODE_ENV: PossibleEnv) {
    if (!this._NODE_ENV || false === POSSIBLE_ENVS.includes(this._NODE_ENV))
      throw new Error(`Unrecognized NODE_ENV: "${this._NODE_ENV}"`)
  }

  public get trackingPageAnalytics(): boolean {
    return this._NODE_ENV === 'production'
  }

  public get NODE_ENV(): PossibleEnv {
    return this._NODE_ENV
  }

  public static newFromEnv(NODE_ENV: PossibleEnv): Environment {
    return new Environment(NODE_ENV)
  }
}
