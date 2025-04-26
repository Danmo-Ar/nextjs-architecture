// Cette fonction permet tout simplement de s'assurer l'api url n'a pas de slash à la fin
export const rmSlashEndUrl = (url: string) =>
    url.endsWith('/') ? url.slice(0, -1) : url;

export const rmSlashStartUrl = (url: string) =>
    url.startsWith('/') ? url.slice(1) : url;
