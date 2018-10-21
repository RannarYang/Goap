/*
 * @Description: {} 
 * @Author: Rannar.Yang 
 * @Date: 2018-09-05 20:52:30 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-06 00:23:36
 */
/**
 * A general labourer class.
 * You should subclass this for specific Labourer classes and implement
 * the createGoalState() method that will populate the goal for the GOAP
 * planner.
 */
abstract class Labourer implements IGoap{
	/**goap agent */
	protected goapAgent: GoapAgent;
	/**对应的视图 */
	protected vLabourer: VLabourer;
	public getView() {
		return this.vLabourer;
	}
	/**拥有的actions */
	private avaliableActions: GoapAction[] = [];
	public getAvaliableActions(): GoapAction[]{
		return this.avaliableActions;
	}
	protected toInitAvaliableActions(actionCls: any[]) {
		let action;
		for(let i = 0, len = actionCls.length; i < len; i++) {
			action = new actionCls[i]();
			this.avaliableActions.push(action);
		}
	}
	/**背包 */
	public backpack: BackPackComponent;
	/**工具类型（可能会走配置） */
	protected toolType: string;
	protected tool: ToolComponent;

	public moveSpeed: number = 1;

	public start() {
		this.backpack = new BackPackComponent();
		if(!this.tool) {
			let tool = this.tool = new ToolComponent();
			// TODO:加入到显示里
			this.backpack.tool = tool;
		}
		this.initAvaliableActions();
	}
	protected initAvaliableActions() {}

	public getWorldState(): Map<string, Object> {
		let worldData: Map<string, Object> = new Map<string, Object>();
		worldData.set("hasOre", this.backpack.hasOre());
		worldData.set("hasLogs", this.backpack.hasLog());
		worldData.set("hasFirewood", this.backpack.hasFirewood());
		worldData.set("hasTool", this.backpack.hasTool());
		return worldData;
	}

	/**
	 * Implement in subclasses
	 */
	public abstract createGoalState(): Map<string, Object>;

	public planFailed(failedGoad: Map<string, Object>) {
		// Not handling this here since we are making sure our goals will always succeed.
		// But normally you want to make sure the world state has changed before running
		// the same goal again, or else it will just fail.
	}

	public planFound(goal: Map<string, Object>, actions: GoapAction[]) {
		// Yay we found a plan for our goal
		console.log("Plan found: "+GoapAgent.prettyPrintActionsQueue(actions));
	}

	public actionsFinished(): void {
		// Everything is done, we completed our actions for this gool. Hooray!
		console.log ("Actions completed");
	}

	public planAborted (aborter: GoapAction) {
		// An action bailed out of the plan. State has been reset to plan again.
		// Take note of what happened and make sure if you run the same goal again
		// that it can succeed.
		console.log ("Plan Aborted: " + GoapAgent.prettyPrintAction(aborter));
	}

	public moveAgent(nextAction: GoapAction) {
		// TODO:
		let step;
		// 设置新的position
		this.vLabourer.moveTo(undefined, undefined);
		if(this.vLabourer.posEquip(nextAction.target)) {
			nextAction.setInRange(true);
			return true;
		} else {
			return false;
		}
	}
}