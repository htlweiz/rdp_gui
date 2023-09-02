export function sleep(millisecods:number) {
    const promise = new Promise(resolve => setTimeout(resolve,millisecods))
    return promise
}