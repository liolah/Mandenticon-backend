import Mandala from '../classes/mandala'
import artworks from '../Assets/Artworks.json'
import { hash } from './hashService'

export function createMandala(data: string): string {
  return new Mandala(hash(data), artworks, true).generateSVGCode();
}