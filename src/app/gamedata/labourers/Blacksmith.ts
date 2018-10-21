/*
 * @Description: 铁匠
 * @Author: Rannar.Yang 
 * @Date: 2018-09-05 20:40:44 
 * @Last Modified by: Rannar.Yang
 * @Last Modified time: 2018-09-05 20:54:55
 */
class Blacksmith extends Labourer{
	public constructor() {
		super();
	}
	protected initAvaliableActions() {
		this.toInitAvaliableActions([ForgeToolAction, DropOffToolsAction, PickUpOreAction]);
	}
	/**
	 * Our only goal will ever be to make tools.
	 * The ForgeTooldAction will be able to fulfill this goal.
	 */
	public createGoalState(): Map<string, Object> {
		let goal = new Map<string, Object>();
		goal.set("collectTools", true);
		return goal;
	}
}