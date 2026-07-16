import { ServiceResponse } from '@app/types'
import { HasImage, MultipleHasImage } from '@app/types'
import { handleServiceResponse } from '@app/utils/handle-service-response'

export function handleImageServiceResponse<T extends HasImage | MultipleHasImage>(hostUrl: string, res: ServiceResponse<T>): T {
  const resData = handleServiceResponse(res)

  if (isHasImage(res)){
    const imageRes = resData as HasImage

    if (imageRes.image != null) {
      imageRes.image = `${hostUrl}/${imageRes.image}`
    }

    return imageRes as T
  }

  if (isMultipleHasImage(res)){
    const multipleImageRes = resData as MultipleHasImage

    multipleImageRes.items.forEach((value, index) => {
      if (value != null && value.image != null) {
        multipleImageRes.items[index].image = `${hostUrl}/${value.image}`
      }
    })

    return multipleImageRes as T
  }

  return resData
}

export function isHasImage(obj: any): boolean {
  return 'image' in obj && typeof obj.image === 'string'
}

export function isMultipleHasImage(obj: any): boolean {
  return 'items' in obj && Array.isArray(obj.items) && obj.items.every(isHasImage)
}