/*
 * @Description: {} 
 * @Author: Rannar.Yang 
 * @Date: 2018-09-05 20:52:30 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-11-04 18:31:49
 */
/**
 * A general labourer class.
 * You should subclass this for specific Labourer classes and implement
 * the createGoalState() method that will populate the goal for the GOAP
 * planner.
 */
abstract class Labourer extends VGameObject implements IGoap{
	abstract type: LabourerType;
	/**goap agent */
	protected goapAgent: GoapAgent;
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

	public bean: T_LabourerBean;
	public tool: ToolComponent;

	public childrenCreated() {
		super.childrenCreated();
		this.bean = GameDataManager.I.t_labourderContainer.getLabourerByType(this.type)
		if(!this.tool) {
			this.pickUpTool();
		}
		this.initAvaliableActions();
		this.goapAgent = new GoapAgent(this);
	}
	protected initAvaliableActions() {}

	public update(delta: number) {
		this.goapAgent.update(delta);
	}

	public getWorldState(): Map<string, Object> {
		let worldData: Map<string, Object> = new Map<string, Object>();
		worldData.set(ActionStatus.HasOre, this.backpack.hasOre());
		worldData.set(ActionStatus.HasLogs, this.backpack.hasLog());
		worldData.set(ActionStatus.HasFirewood, this.backpack.hasFirewood());
		worldData.set(ActionStatus.HasTool, this.hasTool());
		return worldData;
	}

	private hasTool() {
		return this.tool != null;
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
		console.log("Plan found: ", GoapAgent.prettyPrintActionsQueue(actions));
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

	public moveAgent(nextAction: GoapAction, delta: number) {
		let step = this.bean.speed * delta;
		let target = nextAction.target;
		// 设置新的position
		this.moveTo(target, step);
		if(this.posEquip(target)) {
			nextAction.setInRange(true);
			return true;
		} else {
			return false;
		}
	}
	/**设置背包里的物品 */
	public setBackPack(backpack: BackPackComponent) {
		this.backpack = backpack;
		backpack.setOwner(this);
	}
	/**拾取工具 */
	public pickUpTool() {
		let tool = this.tool = new ToolComponent();
		tool.x = 18;
		tool.y = 35;
		tool.source = ToolType.getSource(this.bean.toolType);
		this.addChild(tool);
	}
	/**销毁工具 */
	public destroyTool() {
		this.removeChild(this.tool);
		this.tool = undefined;
	}

	public updateBackPack() {
		
	}
}