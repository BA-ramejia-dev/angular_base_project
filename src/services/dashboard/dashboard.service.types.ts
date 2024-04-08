export interface DashBoardSection {
    label: string;
    items: DashBoardItem[];
}

export interface DashBoardItem {
    status: string;
    count: number;
    iconName: string;
    iconColor: string;
}
