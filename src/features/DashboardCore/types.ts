export interface DashboardOccupancy {
  total_beds: number
  occupied: number
  reserved: number
  available: number
  maintenance: number
  occupancy_rate: number
}

export interface DashboardCountAmount {
  count: number
  total_amount: number
}

export interface DashboardPrescriptions {
  created: number
  dispensed: number
}

export interface DashboardTrendDay {
  date: string
  admissions: number
  discharges: number
}

export interface DashboardCore {
  date: string
  occupancy: DashboardOccupancy
  inpatients_active: number
  admissions_today: number
  discharges_today: number
  invoices_today: DashboardCountAmount
  payments_today: DashboardCountAmount
  prescriptions_today: DashboardPrescriptions
  trend: DashboardTrendDay[]
}
