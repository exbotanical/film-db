export type NumericRange<
  Start extends number,
  End extends number,
  Arr extends unknown[] = [],
  Acc extends number = never,
> = Arr['length'] extends End
  ? Acc | End | Start
  : NumericRange<
      Start,
      End,
      [...Arr, 1],
      Arr[Start] extends undefined ? Acc : Acc | Arr['length']
    >

export type Nullish = null | undefined
