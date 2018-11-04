/*
 * @Description: 伐木工
 * @Author: Rannar.Yang 
 * @Date: 2018-09-05 20:40:44 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-11-04 18:28:30
 */
class WoodCutter extends Labourer{
	private txtFireWoodNum: eui.Label;
	public type = LabourerType.WoodCutter;
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
		goal.set(ActionStatus.CollectFirewood, true);
		return goal;
	}

	public updateBackPack() {
		this.txtFireWoodNum.text = "木柴：" + this.backpack.numFirewood;
	}
}