import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// CSVファイルから読み込んだデータを格納する型
interface MovieData {
  title: string
  siteUrl: string
  imageUrl: string
  publicationDate: string
}

// CSV行をパースする関数
function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const nextChar = line[i + 1]

    if (char === '"' && inQuotes && nextChar === '"') {
      // エスケープされた引用符
      current += '"'
      i++ // 次の文字をスキップ
    } else if (char === '"') {
      // 引用符の開始または終了
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      // フィールドの区切り
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }

  // 最後のフィールドを追加
  result.push(current.trim())

  return result
}

// SQL文字列をエスケープする関数
function escapeSqlString(str: string): string {
  return str.replace(/'/g, "''")
}

// メイン関数
async function generateSqlFromCsv(
  inputCsvPath: string,
  outputSqlPath: string
): Promise<void> {
  try {
    // 出力ディレクトリが存在しない場合は作成
    const outputDir = path.dirname(outputSqlPath)
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
      console.log(`📁 出力ディレクトリを作成しました: ${outputDir}`)
    }

    // CSVファイルを読み込む
    const csvContent = fs.readFileSync(inputCsvPath, 'utf-8')

    // 改行コードを統一してから分割
    const lines = csvContent
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .trim()
      .split('\n')
    const dataLines = lines.slice(1) // ヘッダー行をスキップ

    // INSERT文の配列を準備
    const insertStatements: string[] = []

    for (const line of dataLines) {
      // 空行はスキップ
      if (!line.trim()) continue

      // CSVラインをパース
      const fields = parseCSVLine(line)

      if (fields.length >= 4) {
        const movieData: MovieData = {
          title: fields[0],
          siteUrl: fields[1],
          imageUrl: fields[2],
          publicationDate: fields[3]
        }

        // SQLインジェクション対策のエスケープ処理
        const escapedTitle = escapeSqlString(movieData.title)
        const escapedSiteUrl = escapeSqlString(movieData.siteUrl)
        const escapedImageUrl = escapeSqlString(movieData.imageUrl)

        // INSERT文を生成
        const insertStatement = `insert into "PublicMovie" ("publicationDate", title, "siteURL", image) VALUES ('${movieData.publicationDate}', '${escapedTitle}', '${escapedSiteUrl}', '${escapedImageUrl}');`

        insertStatements.push(insertStatement)
      }
    }

    // SQLファイルに書き込む
    fs.writeFileSync(outputSqlPath, insertStatements.join('\n'), 'utf-8')

    console.log(`✅ SQLファイルが正常に生成されました: ${outputSqlPath}`)
    console.log(`📊 処理された行数: ${insertStatements.length}`)
  } catch (error) {
    console.error('❌ エラーが発生しました:', error)
    process.exit(1)
  }
}

// デフォルトファイルパス
const DEFAULT_INPUT_CSV = 'csv/public-movies.csv'
const DEFAULT_OUTPUT_SQL = 'sql/public-movies.sql'

// コマンドライン引数から入力ファイルパスを取得（未指定ならデフォルト使用）
const inputCsvPath = process.argv[2] || DEFAULT_INPUT_CSV
const outputSqlPath = process.argv[3] || DEFAULT_OUTPUT_SQL

// スクリプト実行
generateSqlFromCsv(inputCsvPath, outputSqlPath).catch((err) => {
  console.error('未処理のエラーが発生しました:', err)
  process.exit(1)
})
