import { env } from "@/env";
import ky, { Input, KyInstance, Options } from "ky";
import { getServerSession } from "next-auth";
import { authLogic } from "./auth/authLogic";
import { TRPCError } from "@trpc/server";
import { getStatusKeyFromCode } from "@trpc/server/unstable-core-do-not-import";
import curlOutput from "fetch-to-curl";

export const baseUrl = env.BACKEND_API_URL + "/api/v1";

const options: Options = {
  prefixUrl: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        const session = await getServerSession(authLogic);
        if (session?.access_token) {
          request.headers.set(
            "Authorization",
            `Bearer ${session.access_token}`,
          );
        }
        console.log("[CURL]\n", curlOutput(request));
      },
    ],
    afterResponse: [
      (_request, _options, response) => {
        const errorCodes = [400, 401];
        if (errorCodes.includes(response.status)) {
          console.error("[API] Error", response.status);
          throw new TRPCError({ code: getStatusKeyFromCode(response.status) });
        }
      },
    ],
  },
};

const kyInstance = ky.create(options);

const api = (instance: KyInstance) => {
  const s = sanitizeUrl;
  return {
    get: <T>(url: Input, config?: Options) =>
      instance.get<T>(s(url), config).json(),
    delete: <T>(url: Input, config?: Options) =>
      instance.delete<T>(s(url), config).json(),
    post: <T, TBody = unknown>(url: string, body?: TBody, config?: Options) =>
      instance.post<T>(s(url), { ...config, json: body }).json(),
    postFormData: <T>(url: string, form?: FormData, config?: Options) =>
      instance.post<T>(s(url), { ...config, body: form }).json(),
    patch: <T>(url: string, body?: BodyInit | null, config?: Options) =>
      instance.patch<T>(s(url), { ...config, json: body }).json(),
    patchFormData: <T>(url: string, form?: FormData, config?: Options) =>
      instance.patch<T>(s(url), { ...config, body: form }).json(),
    put: <T, TBody = unknown>(url: string, body?: TBody, config?: Options) =>
      instance.put<T>(s(url), { ...config, json: body }).json(),
  };
};

// TODO: extend to accept object for search params
function sanitizeUrl(url: Input): Input {
  const beginSlash = url.toString().charAt(0) === "/";
  if (beginSlash) return url.toString().slice(1);
  return url;
}


export function url(
  path: string,
  params: Record<
    string,
    string | number | boolean | string[] | number[] | boolean[]
  >,
): string {
  const _params = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value))
      value.forEach((value) => _params.append(key, value.toString()));
    else _params.append(key, value.toString());
  });

  return _params.size ? `${path}?${_params.toString()}` : path;
}

const _ky = api(kyInstance);
export { _ky };
