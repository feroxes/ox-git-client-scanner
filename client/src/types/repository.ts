export interface RepositoryDataObjectType {
    owner: string;
    name: string;
    size: number;
    fileCount: number;
    folderCount: number;
    isPrivate: boolean;
    webhooks: Webhook[];
    ymlContent?: string;
}

interface Webhook {
    name: string;
    url: string;
    active: boolean;
    events: string[]
}
