/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:09:26 
 * @Last Modified by:   RannarYang 
 * @Last Modified time: 2018-09-06 00:09:26 
 */
abstract class GoapAction {
	private preconditions: Map<ActionStatus, Object>;
	private effects: Map<ActionStatus, Object>;

	private inRange: boolean = false;

	/* The cost of performing the action. 
	 * Figure out a weight that suits the action. 
	 * Changing it will affect what actions are chosen during planning.*/
	public cost: number = 1;

	/**
	 * An action often has to perform on an object. This is that object. Can be null. */
	public target: VGameObject;

	public constructor() {
		this.preconditions = new Map<ActionStatus, Object>();
		this.effects = new Map<ActionStatus, Object>();
	}

	public doReset() {
		this.inRange = false;
		this.target = null;
		this.reset();
	}
	/**
	 * Reset any variables that need to be reset before planning happens again.
	 */
	abstract reset(): void;

	/**
	 * Is the action done?
	 */
	abstract isDone(): boolean;

	/**
	 * Procedurally check if this action can run. Not all actions
	 * will need this, but some might.
	 */
	abstract checkProceduralPrecondition(agent: VGameObject): boolean;

	/**
	 * Run the action.
	 * Returns True if the action performed successfully or false
	 * if something happened and it can no longer perform. In this case
	 * the action queue should clear out and the goal cannot be reached.
	 */
	abstract perform(iGoap: IGoap): boolean;

	/**
	 * Does this action need to be within range of a target game object?
	 * If not then the moveTo state will not need to run for this action.
	 */
	abstract requiresInRange (): boolean;
	

	/**
	 * Are we in range of the target?
	 * The MoveTo state will set this and it gets reset each time this action is performed.
	 */
	public isInRange (): boolean {
		return this.inRange;
	}
	
	public setInRange(inRange: boolean): void {
		this.inRange = inRange;
	}

	public addPrecondition(key: string, value: any) {
		this.preconditions.set(key, value)
	}

	public removePrecondition(key: string) {
		this.preconditions.delete(key);
	}

	public addEffect(key: string, value: any) {
		this.effects.set(key, value);
	}
	public removeEffect(key: string) {
		this.effects.delete(key);
	}
	public get Preconditions() {
		return this.preconditions;
	}
	public get Effects() {
		return this.effects;
	}
}