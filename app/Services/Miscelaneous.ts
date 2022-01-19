import slugifyPackage from 'slugify'

export function slugify(string: string) {
  return slugifyPackage(string.trim(), {
    locale: 'es',
    lower: true,
    replacement: '-',
    strict: true,
  })
}
