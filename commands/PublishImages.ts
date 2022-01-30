import { BaseCommand } from '@adonisjs/core/build/standalone'
import mime from 'mime-types'
import S3SyncClient from 's3-sync-client'

/**
 * Full credit to: https://github.com/adonisjs-community/polls-app/blob/main/commands/PublishAssets.ts
 */

export default class PublishImages extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'publish:images'

  /**
   * Command description is displayed in the "help" output
   */
  public static description =
    'Publish public/images directory to a remote s3 or digital ocean bucket'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: false,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  /**
   * Returns an instance of the sync client
   */
  private getSyncClient() {
    return new S3SyncClient({
      credentials: {
        accessKeyId: this.application.env.get('CDN_S3_KEY'),
        secretAccessKey: this.application.env.get('CDN_S3_SECRET'),
      },
      region: this.application.env.get('CDN_S3_REGION'),
      endpoint: this.application.env.get('CDN_S3_ENDPOINT'),
    })
  }

  /**
   * Monitor transfer of assets
   */
  private monitorTransfer() {
    const monitor = new S3SyncClient.TransferMonitor()
    monitor.on('progress', ({ count }) => {
      this.logger.logUpdate(
        `Uploading ${this.colors.yellow(count.current)} of ${this.colors.yellow(count.total)}`
      )
    })

    return monitor
  }

  public async run() {
    /**
     * The setup method loads the environment variables
     */
    await this.application.setup()

    const client = this.getSyncClient()
    const monitor = this.monitorTransfer()

    this.logger.info(`Syncing images to ${this.application.env.get('CDN_S3_ENDPOINT')}`)

    /**
     * Sync the local images directory with the bucket images
     * directory. Also cleanup files missing on the local
     */
    await client.sync(
      this.application.publicPath('images'),
      `s3://${this.application.env.get('CDN_S3_BUCKET')}/images`,
      {
        monitor,
        del: true,
        commandInput: {
          ACL: 'public-read',
          ContentType: (syncCommandInput) => `${mime.lookup(syncCommandInput.Key)}`,
        },
      }
    )

    this.logger.success('Images Sync completed')
  }
}
