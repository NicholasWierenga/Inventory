export interface Location {
    data: Data;
    meta: Meta;
}
  
export interface Data {
    locationId: string
    chain: string
    address: Address
    geolocation: Geolocation
    name: string
    hours: Hours
    phone: string
    departments: Department[]
}   

export interface Address {
    addressLine1: string
    city: string
    state: string
    zipCode: string
    county: string
}   

export interface Geolocation {
    latitude: number
    longitude: number
    latLng: string
}   

export interface Hours {
    timezone: string
    gmtOffset: string
    open24: boolean
    monday: Monday
    tuesday: Tuesday
    wednesday: Wednesday
    thursday: Thursday
    friday: Friday
    saturday: Saturday
    sunday: Sunday
}   

export interface Monday {
    open: string
    close: string
    open24: boolean
}   

export interface Tuesday {
    open: string
    close: string
    open24: boolean
}   

export interface Wednesday {
    open: string
    close: string
    open24: boolean
}   

export interface Thursday {
    open: string
    close: string
    open24: boolean
}   

export interface Friday {
    open: string
    close: string
    open24: boolean
}   

export interface Saturday {
    open: string
    close: string
    open24: boolean
}   

export interface Sunday {
    open: string
    close: string
    open24: boolean
}   

export interface Department {
    departmentId: string
    name: string
    phone?: string
    hours?: Hours2
    address?: Address2
    geolocation?: Geolocation2
    offsite?: boolean
}   

export interface Hours2 {
    open24: boolean
    monday: Monday2
    tuesday: Tuesday2
    wednesday: Wednesday2
    thursday: Thursday2
    friday: Friday2
    saturday: Saturday2
    sunday: Sunday2
}   

export interface Monday2 {
    open: string
    close: string
    open24: boolean
}   

export interface Tuesday2 {
    open: string
    close: string
    open24: boolean
}   

export interface Wednesday2 {
    open: string
    close: string
    open24: boolean
}   

export interface Thursday2 {
    open: string
    close: string
    open24: boolean
}   

export interface Friday2 {
    open: string
    close: string
    open24: boolean
}   

export interface Saturday2 {
    open: string
    close: string
    open24: boolean
}   

export interface Sunday2 {
    open: string
    close: string
    open24: boolean
}   

export interface Address2 {
    addressLine1: string
    city: string
    state: string
    zipCode: string
}   

export interface Geolocation2 {
    latitude: number
    longitude: number
    latLng: string
}   

export interface Meta {
    agination: Pagination
    warning: string[]
}   

export interface Pagination {
    start: number
    limit: number
    total: number
}   