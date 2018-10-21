class ToolComponent {
	/**[0..1] or 0% to 100% */
	public strength: number;
	public constructor() {
		this.strength = 1; // full strength
	}

	public use(damage: number): void {
		this.strength -= damage;
	}

	public destroyed(): boolean {
		return this.strength <= 0;
	}
}