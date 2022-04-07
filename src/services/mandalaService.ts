import Mandala from '../classes/mandala'
import { hash } from './hashService'
import artworks from '../Assets/Patterns.json'

export function createMandala(data: string): string {
  return new Mandala(hash(data), artworks, true).generateSVGCode();
}