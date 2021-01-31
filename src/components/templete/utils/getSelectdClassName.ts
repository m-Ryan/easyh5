

export function getSelectdClassName(idx: string, focusIdx: string) {
  if (idx === focusIdx) {
    return ' block-selected ';
  }

  return ' ';
}