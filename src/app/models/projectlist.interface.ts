export interface ProjectList {
    projectId: number;
    projectName: string;
    projectDesc?: string;
    projectManager?: string;
    plannedStartDate: string;
    actualStartDate?: string;
    projectGroupId: number;
    projectStatusId: number;
    projectGroupName: string;
    projectGroupManager?: string;
    projectStatusName: string;
}
