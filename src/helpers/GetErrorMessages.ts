export function getErrorMessages(errors) {
  const mensagensComPath = errors.map((error) => `${error.path}: ${error.msg}`);

  return mensagensComPath.join(", ");
}
