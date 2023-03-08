export const pick = <T extends object, K extends keyof T>(object: T, keys: K[]): Pick<T, K> => {
  return Object.assign(
    {},
    ...keys.map(key => {
      if (object && object.hasOwnProperty(key)) {
        return {[key]: object[key]}
      }

      return {}
    }),
  )
}

export const assignPick = <T extends object>(
  object: T,
  data: PartialProperties<T>,
  keys: PartialPropertyNames<T>[],
): void => {
  Object.assign(object, pick(data, keys))
}
