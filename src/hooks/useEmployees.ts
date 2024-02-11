import { useCallback, useState } from "react"
import { Employee } from "../utils/types"
import { useCustomFetch } from "./useCustomFetch"

export function useEmployees() {
  const { fetchWithCache, loading: employeeLoading } = useCustomFetch()
  const [employees, setEmployees] = useState<Employee[] | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    const response = await fetchWithCache<Employee[]>("employees")

    setEmployees(response)
    setLoading(false)
  }, [fetchWithCache])

  return { data: employees, loading: employeeLoading || loading, fetchAll }
}

