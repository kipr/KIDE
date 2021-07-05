export class Slow {
  private ticks_: number;
  private frequency_: number;

  constructor(frequency: number = 100) {
    this.ticks_ = 0;
    this.frequency_ = frequency;
  }

  log(...message: any) {
    if (this.ticks_++ % this.frequency_ !== 0) return;
    console.log(...message);
  }
}

