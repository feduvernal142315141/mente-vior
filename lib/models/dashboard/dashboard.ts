export type DashboardResponse = {
    totalOrganization: number;
    totalActiveOrganization: number;
    totalUserActive: number;
    auditLogs: AuditLogDashboard[];
};

export type AuditLogDashboard = {
    id: string
    action: string;
    createdBy: string;
    createdAt: string;
}

export type PublicInfoResponse = {
    totalActiveOrganization: number;
    totalUserActive: number;
};