import { jidDecode } from "../../WABinary";

export function GetMyLidsAndAnotherLids(meLid: string, lids: string[]) {
    const myLids = [] as string[]
    const anotherLids = [] as string[]

    const lidDecoded = jidDecode(meLid)
    if (!lidDecoded || !lidDecoded.user) {
        return { myLids, anotherLids }
    }

    for(const lid of lids) {
        if(lid.includes(lidDecoded.user)) {
            myLids.push(lid)
        }
        else {            
            anotherLids.push(lid)
        }
    }

    return { myLids, anotherLids }
}