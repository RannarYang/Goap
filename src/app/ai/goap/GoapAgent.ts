/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:09:30 
 * @Last Modified by:   RannarYang 
 * @Last Modified time: 2018-09-06 00:09:30 
 */
class GoapAgent {

	private stateMgr: StateManager;

	private planner: GoapPlanner;

	private availableActions: GoapAction[];

	private currentActions: GoapAction[];

	public start() {
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
	private loadActions() {

	}
}