/*
 * @Description: 樵夫
 * @Author: Rannar.Yang 
 * @Date: 2018-09-05 20:40:44 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-11-04 18:22:04
 */
class Logger extends Labourer{
	private txtLogNum: eui.Label;
	public type = LabourerType.Logger;
	public constructor() {
		super();
	}
	protected initAvaliableActions() {
		this.toInitAvaliableActions([ChopTreeAction, DropOffLogsAction, PickUpToolAction]);
	}
	/**
	 * Our only goal will ever be to chop trees.
	 * The ChopTreeAction will be able to fulfill this goal.
	 */
	public createGoalState(): Map<string, Object> {
		let goal = new Map<string, Object>();
		goal.set(ActionStatus.CollectLogs, true);
		return goal;
	}

	public updateBackPack() {
		this.txtLogNum.text = "原木：" + this.backpack.numLogs;
	}
}