export interface HasImage {
  image?: string | null
}

export interface MultipleHasImage {
  items: HasImage[]
}

export type ProcessedImageResponse<T> = T extends HasImage
  ? HasImage
  : T extends MultipleHasImage
    ? MultipleHasImage
    : T

