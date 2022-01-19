import fs from 'fs'
import MarkdownIt from 'markdown-it'
const meta = require('markdown-it-meta')
const newMdInstance = () => new MarkdownIt({ html: true, linkify: true }).use(meta)

class MarkdownService {
  public async import<MetadataI>(
    absoluteFilePathToImport: string
  ): Promise<{ html: string; metadata: MetadataI }> {
    const fileContents = await fs.promises.readFile(absoluteFilePathToImport, 'utf8')
    const md = newMdInstance()
    const html = md.render(fileContents)
    return {
      html,
      metadata: (md as any).meta,
    }
  }

  public async getFileNamesOfDir(absoluteFolderPath: string): Promise<string[]> {
    return await fs.promises.readdir(absoluteFolderPath)
  }
}

export default new MarkdownService()
