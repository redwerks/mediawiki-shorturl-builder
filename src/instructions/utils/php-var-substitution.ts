/**
 * If a string starts with a value, substitute it with the PHP variable substitution for that value
 */
export function substStart(
  str: string,
  phpSubstitution: string,
  varValue: string
): string {
  if (varValue && str.startsWith(varValue)) {
    return phpSubstitution + str.substring(varValue.length);
  }

  return str;
}

/**
 * If a string ends with a value, substitute it with the PHP variable substitution for that value
 */
export function substEnd(
  str: string,
  phpSubstitution: string,
  varValue: string
): string {
  if (varValue && str.endsWith(varValue)) {
    return str.substring(0, str.length - varValue.length) + phpSubstitution;
  }

  return str;
}
