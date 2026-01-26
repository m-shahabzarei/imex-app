export interface IData {
  id: number
  national_code: string
  country: {
    name:string;
  }
  product_group: {
    title:string;
  }
  process: {
    title:string;
  }
  online_working_days: OnlineWorkingDay[]
  offline_working_days: OfflineWorkingDay[]
  image: string
  full_name: string
  price_for_chat: number
  price: number
  price_for_offline: number
}


export interface OnlineWorkingDay {
  id: number
  day_of_week: number
  day_name: string
  is_active: boolean
  time_slots: TimeSlot[]
}

export interface TimeSlot {
  id: number
  start_time: string
  end_time: string
  session_duration: number
  is_active: boolean
}

export interface OfflineWorkingDay {
  id: number
  day_of_week: number
  day_name: string
  is_active: boolean
  time_slots: TimeSlot[]
}
