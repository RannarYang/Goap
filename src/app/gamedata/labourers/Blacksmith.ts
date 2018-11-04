/*
 * @Description: 铁匠
 * @Author: Rannar.Yang 
 * @Date: 2018-09-05 20:40:44 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-11-04 18:42:34
 */
class Blacksmith extends Labourer{
	private txtOreNum: eui.Label;
	
	public type = LabourerType.Blacksmith;
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
		goal.set(ActionStatus.CollectTools, true);
		return goal;
	}

	public updateBackPack() {
		this.txtOreNum.text = "矿石：" + this.backpack.numOre;
	}
}