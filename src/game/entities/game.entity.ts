export class GameInfo {
    
    selfDocID: string
    banner_img_self_link: string;
    developer: string;
    game_id: string;
    game_title: string;
    hype: number;
    img_self_link: string;
    is_digital: boolean;
    is_physical: boolean;
    platforms: [string];
    msrp: number;
    publisher: string;
    release_date: Date;
    switch_img_self_link: string;
    visibility: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date = null;
    createdBy: string;
    deletedBy?: string = null;
}
