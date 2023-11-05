import { Coordinate } from "types"

export type EmbeddedUser = {
  survey: { question1: number, question2: number },
  quote: { firstName: string, lastName: string, email: string, phone: string },
  details: { type: string, age: string, bill: string, company: string },
  map: { coordinate: Coordinate, address: string }
  design: { leadId: string, proposalId: string }
  appointment: { date: Date, time: string, eventId: string }
}