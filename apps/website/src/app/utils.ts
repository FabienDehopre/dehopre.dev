export function assertUnreachable(x: never, message = 'Didn\'t expect to get here.'): never {
  throw new Error(message, { cause: { unreachable: true, invalidValue: x } });
}
