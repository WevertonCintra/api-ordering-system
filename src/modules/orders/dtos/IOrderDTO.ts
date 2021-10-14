interface IOrderDTO {
  id?: string
  client_id?: string
  created_date?: Date
  delivery_date?: Date
  status?: boolean
  status_delivery?: boolean
  status_paid?: boolean
}

export { IOrderDTO }
