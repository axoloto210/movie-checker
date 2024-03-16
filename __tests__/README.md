Next.jsでのテストセットアップについて
https://nextjs.org/docs/app/building-your-application/testing/jest

snapshotを更新する場合は
`$pnpm test -- -u`.

ファイルを指定して実行する場合は、`pnpm test --  ./__tests__/snapshot.tsx -u`