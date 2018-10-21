/*
 * @Description: 伐木工
 * @Author: Rannar.Yang 
 * @Date: 2018-09-05 20:40:44 
 * @Last Modified by: Rannar.Yang
 * @Last Modified time: 2018-09-05 20:59:35
 */
class WoodCutter extends Labourer{
	public constructor() {
		super();
	}
	protected initAvaliableActions() {
		this.toInitAvaliableActions([ChopFirewoodAction, DropOffFirewoodAction, PickUpToolAction]);
	}
	/**
	 * Our only goal will ever be to chop logs.
	 * The ChopFirewoodAction will be able to fulfill this goal.
	 */
	public createGoalState(): Map<string, Object> {
		let goal = new Map<string, Object>();
		goal.set("collectFirewood", true);
		return goal;
	}
}