export type Primitive = null | undefined | string | number | boolean | symbol | bigint

export type DeepPartial<T> = T extends Primitive
  ? T
  : {
      [P in keyof T]?: DeepPartial<T[P]>
    }

export type Dictionary<T> = Record<string, T>

export interface MyWindow extends Window {
  pushLogin: () => void
}

export const omitDeep = (obj: any, key: string) => {
  const keys = Object.keys(obj)
  const newObj: any = {}
  keys.forEach((i) => {
    if (i !== key) {
      const val = obj[i]
      if (val instanceof Date) newObj[i] = val
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      else if (Array.isArray(val)) newObj[i] = omitDeepArrayWalk(val, key)
      else if (typeof val === 'object' && val !== null) newObj[i] = omitDeep(val, key)
      else newObj[i] = val
    }
  })
  return newObj
}

export const omitDeepArrayWalk = (arr: any, key: string) => {
  return arr.map((val: any) => {
    if (Array.isArray(val))
      return function () {
        return omitDeepArrayWalk(val, key)
      }
    if (typeof val === 'object') return omitDeep(val, key)
    return val
  })
}
