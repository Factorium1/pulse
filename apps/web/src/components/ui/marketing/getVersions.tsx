'use server'

import fs from 'fs'
import path from 'path'

export async function getVersions(os: string) {
  const folderPath = path.join(process.cwd(), 'src', 'assets', 'release', os)
  const files = fs.readdirSync(folderPath)
  const filteredFiles = files.map((file) => file.split('.')[0])

  return filteredFiles
}
