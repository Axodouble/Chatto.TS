import { ChattoValidationError } from '../errors'
import type { PresenceInput } from '../types'
import type { PresenceStatusSchema } from '../schemas/user'
import type { z } from 'zod'

type PresenceStatusName = z.infer<typeof PresenceStatusSchema>

const PRESENCE_MAP: Record<PresenceInput, PresenceStatusName | 'OFFLINE'> = {
  online: 'PRESENCE_STATUS_ONLINE',
  away: 'PRESENCE_STATUS_AWAY',
  idle: 'PRESENCE_STATUS_AWAY',
  dnd: 'PRESENCE_STATUS_DO_NOT_DISTURB',
  offline: 'OFFLINE',
  invisible: 'OFFLINE',
}

export function normalizePresence(input: PresenceInput): PresenceStatusName | 'OFFLINE' {
  const mapped = PRESENCE_MAP[input]
  if (mapped == null) {
    throw new ChattoValidationError(
      'invalid_presence',
      `Invalid presence status: ${String(input)}. Expected one of ${Object.keys(PRESENCE_MAP).join(', ')}.`,
    )
  }
  return mapped
}

export function serializeExpiresAt(value: Date | string | undefined): string | undefined {
  if (value == null) return undefined
  return value instanceof Date ? value.toISOString() : value
}
