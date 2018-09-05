/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:12:33 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-06 00:13:20
 */
class ForgeToolAction extends GoapAction{
	public constructor() {
		super();
		this.addPrecondition ("hasOre", true);
		this.addEffect ("hasNewTools", true);
	}
}