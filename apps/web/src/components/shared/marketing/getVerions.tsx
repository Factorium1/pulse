'use server'

import fs from 'fs'
import path from 'path'

const getVersions = () => {
  const folderPath = path.join(process.cwd(), 'src', 'assets', 'release')
  const files = fs.readdirSync(folderPath)
  const filteredFiles = files.map((file) => file.split('.')[0])

  return filteredFiles
}

export default getVersions
