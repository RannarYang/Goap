/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:08:59 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-06 00:10:15
 */
class DropOffLogsAction extends GoapAction{
	public constructor() {
		super();
		this.addPrecondition ("hasLogs", true); // can't drop off logs if we don't already have some
		this.addEffect ("hasLogs", false); // we now have no logs
		this.addEffect ("collectLogs", true); // we collected logs
	}
}