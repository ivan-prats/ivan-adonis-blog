import test from 'japa'
import MarkdownFilesService from 'App/Services/MarkdownFilesService'
import path from 'path'

test.group('MarkdownFilesService unit tests', () => {
  test(`when calling "getFileNamesOfDir" method with this file's directory, it returns an array with this file's name in it`, async (assert) => {
    const fileNames = await MarkdownFilesService.getFileNamesOfDir(__dirname)

    const thisFileName = __filename.split('/').pop()
    assert.include(fileNames, thisFileName)
  })

  test(`when calling "import" method with this directory's "testing.md" file, it returns the correct metadata`, async (assert) => {
    const expectedMetadata = {
      'this is a string': 'yellow',
      'this is a number': 1,
      'this is 4': 4,
    }
    const { metadata } = await MarkdownFilesService.import(path.join(__dirname, 'testing.md'))
    assert.deepEqual(metadata, expectedMetadata)
  })

  test(`when calling "import" method with this directory's "testing.md" file, it returns the content as html`, async (assert) => {
    const expectedHtml = '<p>In here we will put the html</p>\n'
    const { html } = await MarkdownFilesService.import(path.join(__dirname, 'testing.md'))
    assert.deepEqual(html, expectedHtml)
  })
})
