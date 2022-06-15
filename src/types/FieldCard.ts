import {Directions} from '../enums/Directions';

export type FieldCard = {
    id: number
    url: string
    title: string
    captured: boolean
    markMovedDirection?: Directions
    markCaptured?: boolean
    markAsked?: boolean
    hasActOpportunity?: boolean
}