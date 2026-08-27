export interface ImageMarkerPoint {
  id: number
  image_marker_id: number | null
  x_coordinate: number | null
  y_coordinate: number | null
  label?: string | null
  description?: string | null
  created_at?: string
  updated_at?: string
}

export interface ImageMarkerPointFormValues {
  image_marker_id?: number | null
  x_coordinate?: number | null
  y_coordinate?: number | null
  label?: string | null
  description?: string | null
}
