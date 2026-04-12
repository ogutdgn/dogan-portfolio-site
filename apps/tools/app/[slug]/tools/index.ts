import type { ComponentType } from 'react'
import InterArrivalSampler from './inter-arrival-sampler'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TOOL_COMPONENTS: Record<string, ComponentType<any>> = {
  'inter-arrival-sampler': InterArrivalSampler,
}
