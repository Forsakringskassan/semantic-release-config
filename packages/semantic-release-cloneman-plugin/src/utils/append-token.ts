import { toNerfDart } from "./nerf-dart";

export function appendToken(registryUrl: string, token: string): string {
    const authTokenLine = `${toNerfDart(registryUrl)}:_authToken=${token}`;
    return authTokenLine;
}
