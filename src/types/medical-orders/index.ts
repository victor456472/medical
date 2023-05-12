import type { Medicine } from "../medicines"

export interface MedicalOrder {
    name: string
    lastName: string
    idNumber: string
    eps: string
    medicines: Medicine[]
    comments: string
    doctorSignature: string
    createdAt?: string
}