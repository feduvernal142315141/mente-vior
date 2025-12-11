"use client";

import { Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {useDashboard} from "@/modules/dashboard/hooks/use-dashboard";
import {MetricsCards} from "@/modules/dashboard/metrics-cards";
import {Loading} from "@/components/ui/loading";

export default function DashboardPage() {

  const {
      dashboard,
      isLoading,
      error,
      formatDate
  } = useDashboard();

  return (
    <div className="space-y-6 p-6 max-w-[1600px] mx-auto animate-fade-in-fast lg:p-12">
      <div className="mb-2">
        <h1 className="text-[22px] font-semibold text-text-primary tracking-tight mb-1">System Overview</h1>
        <p className="text-sm text-text-muted">Real-time metrics and activity monitoring</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          <MetricsCards 
            totalOrganization={dashboard.totalOrganization}
            totalActiveOrganization={dashboard.totalActiveOrganization}
            totalUserActive={dashboard.totalUserActive}
          />
      </div>

      <Card className="bg-surface-primary border-border-hairline elevation-card">
        <CardHeader className="px-5 py-4 border-b border-border-hairline">
          <CardTitle className="text-base font-semibold text-text-primary">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-5">
            {
                isLoading ?
                        (<Loading></Loading>)
                        :
                        (
                            <div className="space-y-1">
                                {dashboard.auditLogs.map((auditLog) => (
                                    <div
                                        key={auditLog.id}
                                        className="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-surface-secondary transition-all duration-100 cursor-pointer group"
                                    >
                                        <div className="w-7 h-7 rounded-full bg-accent-soft border border-border-hairline flex items-center justify-center shrink-0 group-hover:border-accent-primary/20 transition-colors duration-100">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[13px] font-medium text-text-primary mb-0.5">{auditLog.action}</p>
                                            <p className="text-[13px] text-text-muted">{auditLog.createdBy}</p>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-text-disabled shrink-0">
                                            <Clock className="w-3 h-3" />
                                            <span className="text-xs">{formatDate(auditLog.createdAt)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
            }

        </CardContent>
      </Card>
    </div>
  )
}
