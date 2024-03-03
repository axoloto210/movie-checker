//fetch APIを共通化したファイルです。

type Options<T = object> = {
  params?: T
  headers?: HeadersInit
}

/** 絶対URLかどうかを判定する　*/
function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url)
}

/** URLとパスを連結する */
function combineUrls(baseURL: string, relativeURL: string): string {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL
}

/** URLを構築する */
function buildFullPath(baseURL: string, requestedURL: string): string {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineUrls(baseURL, requestedURL)
  }
  return requestedURL
}

/** リクエストヘッダを構築する */
function buildHeaders<T = HeadersInit>(headers?: T): HeadersInit {
  if (!headers) {
    // 未指定の場合、`Content-Type: application/json` を返す
    return {
      'Content-Type': 'application/json'
    }
  }
  return headers
}

/** クエリパラメータ付きのURLパスを構築する */
function buildPathWithSearchParams<T = object>(path: string, params?: T) {
  // パラメータがない場合、URLパスをそのまま返す
  if (!params || Object.keys(params).length === 0) return path

  for (const key in params) {
    if (params[key] === undefined) {
      // URLSearchParamsで`key="undefined"`になるので削除する
      delete params[key]
    }
  }

  const urlSearchParams = new URLSearchParams(params)
  return `${path}?${urlSearchParams.toString()}`
}

const apiURL = process.env.NEXT_PUBLIC_BASE_URL + '/api'

/** 通信処理を共通化した関数 */
async function http<T>(path: string, config: RequestInit): Promise<T> {
  const request = new Request(buildFullPath(apiURL, path), config)

  const res = await fetch(request)

  if (!res.ok) {
    const error = new Error()
    const data = await res.json()
    error.message = data.message
    throw error
  }

  return await res.json()
}

export async function getFetch<T, U = object>(
  path: string,
  options?: Options<U>
): Promise<T> {
  return http<T>(
    buildPathWithSearchParams(path, options?.params ?? undefined),
    {
      method: 'GET',
      headers: buildHeaders(options?.headers)
    }
  )
}

export async function postFetch<T, U, V = object>(
  path: string,
  body: T,
  options?: Options<V>
): Promise<U> {
  return http<U>(path, {
    method: 'POST',
    headers: buildHeaders(options?.headers),
    body: JSON.stringify(body)
  })
}

export async function putFetch<T, U = object>(
  path: string,
  body: T,
  options?: Options<U>
): Promise<U> {
  return http<U>(path, {
    method: 'PUT',
    headers: buildHeaders(options?.headers),
    body: JSON.stringify(body)
  })
}

export async function deleteFetch<T = object>(
  path: string,
  options?: Options<T>
): Promise<unknown> {
  return http(buildPathWithSearchParams(path, options?.params ?? undefined), {
    method: 'DELETE',
    headers: buildHeaders(options?.headers)
  })
}
