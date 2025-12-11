"use client"

import { Users, BarChart3 } from "lucide-react"
import {useLoginFeature} from "@/modules/auth/hooks/use-login-features";

export default function StatsAndFeatures() {

    const {
        publicInfo,
        isLoading,
        error,
    } = useLoginFeature()

  return (
    <div className="space-y-6 max-w-xl">

      <div className="space-y-4">
        <h2 className="text-[48px] md:text-[54px] font-extrabold text-white leading-[1.08]">
          Manage your mental
          <br />
          health practice with
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#22D3EE]">
            confidence
          </span>
        </h2>

        <p className="text-lg text-white/60 max-w-lg">
          Comprehensive back office system for ABA therapy clinics. Handle organizations,
          teams, and workflows with enterprise security.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4">
        
        {[
          {
            icon: Users,
            label: "Multi-Tenant System",
            desc: "Manage multiple organizations",
            color: "from-[#2563EB] to-[#1D4ED8]",
          },
          {
            icon: BarChart3,
            label: "Real-Time Analytics",
            desc: "Insights and reporting",
            color: "from-[#22C55E] to-[#16A34A]",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500"
          >
            <div
              className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg`}
            >
              <f.icon className="w-5 h-5 text-white" />
            </div>

            <h3 className="text-white font-semibold mb-1.5">{f.label}</h3>
            <p className="text-white/50 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-10 pt-6 border-t border-white/[0.08]">
          <div >
              <p className="text-3xl font-bold text-white">{publicInfo.totalActiveOrganization}</p>
              <p className="text-sm text-white/50">Active Companies</p>
          </div>
          <div >
              <p className="text-3xl font-bold text-white">{publicInfo.totalUserActive}</p>
              <p className="text-sm text-white/50">Active Users</p>
          </div>
      </div>
    </div>
  )
}
