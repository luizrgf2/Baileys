import { USyncQuery, USyncUser } from "../../WAUSync"
import { lidCache } from "../lid-cache"
import type { NewsletterSocket } from "../newsletter"

function checkIfLidExists(jid: string): boolean {
    const exists = lidCache.get(jid)
    if (exists) {
        console.log(`Lid ${jid} already exists in cache.`)
        return true
    } else {
        console.log(`Lid ${jid} does not exist in cache.`)
        return false
    }
}

async function getLidFromJid(jid: string, sock: NewsletterSocket) {
    const usyncQuery = new USyncQuery()
		.withContactProtocol()
		.withLIDProtocol()
		.withUser(new USyncUser().withPhone(jid.split('@')[0] as string));
    const results = await sock.executeUSyncQuery(usyncQuery)
    if(!results || !results.list ||results.list.length === 0) {
        console.error(`No results found for LID ${jid}.`)
        return
    }

    return results.list[0]?.lid ? results.list[0].lid as string: undefined

}

export async function SaveLidToCache(sock: any, jid: string) {
    if(checkIfLidExists(jid)) {
        return
    }

    const lid = await getLidFromJid(jid, sock)
    if (!lid) {
        console.error(`Failed to retrieve LID for ${jid}.`)
        return
    }
    lidCache.set(jid, lid)
}