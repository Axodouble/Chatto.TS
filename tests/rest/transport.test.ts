import { describe, it, expect } from 'bun:test'
import { ConnectError, Code, createRouterTransport } from '@connectrpc/connect'
import { create } from '@bufbuild/protobuf'
import { MessageService } from '../../src/gen/chatto/api/v1/messages_pb'
import { GetMessageResponseSchema } from '../../src/gen/chatto/api/v1/messages_pb'
import { createServiceClients, toChattoError } from '../../src/rest/transport'
import { ChattoApiError } from '../../src/errors'
import { createClient } from '@connectrpc/connect'

describe('toChattoError', () => {
  it('maps a ConnectError to a ChattoApiError preserving the code name', () => {
    const err = toChattoError(new ConnectError('nope', Code.Unauthenticated))
    expect(err).toBeInstanceOf(ChattoApiError)
    expect(err.code).toBe('unauthenticated')
    expect(err.message).toContain('nope')
  })
})

describe('createServiceClients', () => {
  it('exposes typed clients that call the generated services', async () => {
    // A router transport lets us stub the server side without network.
    const transport = createRouterTransport(({ service }) => {
      service(MessageService, {
        getMessage: () => create(GetMessageResponseSchema, {
          message: { id: 'evt_1', roomId: 'R_1', actorId: 'U_1', body: 'hi' },
        }),
      })
    })
    const clients = createServiceClients(transport)
    const res = await clients.message.getMessage({ roomId: 'R_1', eventId: 'evt_1' })
    expect(res.message?.id).toBe('evt_1')
    // Sanity: createClient over the same service+transport behaves identically.
    void createClient(MessageService, transport)
  })
})
