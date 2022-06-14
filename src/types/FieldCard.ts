import {Directions} from '../enums/Directions';

export type FieldCard = {
    id: number
    title: string
    captured: boolean
    markMovedPercent?: number
    markMovedDirection?: Directions
    markCaptured?: boolean
    markAsked?: boolean
    hasActOpportunity?: boolean
}