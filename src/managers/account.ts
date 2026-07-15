import type { ClientContext } from '../context'
import type { CustomStatus, CustomStatusInput } from '../types'
import { serializeExpiresAt } from '../account/presence'
import {
  UpdatePresenceResponseSchema,
  UpdateCustomStatusResponseSchema,
  DeleteCustomStatusResponseSchema,
} from '../schemas/user'

export class AccountManager {
  constructor(private readonly ctx: ClientContext) {}

  async updatePresence(status: string, userSelected: boolean): Promise<string> {
    const res = await this.ctx.rest.post(
      'chatto.api.v1.MyAccountService',
      'UpdatePresence',
      { status, userSelected },
      UpdatePresenceResponseSchema,
    )
    return res.status
  }

  async updateCustomStatus(input: CustomStatusInput): Promise<CustomStatus> {
    const res = await this.ctx.rest.post(
      'chatto.api.v1.MyAccountService',
      'UpdateCustomStatus',
      { emoji: input.emoji, text: input.text, expiresAt: serializeExpiresAt(input.expiresAt) },
      UpdateCustomStatusResponseSchema,
    )
    return res.status
  }

  async deleteCustomStatus(): Promise<void> {
    await this.ctx.rest.post(
      'chatto.api.v1.MyAccountService',
      'DeleteCustomStatus',
      {},
      DeleteCustomStatusResponseSchema,
    )
  }
}
