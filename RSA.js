import forge from 'node-forge'; 

export default function encrypted(text,publicKeyPem){
    publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    publicKey.encrypt(text);
    return text;
}