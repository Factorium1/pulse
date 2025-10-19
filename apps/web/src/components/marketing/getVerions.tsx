'use server'

import fs from 'fs'
import path from 'path'

export async function getVersions() {
  const folderPath = path.join(process.cwd(), 'src', 'assets', 'release')
  const files = fs.readdirSync(folderPath)
  const filteredFiles = files.map((file) => file.split('.')[0])

  return filteredFiles
}
