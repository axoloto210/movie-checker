import LoginButton from './LoginButton'

export function LoginCaveat() {
  return (
    <div className="text-center">
      <h2 className="mb-4 text-lg text-red-500">{`映画情報の管理にはGitHubアカウントによるログインが必要です。`}</h2>
      <LoginButton />
    </div>
  )
}
