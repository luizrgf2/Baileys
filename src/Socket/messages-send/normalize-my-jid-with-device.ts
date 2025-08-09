import { jidDecode } from "../../WABinary"
import { lidCache } from "../lid-cache"

export function NormalizeMyJidToLid(Mejid: string, meLid: string, anyJid: string) {
    if(anyJid.includes('@lid')) return anyJid
    const meJid = Mejid.split('@')[0]?.split(":")[0] as string
    if(anyJid.includes(meJid)) {
        const lidModified = meLid.split("@")[0]?.split(":")[0] as string
        console.log(`Lid ${meLid} already exists in cache for ${Mejid}.`)
        return anyJid.replace("s.whatsapp.net", "lid").replace(meJid, lidModified)
    }

    const jidDecoded = jidDecode(anyJid)
    const getLidFromCache = lidCache.get(`${jidDecoded?.user}@s.whatsapp.net`)

    if(getLidFromCache) {
        const lidDecoded = jidDecode(getLidFromCache as string)
        return `${lidDecoded?.user}:${jidDecoded?.device || 0}@lid`
    }

    return getLidFromCache as string
}