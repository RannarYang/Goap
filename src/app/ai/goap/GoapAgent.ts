/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:09:30 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-11-04 17:41:31
 */
class GoapAgent {

	private stateMgr: StateManager;

	private owner: IGoap;
	public getOwner(): IGoap {
		return this.owner;
	}
	private planner: GoapPlanner;
	public getPlanner(): GoapPlanner {
		return this.planner;
	}

	private availableActions: GoapAction[];
	public getAvaliableActions(): GoapAction[] {
		return this.availableActions;
	}

	private currentActions: GoapAction[];
	public setCurrentActions(currentActions: GoapAction[]) {
		this.currentActions = currentActions;
	}
	public peekCurrentActions(): GoapAction {
		return this.currentActions[0];
	}
	public dequeueCurrentActions(): GoapAction {
		return this.currentActions.shift();
	}

	public getCurrentActions(): GoapAction[] {
		return this.currentActions;
	}
	
	public constructor(owner: IGoap) {
		this.owner = owner;
		this.initState();
		this.planner = new GoapPlanner();
		this.availableActions = [];
		this.currentActions = [];
		this.stateMgr.changeState(StateEnum.StateIdle);
		this.loadActions();
	}
	private initState() {
		let stateMgr = this.stateMgr = new StateManager(this);
		stateMgr.registerState(StateEnum.StateIdle, new StateIdle(this))
		stateMgr.registerState(StateEnum.StateMove, new StateMove(this))
		stateMgr.registerState(StateEnum.StatePerformAction, new StatePerformAction(this))
	}

	public changeState(key: string, obj?: any, isForce?: boolean) {
		this.stateMgr.changeState(key, obj, isForce);
	}

	public update(delta: number) {
		this.stateMgr.update(delta);
	}
	public addAction(a: GoapAction) {
		this.availableActions.push(a);
	}
	public getAction<T extends GoapAction>(cls: {new():T}) {
		for(let action of this.availableActions) {
			if(action instanceof cls) {
				return action;
			}
		}
		return null;
	}
	public removeAction(action: GoapAction) {
		for(let i = 0, len = this.availableActions.length; i < len; i++) {
			if(this.availableActions[i] == action) {
				this.availableActions.splice(i, 1);
				return;
			}
		}
	}
	public hasActionPlan() {
		return this.currentActions.length > 0;
	}

	private loadActions() {
		let actions: GoapAction[] = this.owner.getAvaliableActions();
		for(let action of actions) {
			this.availableActions.push(action);
		}
		console.log("Found actions: " + GoapAgent.prettyPrintActions(actions));

	}
	// 输出 ==================================================
	public static prettyPrintState(state: Map<ActionStatus, Object>) {
		let s: string = "";
		state.forEach((value, key)=>{
			s += key + ":" + value;
			s += ", ";
		})
		return s;
	}

	public static prettyPrintActionsQueue(actions: GoapAction[]): string {
		console.log("prettyPrintActionsQueue: ", actions)
		let s: string = "";
		actions.forEach((action: GoapAction)=>{
			s += action.constructor.name;
			s += "-> ";
		})
		s += "GOAL";
		return s;
	}

	public static prettyPrintActions(actions: GoapAction[]) {
		let s: string = "";
		actions.forEach((action: GoapAction)=>{
			s += action.constructor.name;
			s += ", ";
		})
		return s;
	}

	public static prettyPrintAction(action: GoapAction) {
		return ""+ action.constructor.name;
	}

}