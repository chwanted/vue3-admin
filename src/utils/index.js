export function split(param = "") {
  if (
    param == undefined ||
    param == null ||
    param == "" ||
    !param ||
    typeof param != "string"
  ) {
    return [];
  }
  return param.split(",");
}
