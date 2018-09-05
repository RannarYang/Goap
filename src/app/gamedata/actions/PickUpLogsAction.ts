/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:14:10 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-06 00:14:33
 */
class PickUpLogsAction extends GoapAction{
	public constructor() {
		super();
		this.addPrecondition ("hasLogs", false); // don't get a logs if we already have one
		this.addEffect ("hasLogs", true); // we now have a logs
	}
}