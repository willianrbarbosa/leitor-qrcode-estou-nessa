export function emptyTextValidator(text, label) {
  if (!text) return label + " não pode estar em branco."
  return ''
}