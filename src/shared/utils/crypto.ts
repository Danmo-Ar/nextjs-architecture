const enc = new TextEncoder();
const dec = new TextDecoder();

/**
 * Encrypts data using AES-GCM and returns a serialized string that can be stored in cookies or localStorage
 * Works in both server and client components
 * @param data - Any serializable data to encrypt
 * @returns string - Base64 encoded string containing both encrypted data and IV
 */
export async function encrypt(data: any): Promise<string> {
    // Use SESSION_SECRET from $env object to access properly in both server and client
    const sessionSecret = process.env.SESSION_SECRET;
    if (!sessionSecret) {
        throw new Error('SESSION_SECRET environment variable is not defined');
    }

    const key = await getKey(sessionSecret);
    const iv = globalThis.crypto.getRandomValues(new Uint8Array(12)); // Generate a unique IV for each encryption
    const text = JSON.stringify(data);
    const encrypted = await globalThis.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        enc.encode(text)
    );

    // Convert both the encrypted data and IV to base64 strings
    const encryptedBase64 = bufferToBase64(encrypted);
    const ivBase64 = bufferToBase64(iv);

    // Combine the IV and encrypted data with a delimiter for storage
    return `${ivBase64}.${encryptedBase64}`;
}

/**
 * Decrypts data that was encrypted with the encrypt function
 * Works in both server and client components
 * @param encryptedData - The encrypted string from the encrypt function
 * @returns any - The decrypted data
 */
export async function decrypt(encryptedData: string): Promise<any> {
    // Use SESSION_SECRET from $env object to access properly in both server and client
    const sessionSecret = process.env.SESSION_SECRET;
    if (!sessionSecret) {
        throw new Error('SESSION_SECRET environment variable is not defined');
    }

    // Split the string to get the IV and encrypted data
    const [ivBase64, encryptedBase64] = encryptedData.split('.');
    if (!ivBase64 || !encryptedBase64) {
        throw new Error('Invalid encrypted data format');
    }

    const iv = base64ToBuffer(ivBase64);
    const encrypted = base64ToBuffer(encryptedBase64);
    const key = await getKey(sessionSecret);

    const decrypted = await globalThis.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        encrypted
    );

    return JSON.parse(dec.decode(decrypted));
}

/**
 * Helper function to convert ArrayBuffer to Base64 string
 */
function bufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
    if (typeof window !== 'undefined') {
        // Client-side
        const bytes = new Uint8Array(buffer);
        const binary = Array.from(bytes)
            .map((byte) => String.fromCharCode(byte))
            .join('');
        return btoa(binary);
    } else {
        // Server-side
        return Buffer.from(buffer as any).toString('base64');
    }
}

/**
 * Helper function to convert Base64 string to ArrayBuffer
 */
function base64ToBuffer(base64: string): Uint8Array {
    if (typeof window !== 'undefined') {
        // Client-side
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    } else {
        // Server-side
        return Uint8Array.from(Buffer.from(base64, 'base64'));
    }
}

/**
 * Get encryption key from secret
 */
async function getKey(secret: string): Promise<CryptoKey> {
    return globalThis.crypto.subtle.importKey(
        'raw',
        enc.encode(secret),
        'AES-GCM',
        false,
        ['encrypt', 'decrypt']
    );
}
