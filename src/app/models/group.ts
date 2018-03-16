export class Group {
    groupId: number;
    parentId: number;

    level: number;
    levelDesc: string;
    
    levelId = 0;
    lft = 0;
    rgt = 0;

    groupName: string;
    groupDesc: string;
    groupManager: string;

}
