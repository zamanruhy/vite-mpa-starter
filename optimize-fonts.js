import fs from 'node:fs'
import { execSync } from 'node:child_process'

const inputDir = 'raw/fonts/'
const outputDir = 'public/static/fonts/'

if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true })
}

fs.mkdirSync(outputDir, { recursive: true })

console.log(`Fonts optimization started...`)

execSync(
  `npx glyphhanger --subset=${inputDir}*.ttf --formats=woff2,woff --output=${outputDir}`
)

const files = fs.readdirSync(outputDir)

files.forEach((file) => {
  fs.renameSync(
    `${outputDir}${file}`,
    `${outputDir}${file.replace('-subset', '')}`
  )
})

console.log(`Fonts optimization completed.`, files)
