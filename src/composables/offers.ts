import { useApiGet, useApiPost } from '@/composables/useApi.ts'
import type { CreateOffer, CreateOfferResponse } from '@/types/offer.ts'

export async function createOffer(offer: CreateOffer): Promise<CreateOfferResponse> {
  return await useApiPost('/api/offer/create', {
    body: offer
  })
}


export async function getOffer(offerId: string): Promise<CreateOffer | undefined> {
  return await useApiGet(`/api/offer/find-by-id/${offerId}`)
}
