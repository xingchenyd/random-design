// Browser/Node crypto bridge for the unmodified upstream SHA-256 mapping.
import { sha256 } from '@noble/hashes/sha2.js';
import { bytesToHex, utf8ToBytes } from '@noble/hashes/utils.js';
export function createHash(algorithm) {
 if(algorithm!=='sha256')throw new Error('Unsupported hash');
 let chunks=[];return {update(value){chunks.push(typeof value==='string'?utf8ToBytes(value):value);return this;},digest(encoding){const n=chunks.reduce((n,c)=>n+c.length,0),data=new Uint8Array(n);let i=0;for(const c of chunks){data.set(c,i);i+=c.length;}const result=sha256(data);return encoding==='hex'?bytesToHex(result):result;}};
}
export function randomBytes(n){return globalThis.crypto.getRandomValues(new Uint8Array(n));}
