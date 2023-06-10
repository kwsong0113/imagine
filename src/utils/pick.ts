export function pick(obj: Record<any, any>, ...props: any[]) {
  return props.reduce(function (result, prop) {
    result[prop] = obj[prop];
    return result;
  }, {});
}
