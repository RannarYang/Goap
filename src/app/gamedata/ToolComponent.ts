class ToolComponent extends eui.Image {
	/**[0..1] or 0% to 100% */
	public strength: number;
	public constructor() {
		super();
		this.strength = 1; // full strength
	}

	public use(damage: number): void {
		this.strength -= damage;
	}

	public destroyed(): boolean {
		return this.strength <= 0;
	}

}

