import {
  CalendarRange,
  ChartColumnIncreasing,
  Download,
  Pause,
  Play,
  Settings2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const ManagePage = () => {
  const quickStats = [
    {
      label: 'Live',
      value: 12,
      hint: 'Antworten in Echtzeit',
      icon: <Play className="h-4 w-4 text-emerald-500" />,
    },
    {
      label: 'Geplant',
      value: 12,
      hint: 'Bereit zum Start',
      icon: <CalendarRange className="h-4 w-4 text-blue-500" />,
    },
    {
      label: 'Pausiert',
      value: 12,
      hint: 'Warten auf Reaktivierung',
      icon: <Pause className="h-4 w-4 text-amber-500" />,
    },
    {
      label: 'Ø Abschlussrate',
      value: `12%`,
      hint: 'Trend vs Ziel',
      icon: <ChartColumnIncreasing className="h-4 w-4 text-purple-500" />,
    },
  ]
  return (
    <div className="p-6 md:px-0 space-y-6">
      <div className="rounded-3xl border border-border/60 bg-gradient-to-r from-primary/10 via-accent/20 to-background/80 p-6 shadow-sm backdrop-blur-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Studienverwaltung
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Pipeline planen, steuern & ausrollen
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Übersichtlich pro Status, mit klaren Handlungsfeldern für Launches, Qualität und
              Kommunikation.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="bg-background/60 backdrop-blur">
              <Download className="h-4 w-4" />
              Bulk-Export
            </Button>
            <Button variant="outline" size="sm" className="bg-background/60 backdrop-blur">
              <Settings2 className="h-4 w-4" />
              Richtlinien
            </Button>
            <Button size="sm" className="shadow-md">
              <Play className="h-4 w-4" />
              Neue Studie
            </Button>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border/70 bg-background/70 p-4 shadow-xs"
            >
              <div className="flex-between">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <span className="rounded-full border border-border/60 bg-muted/50 px-2 py-1 text-[11px] text-muted-foreground">
                  {stat.icon}
                </span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.hint}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ManagePage
